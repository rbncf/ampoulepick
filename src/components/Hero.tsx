import React from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight"
        >
          앰플 생산 규격화로 제공하는<br />
          <span className="text-blue-600">가격 경쟁력</span>
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 text-lg text-gray-600"
        >
          <p className="font-semibold text-gray-800">
            준비된 앰플을 기준으로, 경쟁력 있는 가격과 빠른 생산이 가능합니다.
          </p>
          <p>
            준비된 브랜드 앰플 그대로 주문 또는 고객의 브랜드로 생산 가능
          </p>
          <p className="bg-gray-100 p-4 rounded-lg inline-block text-sm">
            2가지 주문 방식 모두 동일한 공급가격 · MOQ 3,000개
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <button 
            onClick={() => scrollTo('products')}
            className="px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            준비된 앰플 보기
          </button>
          <button 
            onClick={() => scrollTo('price')}
            className="px-8 py-4 bg-white text-gray-900 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            공급가격 확인하기
          </button>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1 w-full"
      >
        <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden relative flex items-center justify-center">
          <div className="text-gray-400">Hero Image Placeholder</div>
          {/* Add actual image here when available */}
        </div>
      </motion.div>
    </section>
  );
}
