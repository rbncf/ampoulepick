import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'inquiry-api-proxy',
        configureServer(server) {
          server.middlewares.use('/api/submit-inquiry', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                try {
                  const data = JSON.parse(body || '{}');
                  const { inquiryType, company, contactPerson, phone, email, selectedProducts, companyIntro, salesChannel, orderMethod, message, hp_field, _botCheck } = data;

                  // Spam honeypot
                  if (hp_field || _botCheck) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({ success: false, error: '스팸 방지 필터에 의해 요청이 거부되었습니다.' }));
                  }

                  // Basic input validation in dev
                  if (!inquiryType || (inquiryType !== 'sample' && inquiryType !== 'business')) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({ success: false, error: '유효한 inquiryType(sample 또는 business)을 전달해 주세요.' }));
                  }
                  if (!company || !contactPerson || !phone || !email) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({ success: false, error: '필수 항목(회사명, 담당자명, 연락처, 이메일)을 입력해 주세요.' }));
                  }
                  if (inquiryType === 'sample') {
                    if (!companyIntro || !salesChannel || !orderMethod) {
                      res.statusCode = 400;
                      return res.end(JSON.stringify({ success: false, error: '샘플 신청 필수 항목(회사 소개, 유통채널, 주문 방식)을 입력해 주세요.' }));
                    }
                    if (Array.isArray(selectedProducts) && selectedProducts.length > 3) {
                      res.statusCode = 400;
                      return res.end(JSON.stringify({ success: false, error: '샘플 신청 관심 제품은 최대 3개까지만 선택 가능합니다.' }));
                    }
                  } else {
                    if (!message || !message.trim()) {
                      res.statusCode = 400;
                      return res.end(JSON.stringify({ success: false, error: '문의내용을 입력해 주세요.' }));
                    }
                  }

                  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
                  const appsScriptSecret = process.env.APPS_SCRIPT_SECRET || '';

                  if (appsScriptUrl) {
                    // Forward to actual Google Apps Script
                    const scriptPayload = { ...data, secret: appsScriptSecret };
                    const scriptRes = await fetch(appsScriptUrl, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                      body: JSON.stringify(scriptPayload),
                    });
                    const scriptJson = await scriptRes.json().catch(() => ({ success: false, error: 'Apps Script 응답 파싱 실패' }));
                    res.statusCode = scriptRes.ok ? 200 : 502;
                    return res.end(JSON.stringify(scriptJson));
                  } else {
                    // Local simulated success when APPS_SCRIPT_URL is not set
                    const prefix = inquiryType === 'sample' ? 'SMP' : 'BIZ';
                    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
                    const mockId = `${prefix}-${dateStr}-${Math.floor(1000 + Math.random() * 9000)}`;
                    res.statusCode = 200;
                    return res.end(JSON.stringify({
                      success: true,
                      inquiryId: mockId,
                      emailSent: false,
                      devMode: true,
                      message: '정상적으로 접수되었습니다. (로컬 개발 환경)'
                    }));
                  }
                } catch (err: any) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ success: false, error: err?.message || '서버 오류가 발생했습니다.' }));
                }
              });
            } else {
              res.statusCode = 405;
              res.end('Method Not Allowed');
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
