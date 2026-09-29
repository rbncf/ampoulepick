import React from 'react';
import { products } from '../data';

export default function Inquiry() {
  const allProducts = [...products.textureFocus, ...products.highEfficacy];

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
          
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-medium text-gray-900 text-sm">
                  <span className="text-red-500 font-bold mr-1">*</span>회사명
                </label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-gray-900 text-sm">
                  <span className="text-red-500 font-bold mr-1">*</span>담당자명
                </label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-gray-900 text-sm">
                  <span className="text-red-500 font-bold mr-1">*</span>연락처
                </label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="block font-medium text-gray-900 text-sm">
                  <span className="text-red-500 font-bold mr-1">*</span>이메일
                </label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <label className="font-medium text-gray-900 text-sm">회사 홈페이지 또는 간략한 회사 소개</label>
                  <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200/80 rounded-md">선택사항</span>
                </div>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <label className="font-medium text-gray-900 text-sm">주요 판매 국가 또는 유통채널</label>
                  <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200/80 rounded-md">선택사항</span>
                </div>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <label className="font-medium text-gray-900">관심 앰플</label>
                <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200/80 rounded-md">선택사항</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-gray-200">
                {allProducts.map(p => (
                  <label key={p.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 checked:bg-blue-600 checked:border-blue-600 transition-colors cursor-pointer" />
                      <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors select-none">{p.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <label className="font-medium text-gray-900">검토 중인 주문 방식</label>
                <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200/80 rounded-md">선택사항</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl border border-gray-200">
                {['브랜드 제품 그대로 주문', '고객 브랜드로 제작', '아직 결정하지 않음'].map((method, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center justify-center w-5 h-5">
                      <input type="radio" name="orderMethodInquiry" className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 checked:border-blue-600 transition-colors cursor-pointer" />
                      <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors select-none">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-medium text-gray-900 text-sm">
                <span className="text-red-500 font-bold mr-1">*</span>문의내용
                <span className="text-gray-400 font-normal text-xs ml-1.5">(자유롭게 적어주세요)</span>
              </label>
              <textarea className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"></textarea>
            </div>

            <div className="pt-4 flex flex-col items-center gap-4">
              <button type="submit" className="px-12 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-sm w-full sm:w-auto">
                거래 문의하기
              </button>
              <p className="text-center text-sm font-medium text-gray-600">
                ※문의 접수 후 영업일 기준 +2일 이내에 연락 드립니다. (토, 일 및 공휴일 제외)
              </p>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
