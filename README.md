# AMPOULE PICK (앰플픽) - 앰플 규격화 생산 플랫폼

준비된 처방과 디자인으로 빠르고 합리적인 가격의 앰플 제작 플랫폼 웹사이트입니다.

## 🚀 기술 스택
- **Framework**: React 19, TypeScript
- **Bundler & Tooling**: Vite 6+
- **Styling**: Tailwind CSS v4, Motion (Framer Motion), Lucide React
- **Hosting / Deployment**: Vercel, GitHub Pages / Any Static Web Host

---

## 🛠 로컬 개발 환경 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 3000)
npm run dev

# 프로덕션 빌드 테스트
npm run build

# 빌드 결과물 미리보기
npm run preview
```

---

## 📦 GitHub 저장소 생성 및 코드 업로드

```bash
# 1. git 저장소 초기화
git init

# 2. 모든 변경사항 스테이징 및 첫 커밋
git add .
git commit -m "feat: initial commit for AMPOULE PICK"

# 3. 기본 브랜치를 main으로 지정
git branch -M main

# 4. 본인의 GitHub 리포지토리 원격 주소 추가
git remote add origin https://github.com/[내-GitHub-계정]/[리포지토리명].git

# 5. 원격 저장소로 푸시
git push -u origin main
```

---

## 🌐 Vercel 원클릭 배포 가이드

본 프로젝트는 **Vercel Zero-Config**를 지원하도록 `vercel.json` 및 `package.json` 설정이 완료되어 있습니다.

1. **[Vercel](https://vercel.com/)** 에 접속 후 GitHub 계정으로 로그인합니다.
2. 대시보드에서 **[Add New...]** → **[Project]**를 클릭합니다.
3. 방금 푸시한 GitHub 리포지토리를 찾아 **[Import]**를 클릭합니다.
4. **Build & Output Settings** (자동 감지됨):
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**:
   - 정적 SPA 구성이므로 **필수 입력 환경변수가 없습니다.** (추가 설정 없이 바로 배포 가능)
6. **[Deploy]** 버튼을 클릭하면 약 1분 이내에 고유 URL(`https://*.vercel.app`)로 즉시 라이브 배포됩니다!
