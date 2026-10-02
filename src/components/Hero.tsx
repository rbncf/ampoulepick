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
        className="flex-1 w-full flex items-center justify-center p-0"
      >
        <img 
          src="/images/단체사진 2줄 배경없음.png" 
          alt="AMPOULE PICK 11종 앰플 라인업" 
          referrerPolicy="no-referrer"
          className="w-full h-auto max-w-xl object-contain drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.18)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.1))' }}
          onError={(e) => {
            const target = e.currentTarget;
            const fallback = 'https://rbcnf.cafe24.com/ampoulepick/%EB%8B%A8%EC%B2%B4%EC%82%AC%EC%A7%84%202%EC%A4%84%20%EB%B0%B0%EA%B2%BD%EC%97%86%EC%9D%8C.png';
            if (target.src !== fallback) {
              target.src = fallback;
            }
          }}
        />
      </motion.div>
    </section>
  );
}
