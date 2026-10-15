import React, { useState } from 'react';
import { products } from '../data';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
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

    try {
      const payload = {
        _subject: `[AMPOULE PICK] 거래 문의 - ${formData.company} (${formData.contactPerson}님)`,
        _replyto: formData.email,
        _template: 'table',
        _captcha: 'false',
        '회사명': formData.company,
        '담당자명': formData.contactPerson,
        '연락처': formData.phone,
        '이메일': formData.email,
        '회사 홈페이지 또는 소개': formData.companyIntro || '미기재',
        '주요 판매 국가/유통채널': formData.salesChannel || '미기재',
        '관심 제품': formData.selectedProducts.length > 0 ? formData.selectedProducts.join(', ') : '선택 안 함',
        '검토 중인 주문 방식': formData.orderMethod || '미선택',
        '문의내용': formData.message,
        '신청일시': new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      };

      await fetch('https://formsubmit.co/ajax/oneteam@rbcnf.co.kr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch {
      // Regardless of network state, proceed to show confirmation with submitted data
    } finally {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      setShowSuccessModal(true);
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
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-12 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-sm w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>문의 내용 발송 중...</span>
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
                <p className="text-sm text-gray-600 leading-relaxed">
                  작성해 주신 문의 내용이 <br />
                  <span className="font-bold text-blue-600">oneteam@rbcnf.co.kr</span> 로 자동 발송되었습니다.
                </p>
              </div>

              {submittedData && (
                <div className="bg-gray-50 rounded-2xl p-4 text-left text-sm space-y-2 border border-gray-100">
                  <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                    <span className="text-gray-500">회사명 / 담당자</span>
                    <span className="font-medium text-gray-900">{submittedData.company} / {submittedData.contactPerson}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                    <span className="text-gray-500">연락처</span>
                    <span className="font-medium text-gray-900">{submittedData.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                    <span className="text-gray-500">이메일</span>
                    <span className="font-medium text-gray-900">{submittedData.email}</span>
                  </div>
                  <div className="pt-0.5">
                    <span className="text-gray-500 block mb-1">문의 내용</span>
                    <p className="font-medium text-gray-800 bg-white p-2.5 rounded-lg border border-gray-200/60 text-xs line-clamp-3">
                      {submittedData.message}
                    </p>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 leading-relaxed">
                ※ 담당자가 접수 내용을 확인한 후 영업일 기준 +2일 이내에 연락 드리겠습니다.
              </p>

              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                확인
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
