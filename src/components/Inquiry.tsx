import React, { useState } from 'react';
import { products } from '../data';
import { CheckCircle2, AlertCircle, Loader2, Send, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Inquiry() {
  const allProducts = [...products.textureFocus, ...products.highEfficacy];

  const [formData, setFormData] = useState({
    company: '',
    contactPerson: '',
    phone: '',
    email: '',
    companyIntro: '',
    salesChannel: '',
    selectedProducts: [] as string[],
    orderMethod: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [inquiryId, setInquiryId] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.company.trim()) {
      newErrors.company = '회사명을 입력해 주세요.';
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = '담당자명을 입력해 주세요.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해 주세요.';
    }
    if (!formData.email.trim()) {
      newErrors.email = '이메일 주소를 입력해 주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = '올바른 이메일 형식을 입력해 주세요 (예: name@company.com).';
    }
    if (!formData.message.trim()) {
      newErrors.message = '문의내용을 입력해 주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleProductToggle = (productName: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedProducts.includes(productName);
      return {
        ...prev,
        selectedProducts: isSelected
          ? prev.selectedProducts.filter(name => name !== productName)
          : [...prev.selectedProducts, productName]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(`inquiry-field-${firstErrorKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          inquiryType: 'business',
          company: formData.company,
          contactPerson: formData.contactPerson,
          phone: formData.phone,
          email: formData.email,
          companyIntro: formData.companyIntro,
          salesChannel: formData.salesChannel,
          selectedProducts: formData.selectedProducts,
          orderMethod: formData.orderMethod,
          message: formData.message,
          hp_field: honeypot
        })
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || result.success !== true) {
        const errorMsg = result?.error || '거래 문의 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
        setSubmitError(errorMsg);
        return;
      }

      // 실제 성공 응답을 확인한 경우에만 성공 상태 및 모달 표시
      setInquiryId(result.inquiryId || '');
      setSubmittedData({ ...formData });
      setShowSuccessModal(true);

      // 성공 시에만 폼 초기화
      setFormData({
        company: '',
        contactPerson: '',
        phone: '',
        email: '',
        companyIntro: '',
        salesChannel: '',
        selectedProducts: [],
        orderMethod: '',
        message: '',
      });
      setErrors({});
      setSubmitError(null);

    } catch (err: any) {
      setSubmitError('네트워크 연결 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">제품 주문 및 제작 문의</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            앰플 주문 또는 고객 브랜드 샘플 생산에 대해 궁금한 사항을 남겨주세요. 확인 후 담당자가 안내해 드립니다.
          </p>
        </div>

        <div className="bg-gray-50 p-8 md:p-12 rounded-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 border-b border-gray-200 pb-4 gap-2">
            <h3 className="text-2xl font-bold text-gray-900">거래문의</h3>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
              <span className="text-red-500 font-bold text-base leading-none">*</span>
              <span>표시는 필수 입력 항목입니다</span>
            </div>
          </div>
          
          <form className="space-y-8" onSubmit={handleSubmit} noValidate>
            {/* Honeypot field for bot protection */}
            <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
              <input 
                type="text" 
                name="hp_field" 
                value={honeypot} 
                onChange={(e) => setHoneypot(e.target.value)} 
                tabIndex={-1} 
                autoComplete="off" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 회사명 */}
              <div id="inquiry-field-company" className="space-y-2">
                <label className="block font-medium text-gray-900">
                  <span className="text-red-500 font-bold mr-1">*</span>회사명
                </label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="예: 주식회사 앰플픽"
                  className={`w-full bg-white border rounded-xl px-4 py-3 focus:outline-none transition-shadow ${
                    errors.company ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
                  }`} 
                />
                {errors.company && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.company}</span>
                  </p>
                )}
              </div>

              {/* 담당자명 */}
              <div id="inquiry-field-contactPerson" className="space-y-2">
                <label className="block font-medium text-gray-900">
                  <span className="text-red-500 font-bold mr-1">*</span>담당자명
                </label>
                <input 
                  type="text" 
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="예: 홍길동 팀장"
                  className={`w-full bg-white border rounded-xl px-4 py-3 focus:outline-none transition-shadow ${
                    errors.contactPerson ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
                  }`} 
                />
                {errors.contactPerson && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.contactPerson}</span>
                  </p>
                )}
              </div>

              {/* 연락처 */}
              <div id="inquiry-field-phone" className="space-y-2">
                <label className="block font-medium text-gray-900">
                  <span className="text-red-500 font-bold mr-1">*</span>연락처
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="예: 010-1234-5678"
                  className={`w-full bg-white border rounded-xl px-4 py-3 focus:outline-none transition-shadow ${
                    errors.phone ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
                  }`} 
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* 이메일 */}
              <div id="inquiry-field-email" className="space-y-2">
                <label className="block font-medium text-gray-900">
                  <span className="text-red-500 font-bold mr-1">*</span>이메일
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="예: contact@company.com"
                  className={`w-full bg-white border rounded-xl px-4 py-3 focus:outline-none transition-shadow ${
                    errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
                  }`} 
                />
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* 회사 홈페이지 또는 간략한 회사 소개 */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <label className="font-medium text-gray-900">회사 홈페이지 또는 간략한 회사 소개</label>
                  <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200/80 rounded-md">선택사항</span>
                </div>
                <input 
                  type="text" 
                  name="companyIntro"
                  value={formData.companyIntro}
                  onChange={handleChange}
                  placeholder="예: https://example.com 또는 뷰티 브랜드 운영사"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
                />
              </div>

              {/* 주요 판매 국가 또는 유통채널 */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <label className="font-medium text-gray-900">주요 판매 국가 또는 유통채널</label>
                  <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200/80 rounded-md">선택사항</span>
                </div>
                <input 
                  type="text" 
                  name="salesChannel"
                  value={formData.salesChannel}
                  onChange={handleChange}
                  placeholder="예: 국내 오픈마켓, 일본 큐텐, 북미 아마존 등"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
                />
              </div>
            </div>

            {/* 관심 앰플 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <label className="font-medium text-gray-900">관심 앰플</label>
                <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200/80 rounded-md">선택사항</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-gray-200">
                {allProducts.map(p => {
                  const isChecked = formData.selectedProducts.includes(p.name);
                  return (
                    <label 
                      key={p.id} 
                      className="flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer hover:bg-gray-50 select-none"
                    >
                      <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => handleProductToggle(p.name)}
                          className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 checked:bg-blue-600 checked:border-blue-600 transition-colors cursor-pointer" 
                        />
                        <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={`text-sm ${isChecked ? 'font-bold text-blue-600' : 'text-gray-700'}`}>{p.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 검토 중인 주문 방식 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <label className="font-medium text-gray-900">검토 중인 주문 방식</label>
                <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200/80 rounded-md">선택사항</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl border border-gray-200">
                {['브랜드 제품 그대로 주문', '고객 브랜드로 제작', '아직 결정하지 않음'].map((method, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <input 
                        type="radio" 
                        name="orderMethod" 
                        value={method}
                        checked={formData.orderMethod === method}
                        onChange={handleChange}
                        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 checked:border-blue-600 transition-colors cursor-pointer" 
                      />
                      <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors font-medium">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 문의내용 */}
            <div id="inquiry-field-message" className="space-y-2">
              <label className="block font-medium text-gray-900">
                <span className="text-red-500 font-bold mr-1">*</span>문의내용
                <span className="text-gray-400 font-normal text-xs ml-1.5">(자유롭게 적어주세요)</span>
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="궁금하신 내용이나 제작 견적, 상담 요청 내용을 적어주세요."
                className={`w-full bg-white border rounded-xl px-4 py-3 h-40 resize-none focus:outline-none transition-shadow ${
                  errors.message ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
                }`}
              ></textarea>
              {errors.message && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* 제출 버튼 */}
            <div className="pt-4 flex flex-col items-center gap-4">
              {/* 제출 에러 메시지 배너 */}
              {submitError && (
                <div className="w-full max-w-xl p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-700 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">문의 접수 실패</p>
                    <p className="text-red-600">{submitError}</p>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-12 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-sm w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>문의 내용 접수 중...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>거래 문의하기</span>
                  </>
                )}
              </button>
              <p className="text-center text-sm font-medium text-gray-600">
                ※문의 접수 후 영업일 기준 +2일 이내에 연락 드립니다. <br /> (토, 일 및 공휴일 제외)
              </p>
            </div>
          </form>
        </div>

      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 text-center"
            >
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-100 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">거래 문의가 접수되었습니다!</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  담당자가 접수된 신청서를 확인한 후, 연락처 또는 이메일로 발송 안내를 회신드리겠습니다.
                </p>
              </div>

              {submittedData && (
                <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 text-left text-sm space-y-2.5 border border-gray-100 max-h-[60vh] overflow-y-auto">
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200/70 pb-2 gap-0.5">
                    <span className="text-gray-500 shrink-0">회사명</span>
                    <span className="font-semibold text-gray-900 sm:text-right">{submittedData.company}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200/70 pb-2 gap-0.5">
                    <span className="text-gray-500 shrink-0">담당자명</span>
                    <span className="font-semibold text-gray-900 sm:text-right">{submittedData.contactPerson}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200/70 pb-2 gap-0.5">
                    <span className="text-gray-500 shrink-0">연락처</span>
                    <span className="font-semibold text-gray-900 sm:text-right">{submittedData.phone}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200/70 pb-2 gap-0.5">
                    <span className="text-gray-500 shrink-0">이메일</span>
                    <span className="font-semibold text-gray-900 sm:text-right">{submittedData.email}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200/70 pb-2 gap-0.5">
                    <span className="text-gray-500 shrink-0">회사 홈페이지 / 소개</span>
                    <span className="font-medium text-gray-900 sm:text-right break-all">{submittedData.companyIntro || '미기재'}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200/70 pb-2 gap-0.5">
                    <span className="text-gray-500 shrink-0">주요 판매 국가 / 유통채널</span>
                    <span className="font-medium text-gray-900 sm:text-right">{submittedData.salesChannel || '미기재'}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200/70 pb-2 gap-0.5">
                    <span className="text-gray-500 shrink-0">관심 앰플</span>
                    <span className="font-semibold text-blue-600 sm:text-right">
                      {submittedData.selectedProducts.length > 0 ? submittedData.selectedProducts.join(', ') : '선택 안 함'}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200/70 pb-2 gap-0.5">
                    <span className="text-gray-500 shrink-0">검토 중인 주문 방식</span>
                    <span className="font-semibold text-gray-900 sm:text-right">{submittedData.orderMethod || '미선택'}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between pt-0.5 gap-0.5">
                    <span className="text-gray-500 shrink-0">문의내용</span>
                    <span className="font-medium text-gray-800 sm:text-right whitespace-pre-wrap">{submittedData.message}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={`mailto:oneteam@rbcnf.co.kr?subject=${encodeURIComponent(
                    `[AMPOULE PICK] 거래 문의서 - ${submittedData?.company || ''} (${submittedData?.contactPerson || ''})`
                  )}&body=${encodeURIComponent(
                    `[AMPOULE PICK 거래 문의서]\n\n` +
                    `1. 회사명: ${submittedData?.company || ''}\n` +
                    `2. 담당자명: ${submittedData?.contactPerson || ''}\n` +
                    `3. 연락처: ${submittedData?.phone || ''}\n` +
                    `4. 이메일: ${submittedData?.email || ''}\n` +
                    `5. 회사 홈페이지/소개: ${submittedData?.companyIntro || '미기재'}\n` +
                    `6. 주요 판매국가/유통채널: ${submittedData?.salesChannel || '미기재'}\n` +
                    `7. 관심 앰플: ${submittedData?.selectedProducts.length ? submittedData?.selectedProducts.join(', ') : '선택 안 함'}\n` +
                    `8. 주문 방식: ${submittedData?.orderMethod || '미선택'}\n` +
                    `9. 문의내용: ${submittedData?.message || ''}\n`
                  )}`}
                  className="w-full sm:w-1/2 py-3.5 px-3 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 border border-blue-200"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>이메일 앱으로 직접 발송</span>
                </a>
                <button 
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full sm:w-1/2 py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors cursor-pointer text-sm"
                >
                  확인
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
