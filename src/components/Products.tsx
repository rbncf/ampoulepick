import React, { useState, useEffect } from 'react';
import { products } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer flex flex-col h-full"
                >
                  <div className="aspect-square bg-gray-50/80 rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-gray-100">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        referrerPolicy="no-referrer" 
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
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
                  <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h4>
                  <p className="text-sm text-blue-600 font-medium mb-4">{product.volume}</p>
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">공급가격 {product.price}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                    >
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
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer flex flex-col h-full"
                >
                  <div className="aspect-square bg-gray-50/80 rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-gray-100">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        referrerPolicy="no-referrer" 
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
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
                  <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h4>
                  <p className="text-sm text-blue-600 font-medium mb-4">{product.volume}</p>
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">공급가격 {product.price}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                    >
                      자세히 보기 &rarr;
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden relative"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white/95 sticky top-0 z-10 backdrop-blur-xs">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 inline-block">
                    {selectedProduct.id?.startsWith('he') ? '고함량 유효성분' : '데일리 밸런스'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{selectedProduct.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body - Scrollable Detail Image */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50 flex-1">
                {selectedProduct.detailImage ? (
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <img 
                      src={selectedProduct.detailImage} 
                      alt={`${selectedProduct.name} 상세 정보`} 
                      referrerPolicy="no-referrer"
                      className="w-full h-auto block"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (selectedProduct.detailFallbackImage && target.src !== selectedProduct.detailFallbackImage) {
                          target.src = selectedProduct.detailFallbackImage;
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="p-12 text-center text-gray-400">
                    상세 정보 이미지를 준비 중입니다.
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-white flex items-center justify-between gap-3">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  닫기
                </button>
                <button 
                  onClick={() => {
                    setSelectedProduct(null);
                    const el = document.getElementById('inquiry');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-sm shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>이 앰플 주문·상담 문의하기</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
