# Say It Gil Hotel (사잇길 호텔) 🏨

## 프로젝트 소개
부산 남구에 위치한 로컬 분산형 호텔 'Say It Gil Hotel'의 공식 웹사이트입니다. 
마을 전체가 하나의 호텔이 되는 특별한 경험을 제공하며, 지역 경제 활성화에 기여하는 혁신적인 숙박 플랫폼입니다.

## 주요 기능 ✨

### 1. 다국어 지원 🌍
- 한국어, 영어, 일본어, 대만어(번체중국어) 지원
- 실시간 언어 전환 기능
- 브라우저 언어 자동 감지

### 2. 예약 시스템 📅
- Firebase Firestore 기반 실시간 예약 관리
- Flatpickr를 활용한 직관적인 날짜 선택
- 예약 가능 날짜 자동 업데이트
- 이메일 기반 예약 조회 기능

### 3. 관리자 패널 🔐
- Firebase Authentication 기반 로그인
- 예약 통계 대시보드
- 예약 수정/삭제 기능
- 실시간 검색 및 필터링

### 4. 반응형 디자인 📱
- 데스크톱, 태블릿, 모바일 최적화
- 터치 친화적인 UI/UX
- 모바일 햄버거 메뉴
- 하단 고정 언어 전환 버튼 (모바일)

### 5. 체험 프로그램 🍶
- 막걸리 & 동래파전 원데이 클래스
- Airbnb 예약 연동
- 상세 프로그램 소개

## 기술 스택 🛠️

### Frontend
- **HTML5** - 시맨틱 마크업
- **CSS3** - Flexbox, Grid, 반응형 디자인
- **Vanilla JavaScript** - ES6+ 모듈, Async/Await

### Backend & Database
- **Firebase Firestore** - NoSQL 실시간 데이터베이스
- **Firebase Authentication** - 관리자 인증
- **Firebase Hosting** - 정적 사이트 호스팅

### 라이브러리
- **Flatpickr** - 날짜 선택 라이브러리
- **Font Awesome 6** - 아이콘 라이브러리
- **Google Fonts (Noto Sans KR)** - 한글 웹폰트

## 프로젝트 구조 📂

```
namcheonStay/
├── index.html              # 메인 페이지
├── reservation.html        # 예약 페이지
├── admin.html             # 관리자 페이지
├── README.md              # 프로젝트 문서
├── assets/
│   ├── css/
│   │   └── style.css      # 통합 스타일시트
│   ├── js/
│   │   ├── i18n.js        # 다국어 처리
│   │   └── script.js      # 공통 스크립트
│   ├── lang/
│   │   ├── ko.json        # 한국어 번역
│   │   ├── en.json        # 영어 번역
│   │   ├── jp.json        # 일본어 번역
│   │   └── tw.json        # 번체중국어 번역
│   └── images/            # 이미지 리소스
│       ├── rooms/         # 객실 이미지
│       └── ...
```

## 시작하기 🚀

### 로컬 개발 환경

1. **프로젝트 클론**
```bash
git clone <repository-url>
cd namcheonStay
```

2. **로컬 서버 실행** (선택사항)
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server -p 8000
```

3. **브라우저에서 열기**
```
http://localhost:8000
```

### Firebase 설정

Firebase 설정이 이미 포함되어 있습니다:
- Project ID: `sayitgil-reservation`
- Region: Asia Northeast

### 배포

Firebase Hosting을 사용하여 배포:
```bash
firebase init
firebase deploy
```

## Firestore 보안 규칙 🔒

**2달 소규모 프로젝트용 권장 설정:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return isSignedIn() 
        && (request.auth.token.email == 'admin@example.com');
      // ↑ 관리자 이메일로 변경하세요
    }

    function isDate(s) {
      return s is string && s.size() == 10 
        && s.matches('^\\d{4}-\\d{2}-\\d{2}$');
    }

    function validReservationCreate() {
      return (request.resource.data.email is string
          && request.resource.data.email.size() > 3)
        && (request.resource.data.roomTitle is string)
        && isDate(request.resource.data.checkin)
        && isDate(request.resource.data.checkout)
        && (request.resource.data.checkout > request.resource.data.checkin)
        && (request.resource.data.guests is int
          && request.resource.data.guests > 0);
    }

    match /reservations/{id} {
      allow create: if validReservationCreate();
      allow read: if true;
      allow update, delete: if isAdmin();
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 주요 페이지 설명 📄

### index.html (메인 페이지)
- 히어로 섹션
- 가치 소개 (컨셉)
- 마을 이야기
- 이용 가이드
- 체험 프로그램
- 객실 소개
- CTA (Call to Action)

### reservation.html (예약 페이지)
- 객실 정보 표시
- 예약 폼
- 날짜 선택 (Flatpickr)
- 내 예약 조회

### admin.html (관리자 페이지)
- 로그인 (Firebase Auth)
- 예약 통계
- 예약 목록 테이블
- 검색 및 필터링
- 예약 수정/삭제

## 브라우저 지원 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

## 배포 전 체크리스트 ✅

- [x] 다국어 시스템 작동 확인
- [x] 모바일 반응형 디자인 확인
- [x] 예약 시스템 테스트
- [x] 관리자 페이지 권한 확인
- [x] Firestore 보안 규칙 적용
- [x] 이미지 최적화
- [x] 브라우저 호환성 테스트
- [x] SEO 메타 태그 확인

## 운영 가이드 📋

### 관리자 계정 생성
1. Firebase Console > Authentication 접속
2. 사용자 추가
3. Firestore 규칙에서 해당 이메일 추가

### 예약 관리
1. `admin.html` 접속
2. 관리자 계정으로 로그인
3. 예약 조회/수정/삭제

### 언어 파일 수정
`assets/lang/` 폴더의 JSON 파일 수정:
- `ko.json` - 한국어
- `en.json` - 영어
- `jp.json` - 일본어
- `tw.json` - 번체중국어

## 라이선스 📝
Copyright © 2025 Say It Gil Hotel. All Rights Reserved.

## 문의 및 지원 💬
프로젝트 관련 문의사항은 이슈를 등록해주세요.

---

**운영 기간**: 약 2개월 (소규모 프로젝트)
**버전**: 1.0.0
**최종 업데이트**: 2025년 1월
