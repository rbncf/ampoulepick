export const products = {
  textureFocus: [
    {
      id: 'tf1',
      name: '리뉴잉 퍼밍 앰플',
      keyIngredient: '콜라겐',
      volume: '30\u00A0mL',
      price: '₩1,550',
      moq: '3,000개',
    },
    {
      id: 'tf2',
      name: '레디언스 브라이트 앰플',
      keyIngredient: '비타민 C',
      volume: '30\u00A0mL',
      price: '₩1,550',
      moq: '3,000개',
    },
    {
      id: 'tf3',
      name: '하이드레이션 밸런스 앰플',
      keyIngredient: '히알루론산',
      volume: '30\u00A0mL',
      price: '₩1,550',
      moq: '3,000개',
    },
    {
      id: 'tf4',
      name: '인텐시브 베리어 앰플',
      keyIngredient: '세라마이드',
      volume: '30\u00A0mL',
      price: '₩1,550',
      moq: '3,000개',
    },
  ],
  highEfficacy: [
    {
      id: 'he1',
      name: '히알루론산 앰플',
      volume: '30\u00A0mL',
      price: '₩2,050',
      moq: '3,000개',
    },
    {
      id: 'he2',
      name: '시카 앰플',
      volume: '30\u00A0mL',
      price: '₩2,100',
      moq: '3,000개',
    },
    {
      id: 'he3',
      name: '세라마이드 앰플',
      volume: '30\u00A0mL',
      price: '₩2,250',
      moq: '3,000개',
    },
    {
      id: 'he4',
      name: '나이아신아마이드 앰플',
      volume: '30\u00A0mL',
      price: '₩1,550',
      moq: '3,000개',
    },
    {
      id: 'he5',
      name: '콜라겐 앰플',
      volume: '30\u00A0mL',
      price: '₩1,750',
      moq: '3,000개',
    },
    {
      id: 'he6',
      name: 'PDRN 앰플',
      volume: '15\u00A0mL',
      price: '₩2,100',
      moq: '3,000개',
    },
    {
      id: 'he7',
      name: '비타민C 앰플',
      volume: '15\u00A0mL',
      price: '₩2,100',
      moq: '3,000개',
    },
  ],
};

export const menuItems = [
  { id: 'products', label: '앰플 소개' },
  { id: 'custom-brand', label: '고객 브랜드 생산' },
  { id: 'price', label: '공급 가격' },
  { id: 'sample', label: '샘플 신청' },
  { id: 'inquiry', label: '앰플 주문 및 생산 문의' },
];

export const processBrand = [
  { step: '01', title: '제품 및 수량 선택', description: '11종의 앰플 중 원하는 제품과 주문 수량을 선택합니다.' },
  { step: '02', title: '주문 확정 및 계약금 결제', description: '주문 내용을 확인하고 계약금 50%를 결제합니다.' },
  { step: '03', title: '생산', description: '계약금 확인 후 바로 생산을 시작합니다.' },
  { step: '04', title: '출고', description: '생산 완료 후 잔금 50% 결제 확인 후 출고합니다.' },
];

export const processCustom = [
  { step: '01', title: '제품 선택', description: '11종의 앰플 중 원하는 제품을 선택합니다.' },
  { step: '02', title: '디자인 및 사양 선택', description: '5가지 디자인 템플릿 중 원하는 디자인을 선택하고 용기, 스포이드, 인쇄 방식 등 제품 사양을 선택합니다.' },
  { step: '03', title: '디자인 시안 확인 및 최종 확정', description: '브랜드 로고와 원하는 색상을 전달해 주시면 디자인 시안을 제작합니다. 디자인과 제품의 최종 사양을 확인하고 확정합니다.' },
  { step: '04', title: '주문 확정 및 계약금 결제', description: '디자인과 제품 사양이 모두 확정된 후 계약금 50%를 결제합니다.' },
  { step: '05', title: '생산', description: '계약금 확인 후 바로 생산을 시작합니다.' },
  { step: '06', title: '출고', description: '생산 완료 후 잔금 50% 결제 확인 후 출고합니다.' },
];
