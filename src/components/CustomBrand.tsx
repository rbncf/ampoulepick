import React from 'react';
import { motion } from 'motion/react';

export default function CustomBrand() {
  return (
    <section id="custom-brand" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Value Proposition */}
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">가격 경쟁력은 규격화에서 시작됩니다</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              앰플마다 처음부터 새롭게 개발하는 과정을 줄였습니다. 규격화하여 준비된 처방과 용기, 디자인 템플릿을 기반으로 불필요한 비용은 줄이고 견적과 생산은 더 빠르게 진행합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '준비된 11종의 처방', desc: '이미 개발이 완료된 11종의 처방 중 원하는 제품을 선택합니다. 별도의 처방 개발 과정 없이 바로 생산을 준비할 수 있습니다.' },
              { title: '규격화된 용기와 포장', desc: '제품별로 준비된 용기와 포장 사양을 사용합니다. 반복 발주와 효율적인 자재 운영을 통해 원가를 낮췄습니다.' },
              { title: '5가지 디자인 템플릿', desc: '준비된 5가지 디자인 중 원하는 템플릿을 선택하고 브랜드 로고와 원하는 색상을 전달해 주세요. 고객님의 브랜드에 맞춰 디자인 시안을 제작해 드립니다.' },
              { title: '반복 생산을 통한 효율화', desc: '동일한 제품과 규격을 반복 생산하는 방식으로 자재 구매부터 생산까지 효율을 높이고 비용을 줄였습니다.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-700 font-medium text-base sm:text-lg pt-2">
            앰플의 품질은 높이고, 복잡한 개발 과정과 불필요한 비용을 줄였습니다.
          </p>
        </div>

        {/* Order Methods */}
        <div className="space-y-12 pt-12 border-t border-gray-100">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">원하는 방식으로 주문하세요</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              준비된 브랜드 제품을 그대로 주문하거나 동일한 제품을 고객님의 브랜드로 제작할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-3xl p-8 lg:p-12 space-y-8 relative overflow-hidden group hover:border-blue-200 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              
              <h3 className="text-2xl font-bold text-gray-900 relative z-10">준비된 브랜드 앰플 주문</h3>
              <p className="text-gray-600 relative z-10">
                준비된 완제품을 기존 브랜드 그대로 공급합니다. 별도의 디자인 작업 없이 빠르게 주문할 수 있습니다.
              </p>

              <div className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-4 py-3 rounded-xl relative z-10 flex-wrap">
                <span>앰플 선택</span>
                <span>&rarr;</span>
                <span>주문</span>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl relative z-10 space-y-4">
                <h4 className="font-semibold text-gray-900">이런 고객에게 적합합니다.</h4>
                <ul className="space-y-3">
                  {['바로 판매할 수 있는 제품이 필요한 고객님', '제품 개발과 디자인 과정 없이 빠르게 제품을 확보하려는 고객님', '수출 또는 유통을 위한 경쟁력 있는 제품을 찾는 고객님'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 rounded-3xl p-8 lg:p-12 space-y-8 relative overflow-hidden group hover:border-blue-200 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              
              <h3 className="text-2xl font-bold text-gray-900 relative z-10">고객님 브랜드로 앰플 생산</h3>
              <p className="text-gray-600 relative z-10">
                원하는 앰플과 디자인 템플릿을 선택하면 고객님의 브랜드로 제작합니다.
              </p>
              
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-4 py-3 rounded-xl relative z-10 flex-wrap">
                <span>앰플 선택</span>
                <span>&rarr;</span>
                <span>디자인 선택</span>
                <span>&rarr;</span>
                <span>로고·색상 전달</span>
                <span>&rarr;</span>
                <span>시안 확정</span>
                <span>&rarr;</span>
                <span>주문</span>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl relative z-10 space-y-4">
                <h4 className="font-semibold text-gray-900">이런 고객에게 적합합니다.</h4>
                <ul className="space-y-3">
                  {['자체 브랜드 제품이 필요한 고객님', '새로운 앰플 제품군을 빠르게 추가하려는 고객님', '제품 개발에 필요한 시간과 비용을 줄이고 싶은 고객님'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-3xl p-8 lg:p-12 text-center space-y-4">
            <h3 className="text-2xl font-bold">어떤 방식을 선택해도 가격은 같습니다</h3>
            <p className="text-gray-400">브랜드 제품 그대로 주문 <br /> 고객님 브랜드로 앰플 생산</p>
            <p className="text-lg font-medium">동일한 공급가격 (MOQ 3,000개)</p>
          </div>

          <div className="bg-blue-50 rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row gap-8 justify-between items-center">
            <div className="space-y-4 max-w-2xl">
              <h3 className="text-2xl font-bold text-gray-900">새로운 앰플 처방으로 개발도 가능합니다.</h3>
              <p className="text-gray-600">
                AMPOULE PICK의 준비된 용기와 포장 규격은 그대로 사용하면서 준비된 앰플에 사용된 성분들을 사용하여 고객님이 원하는 콘셉트에 맞춰 새로운 앰플의 처방을 별도로 개발할 수 있습니다.
              </p>
              <p className="text-sm text-gray-500">
                ※ 신규 처방 개발은 기본 11종 앰플과 제작 조건 및 공급 가격이 다르며, 별도 상담을 통해 진행됩니다.
              </p>
            </div>
            <button 
              onClick={() => {
                const el = document.getElementById('inquiry');
                if(el) el.scrollIntoView({behavior: 'smooth'});
              }}
              className="whitespace-nowrap px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              신규 처방 개발 문의
            </button>
          </div>
        </div>

        {/* Templates */}
        <div className="space-y-12 pt-12 border-t border-gray-100">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">고객님 브랜드 디자인 선택만 하면 됩니다</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              준비된 5가지 디자인 템플릿 중 원하는 디자인을 선택하고, 브랜드 로고와 원하는 색상을 전달해 주시면 고객님의 브랜드에 맞춰 디자인 시안을 제작해 드립니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { 
                id: 1, 
                title: '템플릿 01', 
                desc: '로고 강조 (역삼각형)',
                image: '/images/템플릿01 로고 강조 (역삼각형).png',
                fallback: 'https://rbcnf.cafe24.com/ampoulepick/%ED%85%9C%ED%94%8C%EB%A6%BF01%20%EB%A1%9C%EA%B3%A0%20%EA%B0%95%EC%A1%B0%20%28%EC%97%AD%EC%82%BC%EA%B0%81%ED%98%95%29.png'
              },
              { 
                id: 2, 
                title: '템플릿 02', 
                desc: '심플 (중앙 집중형)',
                image: '/images/템플릿02 심플 (중앙 집중형).png',
                fallback: 'https://rbcnf.cafe24.com/ampoulepick/%ED%85%9C%ED%94%8C%EB%A6%BF02%20%EC%8B%AC%ED%94%8C%20%28%EC%A4%91%EC%95%99%20%EC%A7%91%EC%A4%91%ED%98%95%29.png'
              },
              { 
                id: 3, 
                title: '템플릿 03', 
                desc: '제품명 강조 (가로형)',
                image: '/images/템플릿03 제품명 강조 (가로형).png',
                fallback: 'https://rbcnf.cafe24.com/ampoulepick/%ED%85%9C%ED%94%8C%EB%A6%BF03%20%EC%A0%9C%ED%92%88%EB%AA%85%20%EA%B0%95%EC%A1%B0%20%28%EA%B0%80%EB%A1%9C%ED%98%95%29.png'
              },
              { 
                id: 4, 
                title: '템플릿 04', 
                desc: '성분 설명',
                image: '/images/템플릿04 성분 설명.png',
                fallback: 'https://rbcnf.cafe24.com/ampoulepick/%ED%85%9C%ED%94%8C%EB%A6%BF04%20%EC%84%B1%EB%B6%84%20%EC%84%A4%EB%AA%85.png'
              },
              { 
                id: 5, 
                title: '템플릿 05', 
                desc: '배경 삽입',
                image: '/images/템플릿05 배경 삽입.png',
                fallback: 'https://rbcnf.cafe24.com/ampoulepick/%ED%85%9C%ED%94%8C%EB%A6%BF05%20%EB%B0%B0%EA%B2%BD%20%EC%82%BD%EC%9E%85.png'
              },
            ].map((tmpl) => (
              <div key={tmpl.id} className="space-y-3 group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden flex flex-col items-center justify-center border border-gray-100 group-hover:border-blue-200 transition-all group-hover:shadow-md relative">
                  {tmpl.image ? (
                    <img 
                      src={tmpl.image} 
                      alt={`${tmpl.title} - ${tmpl.desc}`} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (tmpl.fallback && target.src !== tmpl.fallback) {
                          target.src = tmpl.fallback;
                        }
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                      <div className="text-gray-400 text-sm mb-2">3D 목업</div>
                      <div className="text-gray-300 text-xs text-center">용기 + 단상자</div>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{tmpl.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{tmpl.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-500 font-medium">※ 모든 템플릿은 고객님의 브랜드 로고와 원하는 색상으로 변경할 수 있습니다.</p>
        </div>

      </div>
    </section>
  );
}
