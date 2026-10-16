import type { IncomingMessage, ServerResponse } from 'http';

// In-memory rate limiting store (IP -> array of request timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_BODY_SIZE_BYTES = 50 * 1024; // 50 KB

// Clean up stale IP records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const valid = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  }
}, 5 * 60 * 1000).unref?.();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

function sendJson(res: any, statusCode: number, data: any) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

async function getParsedBody(req: any): Promise<{ body?: any; error?: string }> {
  // 1. If req.body is already a parsed JS object
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return { body: req.body };
  }

  // 2. If req.body is a string
  if (typeof req.body === 'string') {
    if (req.body.length > MAX_BODY_SIZE_BYTES) {
      return { error: '요청 본문 크기가 제한(50KB)을 초과했습니다.' };
    }
    try {
      return { body: JSON.parse(req.body) };
    } catch {
      return { error: '유효한 JSON 형식이 아닙니다.' };
    }
  }

  // 3. If req is an IncomingMessage readable stream
  if (typeof req.on === 'function') {
    return new Promise((resolve) => {
      let raw = '';
      let tooLarge = false;

      req.on('data', (chunk: any) => {
        raw += chunk;
        if (raw.length > MAX_BODY_SIZE_BYTES) {
          tooLarge = true;
          req.pause?.();
          resolve({ error: '요청 본문 크기가 제한(50KB)을 초과했습니다.' });
        }
      });

      req.on('end', () => {
        if (tooLarge) return;
        if (!raw.trim()) {
          resolve({ error: '요청 본문(body)이 비어 있습니다.' });
          return;
        }
        try {
          resolve({ body: JSON.parse(raw) });
        } catch {
          resolve({ error: '유효한 JSON 형식이 아닙니다.' });
        }
      });

      req.on('error', () => {
        resolve({ error: '요청 데이터를 읽는 중 오류가 발생했습니다.' });
      });
    });
  }

  return { error: '요청 본문(body)이 비어 있거나 올바르지 않습니다.' };
}

export default async function handler(req: any, res: any) {
  // 1. HTTP Method validation (POST only)
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, {
      success: false,
      error: '허용되지 않은 HTTP 메서드입니다. POST 요청만 지원합니다.'
    });
  }

  // 2. Client IP detection and Rate Limiting
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : (req.headers['x-real-ip'] as string) || req.socket?.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp)) {
    return sendJson(res, 429, {
      success: false,
      error: '단시간 내 요청이 너무 많습니다. 잠시 후(약 1분 뒤) 다시 시도해 주세요.'
    });
  }

  // 3. Body parsing and size check
  const { body, error: bodyError } = await getParsedBody(req);
  if (bodyError || !body || typeof body !== 'object') {
    return sendJson(res, 400, {
      success: false,
      error: bodyError || '요청 본문(body)이 비어 있거나 올바르지 않습니다.'
    });
  }

  // 4. Honeypot check (Spam protection)
  if (body.hp_field || body._botCheck) {
    // Reject spam submissions
    return sendJson(res, 400, {
      success: false,
      error: '스팸 방지 필터에 의해 요청이 거부되었습니다.'
    });
  }

  const {
    inquiryType,
    company,
    contactPerson,
    phone,
    email,
    companyIntro,
    salesChannel,
    selectedProducts,
    orderMethod,
    message
  } = body;

  // 5. Inquiry Type validation
  if (inquiryType !== 'sample' && inquiryType !== 'business') {
    return sendJson(res, 400, {
      success: false,
      error: '올바른 문의 유형(sample 또는 business)을 지정해 주세요.'
    });
  }

  // 6. Common required fields validation
  if (!company || typeof company !== 'string' || !company.trim()) {
    return sendJson(res, 400, { success: false, error: '회사명을 입력해 주세요.' });
  }
  if (company.trim().length > 100) {
    return sendJson(res, 400, { success: false, error: '회사명은 최대 100자까지 입력 가능합니다.' });
  }

  if (!contactPerson || typeof contactPerson !== 'string' || !contactPerson.trim()) {
    return sendJson(res, 400, { success: false, error: '담당자명을 입력해 주세요.' });
  }
  if (contactPerson.trim().length > 50) {
    return sendJson(res, 400, { success: false, error: '담당자명은 최대 50자까지 입력 가능합니다.' });
  }

  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    return sendJson(res, 400, { success: false, error: '연락처를 입력해 주세요.' });
  }
  if (phone.trim().length > 30) {
    return sendJson(res, 400, { success: false, error: '연락처는 최대 30자까지 입력 가능합니다.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return sendJson(res, 400, { success: false, error: '올바른 이메일 주소 형식을 입력해 주세요.' });
  }
  if (email.trim().length > 100) {
    return sendJson(res, 400, { success: false, error: '이메일 주소는 최대 100자까지 입력 가능합니다.' });
  }

  // 7. Type-specific validations
  if (inquiryType === 'sample') {
    // Sample requests: companyIntro, salesChannel, selectedProducts (1~3), orderMethod are required
    if (!companyIntro || typeof companyIntro !== 'string' || !companyIntro.trim()) {
      return sendJson(res, 400, { success: false, error: '회사 홈페이지 또는 간략한 회사 소개를 입력해 주세요.' });
    }
    if (companyIntro.trim().length > 500) {
      return sendJson(res, 400, { success: false, error: '회사 소개는 최대 500자까지 입력 가능합니다.' });
    }

    if (!salesChannel || typeof salesChannel !== 'string' || !salesChannel.trim()) {
      return sendJson(res, 400, { success: false, error: '주요 판매 국가 또는 유통채널을 입력해 주세요.' });
    }
    if (salesChannel.trim().length > 300) {
      return sendJson(res, 400, { success: false, error: '판매 국가/유통채널은 최대 300자까지 입력 가능합니다.' });
    }

    if (!Array.isArray(selectedProducts) || selectedProducts.length === 0) {
      return sendJson(res, 400, { success: false, error: '관심 제품을 최소 1개 이상 선택해 주세요.' });
    }
    if (selectedProducts.length > 3) {
      return sendJson(res, 400, { success: false, error: '샘플 신청은 관심 제품을 최대 3개까지만 선택할 수 있습니다.' });
    }

    if (!orderMethod || typeof orderMethod !== 'string' || !orderMethod.trim()) {
      return sendJson(res, 400, { success: false, error: '검토 중인 주문 방식을 선택해 주세요.' });
    }
    if (orderMethod.trim().length > 50) {
      return sendJson(res, 400, { success: false, error: '주문 방식 문자열이 너무 깁니다.' });
    }

    if (message && typeof message === 'string' && message.length > 2000) {
      return sendJson(res, 400, { success: false, error: '요청사항은 최대 2,000자까지 입력 가능합니다.' });
    }
  } else {
    // Business inquiries: message is required; others optional
    if (!message || typeof message !== 'string' || !message.trim()) {
      return sendJson(res, 400, { success: false, error: '문의내용을 입력해 주세요.' });
    }
    if (message.trim().length > 2000) {
      return sendJson(res, 400, { success: false, error: '문의내용은 최대 2,000자까지 입력 가능합니다.' });
    }

    if (companyIntro && typeof companyIntro === 'string' && companyIntro.length > 500) {
      return sendJson(res, 400, { success: false, error: '회사 소개는 최대 500자까지 입력 가능합니다.' });
    }
    if (salesChannel && typeof salesChannel === 'string' && salesChannel.length > 300) {
      return sendJson(res, 400, { success: false, error: '판매 국가/유통채널은 최대 300자까지 입력 가능합니다.' });
    }
  }

  // 8. Verify environment variables
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  const appsScriptSecret = process.env.APPS_SCRIPT_SECRET;

  if (!appsScriptUrl) {
    // Return informative configuration guidance without leaking secrets
    return sendJson(res, 500, {
      success: false,
      error: 'Google Apps Script 웹 앱 URL(APPS_SCRIPT_URL)이 서버 환경변수에 설정되지 않았습니다. Vercel 환경변수 설정을 완료해 주세요.'
    });
  }

  // 9. Prepare payload for Google Apps Script
  const appsScriptPayload = {
    secret: appsScriptSecret || '',
    inquiryType,
    company: company.trim(),
    contactPerson: contactPerson.trim(),
    phone: phone.trim(),
    email: email.trim(),
    companyIntro: typeof companyIntro === 'string' ? companyIntro.trim() : '',
    salesChannel: typeof salesChannel === 'string' ? salesChannel.trim() : '',
    selectedProducts: Array.isArray(selectedProducts) ? selectedProducts : [],
    orderMethod: typeof orderMethod === 'string' ? orderMethod.trim() : '',
    message: typeof message === 'string' ? message.trim() : '',
    clientIp
  };

  // 10. Call Google Apps Script with timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const scriptResponse = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(appsScriptPayload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const contentType = scriptResponse.headers.get('content-type') || '';
    let result: any = null;

    if (contentType.includes('application/json')) {
      result = await scriptResponse.json();
    } else {
      const rawText = await scriptResponse.text();
      try {
        result = JSON.parse(rawText);
      } catch {
        // Apps Script sometimes returns text or error HTML
        return sendJson(res, 502, {
          success: false,
          error: 'Google Apps Script로부터 올바르지 않은 응답을 수신했습니다. 웹 앱 배포 권한("웹 앱을 실행할 사용자: 나", "액세스 권한: 모든 사용자")을 확인해 주세요.'
        });
      }
    }

    if (!scriptResponse.ok || !result || result.success !== true) {
      const errorMessage = result?.error || '스프레드시트 저장에 실패했습니다. 관리자에게 문의해 주세요.';
      return sendJson(res, 502, {
        success: false,
        error: errorMessage
      });
    }

    // Success response
    return sendJson(res, 200, {
      success: true,
      inquiryId: result.inquiryId || `ID-${Date.now()}`,
      emailSent: result.emailSent !== false,
      message: '정상적으로 접수되었습니다.'
    });

  } catch (err: any) {
    clearTimeout(timeoutId);
    const isTimeout = err?.name === 'AbortError';

    return sendJson(res, 504, {
      success: false,
      error: isTimeout
        ? 'Google Apps Script 응답 대기 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.'
        : 'Google Apps Script 통신 중 연결 오류가 발생했습니다.'
    });
  }
}
