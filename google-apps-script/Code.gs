/**
 * [AMPOULE PICK] 구글 시트 저장 및 이메일 자동 알림 Google Apps Script
 *
 * 1. 스프레드시트 열 순서 (13개):
 *    접수번호 | 접수일시 | 진행 상태 | 회사명 | 담당자명 | 연락처 | 이메일 | 회사 홈페이지/소개 | 판매 국가/유통채널 | 관심 제품 | 주문 방식 | 문의 내용 | 내부 메모
 *
 * 2. 시트 분기:
 *    - inquiryType === "sample"   -> "샘플 신청" 시트
 *    - inquiryType === "business" -> "거래 문의" 시트
 *
 * 3. 보안 및 설정:
 *    - [프로젝트 설정] > [스크립트 속성]에 APP_SHARED_SECRET 설정 필수
 *    - 공유 비밀값이 없거나 일치하지 않는 요청은 즉시 거부 (401 에러 반환)
 *    - 수식 주입(Formula Injection) 방지 처리 (=, +, -, @ 접두사 무력화)
 *    - 개인정보 및 비밀값 로그 제외
 */

// 알림 수신 이메일 주소
var NOTIFICATION_RECIPIENT = "oneteam@rbcnf.co.kr";

function doPost(e) {
  var lock = LockService.getScriptLock();
  // 동시 요청 충돌 방지를 위해 최대 10초 대기
  lock.tryLock(10000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ success: false, error: "요청 본문이 비어 있습니다." });
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      return createJsonResponse({ success: false, error: "유효한 JSON 형식이 아닙니다." });
    }

    // 1. 공유 비밀값 검증 (Script Properties의 APP_SHARED_SECRET과 대조)
    var scriptProperties = PropertiesService.getScriptProperties();
    var expectedSecret = scriptProperties.getProperty("APP_SHARED_SECRET");

    if (!expectedSecret || expectedSecret.trim() === "") {
      return createJsonResponse({
        success: false,
        error: "Google Apps Script 속성에 APP_SHARED_SECRET이 구성되지 않았습니다. 관리자 설정을 완료해 주세요."
      });
    }

    if (!data.secret || String(data.secret) !== String(expectedSecret)) {
      return createJsonResponse({
        success: false,
        error: "인증 실패: 유효하지 않거나 일치하지 않는 비밀값입니다."
      });
    }

    // 2. 문의 유형 검증 (sample 또는 business)
    var inquiryType = data.inquiryType;
    if (inquiryType !== "sample" && inquiryType !== "business") {
      return createJsonResponse({ success: false, error: "올바르지 않은 inquiryType입니다. (sample 또는 business)" });
    }

    // 3. 공통 필수 필드 검증 (회사명, 담당자명, 연락처, 이메일)
    if (!data.company || String(data.company).trim() === "") {
      return createJsonResponse({ success: false, error: "회사명이 누락되었습니다." });
    }
    if (!data.contactPerson || String(data.contactPerson).trim() === "") {
      return createJsonResponse({ success: false, error: "담당자명이 누락되었습니다." });
    }
    if (!data.phone || String(data.phone).trim() === "") {
      return createJsonResponse({ success: false, error: "연락처가 누락되었습니다." });
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(String(data.email).trim())) {
      return createJsonResponse({ success: false, error: "유효한 이메일 형식이 아닙니다." });
    }

    // 4. 유형별 필수 필드 검증
    if (inquiryType === "sample") {
      if (!data.companyIntro || String(data.companyIntro).trim() === "") {
        return createJsonResponse({ success: false, error: "회사 홈페이지 또는 회사 소개를 입력해 주세요." });
      }
      if (!data.salesChannel || String(data.salesChannel).trim() === "") {
        return createJsonResponse({ success: false, error: "주요 판매 국가 또는 유통채널을 입력해 주세요." });
      }
      if (!Array.isArray(data.selectedProducts) || data.selectedProducts.length === 0) {
        return createJsonResponse({ success: false, error: "관심 제품을 최소 1개 이상 선택해 주세요." });
      }
      if (data.selectedProducts.length > 3) {
        return createJsonResponse({ success: false, error: "샘플 신청 관심 제품은 최대 3개까지만 선택 가능합니다." });
      }
      if (!data.orderMethod || String(data.orderMethod).trim() === "") {
        return createJsonResponse({ success: false, error: "검토 중인 주문 방식을 선택해 주세요." });
      }
    } else {
      if (!data.message || String(data.message).trim() === "") {
        return createJsonResponse({ success: false, error: "문의내용을 입력해 주세요." });
      }
    }

    var targetSheetName = inquiryType === "sample" ? "샘플 신청" : "거래 문의";
    var prefix = inquiryType === "sample" ? "SMP" : "BIZ";

    // 5. 스프레드시트 및 대상 시트 가져오기 (없으면 자동 생성 및 헤더 삽입)
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(targetSheetName);

    var HEADERS = [
      "접수번호",
      "접수일시",
      "진행 상태",
      "회사명",
      "담당자명",
      "연락처",
      "이메일",
      "회사 홈페이지/소개",
      "판매 국가/유통채널",
      "관심 제품",
      "주문 방식",
      "문의 내용",
      "내부 메모"
    ];

    if (!sheet) {
      sheet = ss.insertSheet(targetSheetName);
      sheet.appendRow(HEADERS);
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground("#F3F4F6");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    } else if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground("#F3F4F6");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // 6. 접수일시 (한국 시간 KST) 및 접수번호 생성
    var now = new Date();
    var submittedAt = Utilities.formatDate(now, "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
    var dateCode = Utilities.formatDate(now, "Asia/Seoul", "yyyyMMdd");
    var randomNum = Math.floor(1000 + Math.random() * 9000);
    var inquiryId = prefix + "-" + dateCode + "-" + randomNum;

    // 7. 데이터 정제 및 수식 주입 방지 (Formula Injection 방지)
    var company = sanitizeCell(data.company);
    var contactPerson = sanitizeCell(data.contactPerson);
    var phone = sanitizeCell(data.phone);
    var email = sanitizeCell(data.email);
    var companyIntro = sanitizeCell(data.companyIntro || "");
    var salesChannel = sanitizeCell(data.salesChannel || "");
    var productsStr = Array.isArray(data.selectedProducts)
      ? sanitizeCell(data.selectedProducts.join(", "))
      : sanitizeCell(data.selectedProducts || "");
    var orderMethod = sanitizeCell(data.orderMethod || "");
    var message = sanitizeCell(data.message || "");

    // 8. 시트에 행 추가 (지정된 13개 열 순서 정확히 준수)
    sheet.appendRow([
      inquiryId,          // 1. 접수번호
      submittedAt,        // 2. 접수일시
      "신규 접수",         // 3. 진행 상태
      company,            // 4. 회사명
      contactPerson,      // 5. 담당자명
      phone,              // 6. 연락처
      email,              // 7. 이메일
      companyIntro,       // 8. 회사 홈페이지/소개
      salesChannel,       // 9. 판매 국가/유통채널
      productsStr,        // 10. 관심 제품
      orderMethod,        // 11. 주문 방식
      message,            // 12. 문의 내용
      ""                  // 13. 내부 메모
    ]);

    // 9. 이메일 알림 발송 (oneteam@rbcnf.co.kr)
    var emailSent = false;
    try {
      var subjectTitle = inquiryType === "sample" ? "샘플 신청" : "거래 문의";
      var emailSubject = "[AMPOULE PICK] " + subjectTitle + " - " + unquoteCell(company);

      var emailBodyHtml =
        '<div style="font-family: \'Apple SD Gothic Neo\', \'Malgun Gothic\', sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">' +
        '  <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 20px;">' +
        '    <span style="display: inline-block; background-color: #eff6ff; color: #2563eb; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; margin-bottom: 8px;">AMPOULE PICK</span>' +
        '    <h2 style="margin: 0; color: #111827; font-size: 20px;">' + subjectTitle + '이 접수되었습니다</h2>' +
        '    <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 13px;">접수번호: <b>' + inquiryId + '</b> | 접수일시: ' + submittedAt + '</p>' +
        '  </div>' +
        '  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">' +
        '    <tr><td style="padding: 10px 12px; background-color: #f9fafb; color: #4b5563; font-weight: 600; width: 140px; border-bottom: 1px solid #e5e7eb;">회사명</td><td style="padding: 10px 12px; color: #111827; border-bottom: 1px solid #e5e7eb; font-weight: 700;">' + escapeHtml(unquoteCell(company)) + '</td></tr>' +
        '    <tr><td style="padding: 10px 12px; background-color: #f9fafb; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb;">담당자명</td><td style="padding: 10px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">' + escapeHtml(unquoteCell(contactPerson)) + '</td></tr>' +
        '    <tr><td style="padding: 10px 12px; background-color: #f9fafb; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb;">연락처</td><td style="padding: 10px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">' + escapeHtml(unquoteCell(phone)) + '</td></tr>' +
        '    <tr><td style="padding: 10px 12px; background-color: #f9fafb; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb;">이메일</td><td style="padding: 10px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;"><a href="mailto:' + escapeHtml(unquoteCell(email)) + '" style="color: #2563eb; text-decoration: none;">' + escapeHtml(unquoteCell(email)) + '</a></td></tr>' +
        '    <tr><td style="padding: 10px 12px; background-color: #f9fafb; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb;">홈페이지 / 소개</td><td style="padding: 10px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">' + escapeHtml(unquoteCell(companyIntro || "미기재")) + '</td></tr>' +
        '    <tr><td style="padding: 10px 12px; background-color: #f9fafb; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb;">판매 국가 / 채널</td><td style="padding: 10px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">' + escapeHtml(unquoteCell(salesChannel || "미기재")) + '</td></tr>' +
        '    <tr><td style="padding: 10px 12px; background-color: #f9fafb; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb;">관심 앰플</td><td style="padding: 10px 12px; color: #2563eb; border-bottom: 1px solid #e5e7eb; font-weight: 600;">' + escapeHtml(unquoteCell(productsStr || "선택 안 함")) + '</td></tr>' +
        '    <tr><td style="padding: 10px 12px; background-color: #f9fafb; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb;">주문 방식</td><td style="padding: 10px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">' + escapeHtml(unquoteCell(orderMethod || "미선택")) + '</td></tr>' +
        '    <tr><td style="padding: 10px 12px; background-color: #f9fafb; color: #4b5563; font-weight: 600; border-bottom: 1px solid #e5e7eb; vertical-align: top;">문의 / 요청사항</td><td style="padding: 10px 12px; color: #111827; border-bottom: 1px solid #e5e7eb; white-space: pre-wrap; line-height: 1.5;">' + escapeHtml(unquoteCell(message || "없음")) + '</td></tr>' +
        '  </table>' +
        '  <div style="font-size: 12px; color: #9ca3af; text-align: center; border-top: 1px solid #f3f4f6; padding-top: 12px;">' +
        '    본 메일은 AMPOULE PICK 웹사이트를 통해 접수된 실시간 알림입니다.' +
        '  </div>' +
        '</div>';

      MailApp.sendEmail({
        to: NOTIFICATION_RECIPIENT,
        replyTo: unquoteCell(email),
        subject: emailSubject,
        htmlBody: emailBodyHtml
      });
      emailSent = true;
    } catch (mailErr) {
      // 메일 발송 실패 시에도 시트 저장은 성공했으므로 분리하여 기록
      emailSent = false;
    }

    return createJsonResponse({
      success: true,
      inquiryId: inquiryId,
      emailSent: emailSent,
      sheet: targetSheetName
    });

  } catch (globalErr) {
    return createJsonResponse({
      success: false,
      error: "스프레드시트 처리 중 서버 에러가 발생했습니다."
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * 수식 주입(Formula Injection) 방지:
 * 문자열이 '=', '+', '-', '@'로 시작할 경우 앞에 작은따옴표(')를 추가하여
 * 스프레드시트에서 수식으로 실행되지 않도록 강제 문자열 처리합니다.
 */
function sanitizeCell(value) {
  if (value === null || value === undefined) return "";
  var str = String(value).trim();
  if (str.length > 0 && (str.charAt(0) === '=' || str.charAt(0) === '+' || str.charAt(0) === '-' || str.charAt(0) === '@')) {
    return "'" + str;
  }
  return str;
}

function unquoteCell(value) {
  if (!value) return "";
  var str = String(value);
  if (str.charAt(0) === "'") {
    return str.substring(1);
  }
  return str;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// 브라우저 직접 접근 방지 (GET 요청)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    service: "AMPOULE PICK Inquiry Integration API",
    note: "POST 요청만 허용됩니다."
  })).setMimeType(ContentService.MimeType.JSON);
}
