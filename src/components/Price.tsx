import React from 'react';
import { products } from '../data';

export default function Price() {
  return (
    <section id="price" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Price Tables */}
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">기본 가격을 먼저 확인하세요</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              11종 앰플의 기본 공급가격을 별도의 견적 문의 없이 바로 확인할 수 있습니다. 브랜드 제품 그대로 주문하거나 고객님의 브랜드로 제작해도 최소주문수량과 공급가격은 동일합니다.
            </p>
          </div>

          <div className="space-y-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">사용감 중심 앰플 4종</h3>
                <span className="text-sm sm:text-base font-semibold text-gray-700 whitespace-nowrap">MOQ : 3,000개</span>
              </div>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-sm sm:text-base">
                      <th className="py-4 px-4 sm:px-8 font-semibold text-gray-900 w-1/2 sm:w-5/12 text-left">제품</th>
                      <th className="py-4 px-3 sm:px-6 font-semibold text-gray-900 w-1/4 sm:w-3/12 text-center whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>용량</th>
                      <th className="py-4 px-4 sm:px-8 font-semibold text-gray-900 w-1/4 sm:w-4/12 text-right whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>공급가격</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.textureFocus.map((p, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors text-sm sm:text-base">
                        <td className="py-4 px-4 sm:px-8 font-medium text-gray-900">
                          {p.name}
                        </td>
                        <td className="py-4 px-3 sm:px-6 text-gray-600 text-center whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>{p.volume.replace(/\s+/g, '\u00A0')}</span>
                        </td>
                        <td className="py-4 px-4 sm:px-8 text-right font-medium text-gray-900 whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>{p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">고함량 유효성분 앰플 7종</h3>
                <span className="text-sm sm:text-base font-semibold text-gray-700 whitespace-nowrap">MOQ : 3,000개</span>
              </div>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-sm sm:text-base">
                      <th className="py-4 px-4 sm:px-8 font-semibold text-gray-900 w-1/2 sm:w-5/12 text-left">제품</th>
                      <th className="py-4 px-3 sm:px-6 font-semibold text-gray-900 w-1/4 sm:w-3/12 text-center whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>용량</th>
                      <th className="py-4 px-4 sm:px-8 font-semibold text-gray-900 w-1/4 sm:w-4/12 text-right whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>공급가격</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.highEfficacy.map((p, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors text-sm sm:text-base">
                        <td className="py-4 px-4 sm:px-8 font-medium text-gray-900">{p.name}</td>
                        <td className="py-4 px-3 sm:px-6 text-gray-600 text-center whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>
                          <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>{p.volume.replace(/\s+/g, '\u00A0')}</span>
                        </td>
                        <td className="py-4 px-4 sm:px-8 text-right font-medium text-gray-900 whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>{p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-100 rounded-3xl p-8 space-y-6">
              <h4 className="font-bold text-gray-900 text-lg">공급조건</h4>
              <div className="flex flex-wrap gap-4 text-gray-700">
                <span className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium">최소주문수량 3,000개</span>
                <span className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium">부가세 별도</span>
                <span className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium">기본 운송비 포함</span>
                <span className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium">주문생산 평균 6주</span>
                <span className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium">결제 주문 시 50% · 출고 시 50%</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                ※ 공급가격은 내용물, 기본 용기, 용기 인쇄, 단상자 및 포장이 포함된 완제품 기준입니다.<br />
                   용기 및 인쇄 옵션 변경 시 공급가격이 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-12 pt-12 border-t border-gray-200">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">준비된 옵션 안에서 자유롭게 변경이 가능합니다</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              규격화된 사양을 기반으로 용기부터 스포이드, 인쇄 방식까지 고객님의 브랜드에 맞게 원하는 조합을 선택할 수 있습니다. 옵션에 따라 가격은 변동되며 상담을 통해 결정된 옵션을 전달해 주시면 견적을 확인하여 드립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { 
                title: '용기 형태', 
                opts: '각진형 · 둥근형',
                image: '/images/용기 형태.png',
                fallback: 'https://rbcnf.cafe24.com/ampoulepick/%EC%9A%A9%EA%B8%B0%20%ED%98%95%ED%83%9C.png'
              },
              { 
                title: '용기 색상', 
                opts: '투명 · 무광 반투명 · 갈색',
                image: '/images/용기 색상.png',
                fallback: 'https://rbcnf.cafe24.com/ampoulepick/%EC%9A%A9%EA%B8%B0%20%EC%83%89%EC%83%81.png'
              },
              { 
                title: '스포이드 고무', 
                opts: '화이트 · 블랙',
                image: '/images/스포이드 고무.png',
                fallback: 'https://rbcnf.cafe24.com/ampoulepick/%EC%8A%A4%ED%8F%AC%EC%9D%B4%EB%93%9C%20%EA%B3%A0%EB%AC%B4.png'
              },
              { 
                title: '스포이드 링', 
                opts: '실버 · 골드 · 화이트 · 블랙',
                image: '/images/스포이드 링.png',
                fallback: 'https://rbcnf.cafe24.com/ampoulepick/%EC%8A%A4%ED%8F%AC%EC%9D%B4%EB%93%9C%20%EB%A7%81.png'
              },
              { 
                title: '안전캡 스포이드', 
                opts: '화이트 · 블랙',
                image: '/images/안전캡 스포이드.png',
                fallback: 'https://rbcnf.cafe24.com/ampoulepick/%EC%95%88%EC%A0%84%EC%BA%A1%20%EC%8A%A4%ED%8F%AC%EC%9D%B4%EB%93%9C.png'
              },
              { 
                title: '인쇄 방식', 
                opts: '실크스크린 인쇄 · 스티커 라벨',
                image: '/images/인쇄 방식.png',
                fallback: 'https://rbcnf.cafe24.com/ampoulepick/%EC%9D%B8%EC%87%84%20%EB%B0%A9%EC%8B%9D.png'
              }
            ].map((opt, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
                  <img 
                    src={opt.image} 
                    alt={opt.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (opt.fallback && target.src !== opt.fallback) {
                        target.src = opt.fallback;
                      }
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{opt.title}</h4>
                  <p className="text-gray-600 mt-1">{opt.opts}</p>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-500 text-sm">
            ※ 각 옵션은 자유롭게 조합할 수 있으며, 안전캡 스포이드는 둥근형 용기에만 적용할 수 있습니다.
          </p>
        </div>

      </div>
    </section>
  );
}
