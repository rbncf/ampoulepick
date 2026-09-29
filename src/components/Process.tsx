import React from 'react';
import { processBrand, processCustom } from '../data';
import { 
  PackageCheck, 
  CreditCard, 
  Factory, 
  Truck, 
  FlaskConical, 
  Palette, 
  FileCheck 
} from 'lucide-react';

const brandIcons = [
  PackageCheck, // 01 제품 및 수량 선택
  CreditCard,   // 02 주문 확정 및 계약금 결제
  Factory,      // 03 생산
  Truck,        // 04 출고
];

const customIcons = [
  FlaskConical, // 01 제품 선택
  Palette,      // 02 디자인 및 사양 선택
  FileCheck,    // 03 디자인 시안 확인 및 최종 확정
  CreditCard,   // 04 주문 확정 및 계약금 결제
  Factory,      // 05 생산
  Truck,        // 06 출고
];

export default function Process() {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">주문부터 출고까지 간단하게 진행됩니다</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            준비된 제품과 규격을 기반으로 복잡한 개발 과정을 줄이고 주문 확정부터 생산, 출고까지 빠르게 진행합니다.
          </p>
        </div>

        <div className="space-y-12">
          
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">브랜드 제품 그대로 주문</h3>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {processBrand.map((step, i) => {
                  const IconComponent = brandIcons[i] || PackageCheck;
                  return (
                    <div key={i} className="space-y-4 group">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80 shadow-xs group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-200">
                          <IconComponent className="w-5 h-5" strokeWidth={2.2} />
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-gray-200 tracking-tight group-hover:text-gray-300 transition-colors">
                          {step.step}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg">{step.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  );
                })}
              </div>
              <div className="pt-6 border-t border-gray-100 font-medium text-gray-900">
                생산기간 : <span className="text-blue-600">계약금 입금 후 평균 6주</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">고객 브랜드로 제작</h3>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6">
                {processCustom.map((step, i) => {
                  const IconComponent = customIcons[i] || FlaskConical;
                  return (
                    <div key={i} className="space-y-4 group">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80 shadow-xs group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-200">
                          <IconComponent className="w-5 h-5" strokeWidth={2.2} />
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-gray-200 tracking-tight group-hover:text-gray-300 transition-colors">
                          {step.step}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg">{step.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  );
                })}
              </div>
              <div className="pt-6 border-t border-gray-100 font-medium text-gray-900">
                생산기간 : <span className="text-blue-600">계약금 입금 후 평균 6주</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
