import React from 'react';
import { products } from '../data';
import { motion } from 'motion/react';

export default function Products() {
  return (
    <section id="products" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">준비된 앰플을 검토하고 선택하기만 하면 됩니다</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            처방부터 용기, 포장, 디자인까지 준비된 11종의 앰플로 <br className="hidden sm:block" />
            개발에 필요한 시간과 비용을 줄였습니다.
          </p>
          <div className="inline-flex gap-4 items-center text-sm font-medium text-blue-600 bg-blue-50 px-6 py-2 rounded-full">
            <span>데일리 밸런스 앰플 4종</span>
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            <span>고함량 유효성분 앰플 7종</span>
          </div>
        </div>

        <div className="space-y-16">
          {/* Daily Balance 4 */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">데일리 밸런스 앰플 4종</h3>
              <p className="text-gray-600">핵심 성분과 콘셉트는 유지하면서 매일 편안하게 사용할 수 있는 발림성과 사용감에 중점을 둔 제품입니다.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.textureFocus.map((product, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={product.id} 
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full"
                >
                  <div className="aspect-square bg-gray-50/80 rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-gray-100">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        referrerPolicy="no-referrer" 
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if ('fallbackImage' in product && product.fallbackImage && target.src !== product.fallbackImage) {
                            target.src = product.fallbackImage as string;
                          }
                        }}
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">[제품 이미지]</span>
                    )}
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h4>
                  <p className="text-sm text-blue-600 font-medium mb-4">{product.volume}</p>
                  <div className="mt-auto pt-4 border-t border-gray-50 text-right">
                    <button className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                      자세히 보기 &rarr;
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* High Efficacy 7 */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">고함량 유효성분 앰플 7종</h3>
              <p className="text-gray-600">고함량 유효성분을 중심으로 구성하여 성분과 함량을 명확한 판매 포인트로 활용할 수 있는 제품입니다.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {products.highEfficacy.map((product, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.1 }}
                  key={product.id} 
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full"
                >
                  <div className="aspect-square bg-gray-50/80 rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-gray-100">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        referrerPolicy="no-referrer" 
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if ('fallbackImage' in product && product.fallbackImage && target.src !== product.fallbackImage) {
                            target.src = product.fallbackImage as string;
                          }
                        }}
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">[제품 이미지]</span>
                    )}
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h4>
                  <p className="text-sm text-blue-600 font-medium mb-4">{product.volume}</p>
                  <div className="mt-auto pt-4 border-t border-gray-50 text-right">
                    <button className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                      자세히 보기 &rarr;
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
