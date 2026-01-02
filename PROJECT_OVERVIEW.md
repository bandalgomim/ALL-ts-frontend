# ALL'ts - 프로젝트 개요

> 📅 **마지막 업데이트**: 2026년 1월 2일  
> 🏗️ **프로젝트 타입**: React Native 모바일 앱 (iOS/Android)

---

## 📋 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [기술 스택](#기술-스택)
3. [프로젝트 구조](#프로젝트-구조)
4. [핵심 기능](#핵심-기능)
5. [아키텍처](#아키텍처)
6. [화면 구성](#화면-구성)
7. [API 및 상태 관리](#api-및-상태-관리)
8. [인증 시스템](#인증-시스템)
9. [푸시 알림](#푸시-알림)
10. [개발 가이드](#개발-가이드)
11. [환경 설정](#환경-설정)

---

## 🎯 프로젝트 소개

**ALL'ts**는 "All Sports Scheduler"라는 슬로건을 가진 스포츠 경기 일정 관리 모바일 앱입니다.

### 주요 목적
- 다양한 스포츠 리그의 경기 일정 확인
- 관심 팀/리그 구독 및 알림
- 경기 결과 및 상세 정보 조회
- 개인화된 스포츠 캘린더 관리

---

## 🛠️ 기술 스택

### Frontend Framework
| 기술 | 버전 | 용도 |
|------|------|------|
| React | 19.0.0 | UI 프레임워크 |
| React Native | 0.78.2 | 크로스플랫폼 모바일 개발 |
| TypeScript | 5.0.4 | 타입 안정성 |

### 네비게이션
| 기술 | 버전 | 용도 |
|------|------|------|
| @react-navigation/native | 7.1.4 | 앱 네비게이션 |
| @react-navigation/stack | 7.2.8 | 스택 네비게이션 |

### 상태 관리 & 저장소
| 기술 | 버전 | 용도 |
|------|------|------|
| React Context API | - | 전역 상태 관리 |
| react-native-mmkv | 3.1.0 | 고성능 로컬 저장소 |
| @react-native-async-storage/async-storage | 2.1.2 | 비동기 저장소 |
| react-native-encrypted-storage | 4.0.3 | 암호화 저장소 |

### 인증
| 기술 | 버전 | 용도 |
|------|------|------|
| @react-native-google-signin/google-signin | 16.0.0 | Google 로그인 |
| @invertase/react-native-apple-authentication | 2.4.1 | Apple 로그인 |
| @react-native-seoul/kakao-login | 5.4.1 | 카카오 로그인 |

### Firebase & 알림
| 기술 | 버전 | 용도 |
|------|------|------|
| @react-native-firebase/app | 22.1.0 | Firebase 기본 |
| @react-native-firebase/messaging | 22.1.0 | FCM 푸시 알림 |
| @notifee/react-native | 9.1.8 | 로컬 알림 |

### UI/UX
| 기술 | 버전 | 용도 |
|------|------|------|
| react-native-paper | 5.13.1 | Material Design 컴포넌트 |
| react-native-vector-icons | 10.2.0 | 아이콘 |
| react-native-reanimated | 3.17.2 | 애니메이션 |
| react-native-gesture-handler | 2.25.0 | 제스처 처리 |
| moti | 0.30.0 | 애니메이션 라이브러리 |

### 미디어 & 이미지
| 기술 | 버전 | 용도 |
|------|------|------|
| react-native-fast-image | 8.6.3 | 이미지 캐싱 |
| react-native-image-crop-picker | 0.50.1 | 이미지 선택/자르기 |
| react-native-video | 6.17.0 | 비디오 재생 |

### 광고
| 기술 | 버전 | 용도 |
|------|------|------|
| react-native-google-mobile-ads | 15.7.0 | AdMob 광고 |

### 네트워킹
| 기술 | 버전 | 용도 |
|------|------|------|
| axios | 1.8.4 | HTTP 클라이언트 |

### 개발 도구
| 기술 | 버전 | 용도 |
|------|------|------|
| Jest | 29.6.3 | 테스팅 |
| ESLint | 8.19.0 | 코드 린팅 |
| Prettier | 2.8.8 | 코드 포맷팅 |
| babel-plugin-module-resolver | 5.0.2 | 경로 별칭 |

---

## 📁 프로젝트 구조

```
ALL-ts-frontend/
├── 📄 App.tsx                    # 앱 진입점
├── 📄 index.js                   # 앱 등록
├── 📄 package.json               # 의존성 관리
├── 📄 tsconfig.json              # TypeScript 설정
├── 📄 babel.config.js            # Babel 설정
├── 📄 metro.config.js            # Metro 번들러 설정
├── 📄 jest.config.js             # Jest 테스트 설정
│
├── 📁 src/                       # 소스 코드
│   ├── 📄 global.ts              # 전역 설정 (색상, 크기, API 도메인)
│   │
│   ├── 📁 screen/                # 화면 컴포넌트
│   │   ├── start.tsx             # 시작 화면
│   │   ├── main.tsx              # 메인 화면
│   │   ├── team.tsx              # 팀 상세 화면
│   │   ├── league.tsx            # 리그 상세 화면
│   │   ├── match.tsx             # 경기 상세 화면
│   │   ├── IAM.tsx               # 인증 화면
│   │   ├── user.tsx              # 사용자 화면
│   │   └── onboarding.tsx        # 온보딩 화면
│   │
│   ├── 📁 components/            # 재사용 컴포넌트
│   │   ├── 📁 main/              # 메인 화면 컴포넌트
│   │   ├── 📁 match/             # 경기 관련 컴포넌트
│   │   ├── 📁 calendar/          # 캘린더 컴포넌트
│   │   ├── 📁 league/            # 리그 컴포넌트
│   │   ├── 📁 searchBar/         # 검색 컴포넌트
│   │   ├── 📁 ad/                # 광고 컴포넌트
│   │   ├── 📁 IAM/               # 인증 컴포넌트
│   │   ├── 📁 logo/              # 로고 컴포넌트
│   │   ├── 📁 onboarding/        # 온보딩 컴포넌트
│   │   ├── customHeader.tsx      # 커스텀 헤더
│   │   ├── loadingPage.tsx       # 로딩 화면
│   │   ├── notch.tsx             # 노치 처리
│   │   └── refresh.tsx           # 새로고침 컴포넌트
│   │
│   ├── 📁 navigation/            # 네비게이션
│   │   └── stackNavigater.tsx    # 스택 네비게이터
│   │
│   ├── 📁 context/               # React Context (상태 관리)
│   │   ├── api.context.jsx       # API 프로바이더 (통합)
│   │   ├── main.context.jsx      # 메인 상태
│   │   ├── team.context.jsx      # 팀 상태
│   │   ├── league.context.jsx    # 리그 상태
│   │   ├── match.context.jsx     # 경기 상태
│   │   ├── searchTag.context.jsx # 검색 태그 상태
│   │   └── 📁 modal/             # 모달 상태
│   │
│   ├── 📁 hooks/                 # 커스텀 훅
│   │   ├── common.hook.ts        # 공통 API 훅
│   │   ├── main.hook.ts          # 메인 데이터 훅
│   │   ├── team.hook.ts          # 팀 데이터 훅
│   │   ├── league.hook.ts        # 리그 데이터 훅
│   │   ├── match.hook.ts         # 경기 데이터 훅
│   │   ├── daily.hook.tsx        # 일일 작업 훅
│   │   ├── refetch.hook.tsx      # 데이터 새로고침 훅
│   │   ├── IAM.hook.ts           # 인증 훅
│   │   └── icon.hook.ts          # 아이콘 훅
│   │
│   ├── 📁 model/                 # 타입 정의 (DTO)
│   │   ├── config.ts             # 공통 타입
│   │   ├── main.dto.ts           # 메인 DTO
│   │   ├── team.dto.ts           # 팀 DTO
│   │   ├── league.dto.ts         # 리그 DTO
│   │   ├── match.dto.ts          # 경기 DTO
│   │   ├── navigation.dto.ts     # 네비게이션 DTO
│   │   └── IAM.dto.ts            # 인증 DTO
│   │
│   ├── 📁 reducers/              # 리듀서
│   │   ├── apiReducer.ts         # API 상태 리듀서
│   │   ├── contextReducer.ts     # 컨텍스트 리듀서
│   │   └── modalReducer.ts       # 모달 리듀서
│   │
│   ├── 📁 notification/          # 알림 시스템
│   │   ├── initializeNotifications.ts   # 알림 초기화
│   │   ├── displayNotification.ts       # 알림 표시
│   │   └── scheduleTodayMatches.ts      # 경기 알림 예약
│   │
│   ├── 📁 IAM/                   # 인증 관련
│   │   └── localData.ts          # 로컬 데이터 관리
│   │
│   ├── 📁 utils/                 # 유틸리티
│   │   ├── localData.ts          # 로컬 데이터 유틸
│   │   ├── deviceVersion.ts      # 디바이스 버전
│   │   └── wdr.jsx               # Why Did You Render
│   │
│   └── 📁 assets/                # 정적 자원
│       ├── 📁 fonts/             # 폰트 파일
│       ├── 📁 auth/              # 인증 관련 이미지
│       ├── 📁 teamLogo/          # 팀 로고
│       ├── 📁 league/            # 리그 이미지
│       ├── 📁 calendar/          # 캘린더 이미지
│       └── 📁 ad/                # 광고 이미지
│
├── 📁 android/                   # Android 네이티브 코드
│   ├── app/
│   │   ├── build.gradle
│   │   ├── google-services.json  # Firebase 설정
│   │   └── src/
│   └── build.gradle
│
├── 📁 ios/                       # iOS 네이티브 코드
│   ├── Allts/
│   │   ├── AppDelegate.swift     # 앱 델리게이트
│   │   ├── Info.plist            # 앱 설정
│   │   └── GoogleService-Info.plist
│   ├── Podfile                   # CocoaPods 의존성
│   └── Pods/                     # 설치된 Pod들
│
├── 📁 @types/                    # 타입 정의 파일
│   └── react-native-apple-authentication.d.ts
│
└── 📁 __tests__/                 # 테스트 파일
    └── App.test.tsx
```

---

## ⭐ 핵심 기능

### 1. 경기 일정 관리
- 📅 캘린더 기반 경기 일정 조회
- 🔔 경기 시작 전 푸시 알림
- ⭐ 관심 경기 선택/해제

### 2. 팀/리그 구독
- 🏟️ 관심 팀 등록 및 관리
- 🏆 관심 리그 등록 및 관리
- 🔄 드래그 앤 드롭으로 순서 변경

### 3. 경기 상세 정보
- 📊 경기 스코어 및 상태
- 📺 시청 가능 플랫폼 정보
- 📈 경기 통계

### 4. 사용자 인증
- 🍎 Apple 로그인
- 🔵 Google 로그인
- 🟡 카카오 로그인

---

## 🏛️ 아키텍처

### 상태 관리 패턴

```
┌─────────────────────────────────────────────────────┐
│                    App.tsx                          │
│                       │                             │
│                 ApiProvider                         │
│     ┌────────────────┼────────────────┐            │
│     │                │                │            │
│ MainProvider    TeamProvider    LeagueProvider     │
│     │                │                │            │
│     └────────────────┼────────────────┘            │
│                      │                             │
│              StackNavigator                        │
│                      │                             │
│    ┌─────────┬───────┼───────┬─────────┐          │
│    │         │       │       │         │          │
│  Main     Team    League   Match     IAM          │
│  Screen   Screen  Screen   Screen   Screen        │
└─────────────────────────────────────────────────────┘
```

### 데이터 흐름

```
API 요청 흐름:
Screen → Hook → API Call → Context(Reducer) → Screen 업데이트

1. Screen에서 Hook 호출
2. Hook에서 API 요청 (axios)
3. 응답을 Context의 dispatch로 전달
4. Reducer가 상태 업데이트
5. Context 구독 컴포넌트 리렌더링
```

### 상태 타입 구조

```typescript
interface PostState<T> {
    data: T;
    loading: boolean;
    error: string | null;
}

type PostAction<P> =
    | { type: 'LOADING' }
    | { type: 'SUCCESS'; payload: P; items: string[] | null}
    | { type: 'ERROR'; payload: string };
```

---

## 📱 화면 구성

### 네비게이션 스택

| 화면 이름 | 컴포넌트 | 딥링크 | 설명 |
|----------|---------|--------|------|
| StartScreen | `start.tsx` | - | 앱 시작 화면 |
| MainScreen | `main.tsx` | `myapp://` | 메인 캘린더 화면 |
| TeamScreen | `team.tsx` | `myapp://team/:id` | 팀 상세 화면 |
| LeagueScreen | `league.tsx` | `myapp://league/:id` | 리그 상세 화면 |
| MatchScreen | `match.tsx` | `myapp://match/:matchId` | 경기 상세 화면 |
| IAMScreen | `IAM.tsx` | `myapp://iam` | 인증 화면 |
| UserScreen | `user.tsx` | - | 사용자 설정 화면 |
| OnboardingScreen | `onboarding.tsx` | - | 온보딩 화면 |

### 딥링크 예시
```
myapp://team/123        → 팀 ID 123 상세 페이지
myapp://league/456      → 리그 ID 456 상세 페이지
myapp://match/789       → 경기 ID 789 상세 페이지
myapp://iam             → 인증 화면
```

---

## 🔄 API 및 상태 관리

### API 엔드포인트

**Base URL**: `https://all-ts-backend-production.up.railway.app/`

| 엔드포인트 | 메서드 | 설명 |
|-----------|--------|------|
| `/main` | GET | 메인 데이터 조회 |
| `/main` | PATCH | 팀/리그 순서 수정 |
| `/team/:id` | GET | 팀 상세 조회 |
| `/league/:id` | GET | 리그 상세 조회 |
| `/match/:id` | GET | 경기 상세 조회 |

### Context 구조

```jsx
// api.context.jsx - 중첩 Provider 구조
<LogoModalProvider>
  <ModalProvider>
    <ModalNextMatchProvider>
      <SearchProvider>
        <MainProvider>
          <TeamProvider>
            <LeagueProvider>
              <MatchProvider>
                <SearchTagProvider>
                  {children}
                </SearchTagProvider>
              </MatchProvider>
            </LeagueProvider>
          </TeamProvider>
        </MainProvider>
      </SearchProvider>
    </ModalNextMatchProvider>
  </ModalProvider>
</LogoModalProvider>
```

### 주요 DTO

```typescript
// 경기 정보
interface matchDto {
    matchId: string,
    matchDate: string,
    matchTime: string,
    homeTeamId: number,
    awayTeamId: number,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: number,
    awayTeamScore: number,
    matchState: string,
    isMatchSelected: boolean
}

// 팀 정보
interface teamDto {
    teamId: number,
    teamName: string,
    teamInit: string,
    teamLogo: string,
    index: number
}

// 리그 정보
interface leagueDto {
    leagueId: number,
    leagueName: string,
    leagueInit: string,
    leagueLogo: string,
    index: number
}
```

---

## 🔐 인증 시스템

### 지원 인증 방식

| 인증 방식 | 패키지 | 플랫폼 |
|----------|--------|--------|
| Apple Sign In | `@invertase/react-native-apple-authentication` | iOS |
| Google Sign In | `@react-native-google-signin/google-signin` | iOS, Android |
| Kakao Login | `@react-native-seoul/kakao-login` | iOS, Android |

### 관련 파일
- `src/IAM/localData.ts` - 인증 데이터 로컬 저장
- `src/hooks/IAM.hook.ts` - 인증 로직 훅
- `src/screen/IAM.tsx` - 인증 화면
- `src/components/IAM/` - 인증 UI 컴포넌트

---

## 🔔 푸시 알림

### 알림 시스템 구조

```
Firebase Cloud Messaging (FCM)
        │
        ▼
initializeNotifications.ts  ← 알림 권한 요청 및 초기화
        │
        ▼
displayNotification.ts      ← 알림 표시 (notifee 사용)
        │
        ▼
scheduleTodayMatches.ts     ← 경기 시작 전 알림 예약
```

### 알림 관련 파일

| 파일 | 역할 |
|------|------|
| `initializeNotifications.ts` | FCM 초기화, 권한 요청 |
| `displayNotification.ts` | 로컬 알림 표시 |
| `scheduleTodayMatches.ts` | 경기 알림 스케줄링 |

---

## 🚀 개발 가이드

### 스크립트 명령어

```bash
# 의존성 설치
yarn install

# iOS Pod 설치
yarn pod

# 개발 서버 시작
yarn start

# iOS 앱 실행
yarn ios

# Android 앱 실행
yarn android

# 린트 검사
yarn lint

# 테스트 실행
yarn test
```

### 경로 별칭 (Path Aliases)

`tsconfig.json`에 정의된 경로 별칭:

| 별칭 | 실제 경로 |
|------|----------|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@screen/*` | `src/screen/*` |
| `@hooks/*` | `src/hooks/*` |
| `@model/*` | `src/model/*` |
| `@context/*` | `src/context/*` |
| `@utils/*` | `src/utils/*` |
| `@assets/*` | `src/assets/*` |
| `@navigation/*` | `src/navigation/*` |
| `@notification/*` | `src/notification/*` |
| `@reducers/*` | `src/reducers/*` |
| `@IAM/*` | `src/IAM/*` |

### 코드 스타일 가이드

1. **컴포넌트**: React.memo() 사용으로 불필요한 리렌더링 방지
2. **상태 관리**: Context + useReducer 패턴 사용
3. **API 호출**: 커스텀 훅으로 분리
4. **타입 정의**: `model/*.dto.ts` 파일에 중앙 관리

---

## ⚙️ 환경 설정

### 전역 설정 (global.ts)

```typescript
export const colors = {
    primary: '#30397A',      // 메인 색상 (남색)
    secondory: '#CECECE',    // 보조 색상
    text: '#000000',         // 텍스트 색상
    background: '#30397A',   // 배경 색상
    placeholder: '#919191',  // 플레이스홀더 색상
    border: '#d9d9d9',       // 테두리 색상
    icon: '#222222',         // 아이콘 색상
};

export const domain = 'https://all-ts-backend-production.up.railway.app/';
```

### 필수 환경 파일

| 파일 | 위치 | 용도 |
|------|------|------|
| `google-services.json` | `android/app/` | Android Firebase 설정 |
| `GoogleService-Info.plist` | `ios/Allts/` | iOS Firebase 설정 |
| `*.plist` (Google Client) | 루트 | Google 로그인 설정 |
| `client_secret_*.json` | 루트 | Google OAuth 시크릿 |

### 요구 사항

- **Node.js**: >= 18
- **Package Manager**: Yarn 1.22.22+
- **Xcode**: iOS 개발용
- **Android Studio**: Android 개발용
- **CocoaPods**: iOS 의존성 관리

---

## 📊 프로젝트 통계

| 항목 | 값 |
|------|-----|
| 화면 수 | 8 |
| 컴포넌트 폴더 | 12+ |
| 커스텀 훅 | 11 |
| Context | 10+ |
| DTO 파일 | 10 |

---

## 🔗 관련 링크

- **백엔드 API**: https://all-ts-backend-production.up.railway.app/
- **딥링크 스킴**: `myapp://`

---

> 이 문서는 프로젝트 개발 및 유지보수를 위한 참조 문서입니다.  
> 프로젝트 구조나 설정이 변경될 경우 이 문서도 함께 업데이트해 주세요.
