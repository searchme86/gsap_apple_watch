# 🎯 Apple Watch 스타일 애니메이션 시스템

> 실제 Apple Watch처럼 작동하는 인터랙티브 웹 애니메이션 시스템

## 애니메이션 미리보기(PC)

[![포트폴리오 데스크탑 버전 미리보기](https://img.youtube.com/vi/RQp1dWnC4XU/0.jpg)](https://youtu.be/RQp1dWnC4XU)

## 애니메이션 미리보기(MO)

[![포트폴리오 모바일 버전 미리보기](https://img.youtube.com/vi/uGb0_YZXFFs/0.jpg)](https://www.youtube.com/watch?v=uGb0_YZXFFs)

## 📖 목차

- [🌟 프로젝트 소개](#-프로젝트-소개)
- [✨ 주요 기능](#-주요-기능)
- [🏗️ 시스템 구조](#️-시스템-구조)
- [🔄 애니메이션 작동 원리](#-애니메이션-작동-원리)
- [📂 파일 구조](#-파일-구조)
- [📋 코드 예시](#-코드-예시)
- [📋 HTML 마크업 구조 분석](#-html-마크업-구조-분석)

---

## 🌟 프로젝트 소개

이 프로젝트는 **실제 Apple Watch와 똑같이 생긴 3D 애니메이션**을 웹에서 구현한 시스템입니다.

### 🎭 어떻게 작동하나요?

마치 실제 Apple Watch를 웹페이지에서 보는 것처럼:

- 스크롤을 내리면 워치가 점점 커지면서 나타납니다
- 실시간으로 현재 시간과 날짜가 표시됩니다
- 디지털 크라운, 사이드 버튼, 스포츠 밴드까지 세밀하게 재현됩니다
- 핸드폰, 태블릿, 컴퓨터에서 각각 다른 최적화된 모습으로 보입니다

### 🎪 마법 같은 효과들

- **동적 검은색 효과**: 워치 케이스가 살아있는 것처럼 색깔이 변하고 반짝입니다
- **디바이스별 맞춤형**: 화면 크기에 따라 완전히 다른 레이아웃으로 변신합니다
- **부드러운 애니메이션**: 마치 실제 물건을 만지는 것 같은 자연스러운 움직임입니다

---

## ✨ 주요 기능

### 🎨 시각적 특징

- **실제 Apple Watch 모델링**

  - 정확한 22%/18% 둥근 사각형 케이스
  - 디지털 크라운과 사이드 버튼 위치
  - 스포츠 밴드와 밴드 커넥터 디테일

- **동적 검은색 시스템**

  - 맥박처럼 뛰는 Pulse 효과 (4초 주기)
  - 금속 표면같은 Shimmer 효과 (3초 주기)
  - 두 효과가 합쳐진 하이브리드 모드

- **실시간 시계 기능**
  - 현재 시간 표시 (HH:MM 형식)
  - 한글 요일과 날짜 표시
  - 콜론(:) 깜빡임 효과 (1초마다)

---

## 🏗️ 시스템 구조

이 애니메이션 시스템은 마치 **레고 블록**을 조립하는 것처럼 여러 부품이 모여서 작동합니다.

### 🧩 주요 구성 요소

1. **설정 관리자 (config.js)**

   - 모든 숫자와 설정값들을 보관하는 창고
   - 애니메이션 속도, 크기, 색깔 등의 기준값 저장

2. **도구 상자 (utils.js)**

   - 자주 사용하는 계산과 작업들을 모아둔 곳
   - 예: 화면 크기 확인, 색깔 변경, 요소 이동 등

3. **애니메이션 제작소 (animations.js)**

   - 각종 움직임 효과를 만드는 공장
   - 페이드인, 스케일, 회전, 이동 등의 애니메이션 생성

4. **화면 업데이트 담당자 (dom-handlers.js)**

   - 실제 웹페이지에 변화를 적용하는 일꾼
   - 색깔 바꾸기, 위치 옮기기, 크기 조절하기 등

5. **총 관리자들 (managers.js)**

   - 각 부서의 책임자들이 모인 곳
   - 애니메이션 관리자, 키보드 관리자, 화면 크기 관리자 등

6. **시작 버튼 (main.js)**
   - 모든 시스템을 켜고 연결하는 중앙 컨트롤러
   - 웹페이지가 로드되면 모든 것을 초기화

### 🔄 작동 순서

```
1. 웹페이지 로드 → main.js 실행
2. 각 관리자들 생성 및 초기화
3. 스크롤 감지 시스템 가동
4. 사용자가 스크롤할 때마다:
   - 현재 스크롤 위치 계산
   - 디바이스 타입 확인
   - 해당하는 애니메이션 상태 생성
   - 화면에 변화 적용
5. 실시간 시계 업데이트 (1초마다)
```

---

## 🔄 애니메이션 작동 원리

### 🎬 스크롤 기반 애니메이션 시스템

마치 **영화 필름**을 보는 것처럼, 스크롤 위치에 따라 다른 장면이 나타납니다.

#### 📊 진행률 기반 시스템

스크롤을 0%~100%로 나누어 각 구간마다 다른 효과가 나타납니다:

- **0~20%**: 워치가 아주 크게 시작해서 점점 작아짐
- **20~45%**: 날짜와 시간 표시가 서서히 나타남
- **70~100%**: 워치가 왼쪽으로 이동하고 텍스트가 오른쪽에 등장
- **85~100%**: "Device. Specific. UpperDate." 텍스트가 페이드인

#### 🎨 동적 검은색 시스템

워치 케이스가 **살아있는 것처럼** 보이게 하는 특별한 기술:

1. **Pulse 효과** (맥박 효과)

   - 4초마다 한 번씩 색이 변함
   - 검은색 → 미드나잇 → 스페이스 그레이 → 다시 검은색

2. **Shimmer 효과** (반짝임 효과)

   - 3초마다 좌에서 우로 빛이 지나감
   - 마치 금속 표면에 빛이 반사되는 것처럼

3. **하이브리드 모드**
   - 두 효과가 동시에 작동
   - 가장 고급스러운 효과

### ⏰ 실시간 시계 시스템

```javascript
// 1초마다 실행되는 함수
setInterval(() => {
  // 현재 시간 가져오기
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  // 화면에 표시
  updateDomElementTextContent('hours', hours);
  updateDomElementTextContent('minutes', minutes);

  // 콜론 깜빡임 효과
  toggleColonBlinkAnimation();
}, 1000);
```

---

## 📂 파일 구조

```
src/
├── scripts/                    # 📜 자바스크립트 모듈들
│   ├── config.js              # ⚙️ 모든 설정값과 상수
│   ├── utils.js               # 🔧 공통 유틸리티 함수들
│   ├── animations.js          # 🎭 애니메이션 상태 생성기
│   ├── dom-handlers.js        # 🖼️ DOM 업데이트 핸들러
│   ├── managers.js            # 👔 시스템 관리자들
│   └── main.js                # 🚀 메인 초기화 시스템
├── styles/                    # 🎨 스타일시트
│   └── guide-button-component.css
├── components/                # 🧩 HTML 컴포넌트
│   └── guide-button.html
├── animation_appleWatch.html  # 🏠 메인 HTML 파일
└── guide_animation_watch.html # 📖 가이드 페이지
```

### 📋 각 파일의 역할

| 파일              | 역할            | 주요 내용                                                 |
| ----------------- | --------------- | --------------------------------------------------------- |
| `config.js`       | 설정 관리       | 애니메이션 속도, 크기, 색상, 반응형 기준점 등 모든 설정값 |
| `utils.js`        | 도구 모음       | 수학 계산, DOM 조작, 디바이스 감지 등 공통 함수들         |
| `animations.js`   | 애니메이션 엔진 | 각종 애니메이션 효과의 상태를 생성하는 함수들             |
| `dom-handlers.js` | 화면 업데이트   | 계산된 애니메이션을 실제 HTML 요소에 적용                 |
| `managers.js`     | 시스템 관리     | 전체 애니메이션 시스템을 조율하는 관리자들                |
| `main.js`         | 시작점          | 모든 시스템을 초기화하고 연결하는 진입점                  |

---

## 📋 코드 예시

### 🎪 애니메이션 상태 생성 예시

```javascript
// 모바일 디바이스에서 Apple Watch 케이스의 페이드인 효과
export const createMobileAppleWatchCaseFadeInAnimationState = (
  scrollProgress,
  deviceType
) => {
  // 모바일이 아니면 항상 보이게
  if (deviceType !== 'mobile' && deviceType !== 'small-mobile') {
    return { opacity: 1 };
  }

  // 20% 지점까지 서서히 나타남
  const fadeCompleteThreshold = 0.2;

  if (scrollProgress <= fadeCompleteThreshold) {
    const fadeProgress = scrollProgress / fadeCompleteThreshold;
    return { opacity: fadeProgress };
  }

  return { opacity: 1 };
};
```

### 🖼️ DOM 업데이트 예시

```javascript
// 계산된 애니메이션 상태를 실제 HTML 요소에 적용
export const applyAppleWatchAnimationStateToDomElement = (
  appleWatchElement,
  animationState
) => {
  if (!appleWatchElement || !animationState) return false;

  const gsapProperties = {};

  // 크기 변화 적용
  if (animationState.scale !== undefined) {
    gsapProperties.scale = animationState.scale;
  }

  // 위치 이동 적용
  if (animationState.translateX !== undefined) {
    gsapProperties.x = animationState.translateX;
  }

  // GSAP을 사용하여 부드럽게 적용
  gsap.set(appleWatchElement, gsapProperties);
  return true;
};
```

### ⏰ 실시간 시계 업데이트

```javascript
// 1초마다 현재 시간을 업데이트하는 시스템
const startRealtimeClockSystem = () => {
  const updateCurrentTimeDisplay = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[now.getDay()];

    // HTML 요소에 시간 표시
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('currentDateNumber').textContent = day;
    document.getElementById('currentDateName').textContent = dayName;
  };

  // 1초마다 실행
  setInterval(updateCurrentTimeDisplay, 1000);
};
```

### 📱 반응형 디바이스 감지

```javascript
// 화면 크기에 따라 디바이스 타입 결정
export const detectCurrentDeviceTypeBasedOnWindowWidth = (
  windowWidthPixels = window.innerWidth
) => {
  if (windowWidthPixels <= 375) {
    return 'small-mobile'; // 작은 모바일
  }
  if (windowWidthPixels <= 768) {
    return 'mobile'; // 일반 모바일
  }
  return 'desktop'; // 데스크탑/태블릿
};
```

---

## 📋 HTML 마크업 구조 분석

### 🏗️ 전체 구조 개요

이 애니메이션 시스템의 HTML은 **계층적 구조**로 설계되어 있으며, 각 요소가 **명확한 역할과 책임**을 가지고 있습니다.

```html
<div class="container">
  <!-- 🚀 시작 화면 -->
  <section class="intro-section">
    📱 CSS: height: 100vh, gradient background
    🔧 Script: 없음 (정적 콘텐츠)
    🎬 변화: ScrollTrigger의 트리거 역할만 수행

  <!-- ⌚ 메인 애니메이션 영역 -->
  <section class="watch-section">
    📱 CSS: position: relative, pin 대상
    🔧 Script: ScrollTrigger pin, height 동적 계산
    🎬 변화: 스크롤 시 화면에 고정되어 애니메이션 실행

    <!-- 🖤 배경 오버레이 -->
    <div class="black-overlay">
      📱 CSS: position: absolute, z-index: 1
      🔧 Script: 없음 (배경 역할만)
      🎬 변화: 변화 없음 (고정 배경)

    <!-- 📐 레이아웃 컨테이너 -->
    <div class="watch-text-layout">
      📱 CSS: display: flex, justify-content 변경
      🔧 Script: 70% 진행 시 space-between으로 변경
      🎬 변화: center → space-between (데스크톱에서)

      <!-- 🎯 워치 전체 컨테이너 -->
      <div class="watch-element">
        📱 CSS: transform-origin: center, will-change: transform
        🔧 Script: GSAP scale (4.0→1.0), translateX 제어
        🎬 변화: 거대한 크기에서 축소 + 좌측 이동

        <!-- 📱 워치 케이스 (메인) -->
        <div class="watch-main">
          📱 CSS: CSS Variables로 transform 제어
          🔧 Script: 동적 검은색, 회전, 스케일, opacity
          🎬 변화: 색상 변화 + 회전 + 디테일 등장

          <!-- 📺 OLED 화면 -->
          <div class="watch-screen">
            📱 CSS: border-radius, inset shadow
            🔧 Script: backgroundColor, color 제어
            🎬 변화: 배경색/텍스트색 실시간 변경

            <!-- ⏰ 시간 표시 영역 -->
            <div class="time-section">
              📱 CSS: display: flex, flex-direction: column
              🔧 Script: upperDate 페이드인, 시간 업데이트
              🎬 변화: 날짜 등장 + 실시간 시간 갱신

      <!-- 📝 제품 텍스트 -->
      <div class="product-text">
        📱 CSS: position: absolute, transform 초기값
        🔧 Script: opacity, scale, translateX/Y 제어
        🎬 변화: 85% 지점에서 페이드인 + 스케일업

  <!-- 🏁 마무리 섹션 -->
  <section class="dummy-section">
    📱 CSS: height: 100vh, 정적 스타일
    🔧 Script: 없음
    🎬 변화: 변화 없음 (스크롤 종료점 역할)
</div>
```

### 📋 각 요소별 상세 분석

#### 🚀 intro-section (시작 화면)

```css
/* CSS 바인딩 */
.intro-section {
  height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

```javascript
// JavaScript 바인딩 - ScrollTrigger 설정
scrollTrigger: {
  trigger: '.intro-section',  // 이 요소를 트리거로 사용
  pin: '.watch-section',      // 실제로는 watch-section을 pin
}
```

**변화 과정**: 정적 화면 → 스크롤 트리거 역할 → 사라짐

#### ⌚ watch-section (메인 애니메이션 영역)

```css
/* CSS 바인딩 */
.watch-section {
  position: relative;
  background: #000;
  min-height: 600px; /* JavaScript에서 동적 계산으로 덮어씀 */
}
```

```javascript
// JavaScript 바인딩 - 높이 동적 계산
const calculateOptimalSectionHeight = (currentWindowWidth) => {
  const calculatedHeight = (currentWindowWidth / 1920) * 1080;
  return Math.max(calculatedHeight, 800);
};

// DOM 적용
updateDomElementCssProperty(watchSection, 'height', `${calculatedHeight}px`);
```

**변화 과정**: 동적 높이 계산 → ScrollTrigger pin → 애니메이션 컨테이너 역할

#### 📐 watch-text-layout (레이아웃 컨테이너)

```css
/* CSS 바인딩 */
.watch-text-layout {
  display: flex;
  align-items: center;
  justify-content: center; /* JavaScript에서 변경됨 */
  flex-direction: row; /* 모바일에서 column으로 변경 */
}
```

```javascript
// JavaScript 바인딩 - 진행률 70%에서 레이아웃 변경
if (progress >= 0.7 && !checkIfCurrentDeviceIsMobileOrSmaller()) {
  const layoutElement = queryDomElementBySelector('.watch-text-layout');
  applyGsapPropertiesToDomElement(layoutElement, {
    justifyContent: 'space-between', // center에서 space-between으로
  });
}
```

**변화 과정**: justify-content: center → space-between (데스크탑 70% 진행 시)

#### 🎯 watch-element (워치 전체 컨테이너)

```css
/* CSS 바인딩 */
.watch-element {
  width: 45vw;
  height: 45vw;
  transform-origin: center center;
  will-change: transform; /* GPU 가속 최적화 */
}
```

```javascript
// JavaScript 바인딩 - 스케일과 이동 애니메이션
const createAppleWatchScaleAnimationState = (scrollProgress) => {
  const currentWatchScale = interpolateValueBetweenTwoPoints(
    4.0,
    1.0,
    scrollProgress
  );
  return { scale: currentWatchScale };
};

const createDesktopAppleWatchMovementAnimationState = (scrollProgress) => {
  if (scrollProgress < 0.7) return { translateX: 0 };
  const moveDistance = window.innerWidth * 0.35;
  return { translateX: moveDistance * easedProgress };
};
```

**변화 과정**: scale: 4.0 → 1.0 + translateX: 0 → 35vw (데스크탑 70% 이후)

#### 📱 watch-main (워치 케이스)

```css
/* CSS 바인딩 */
.watch-main {
  background: var(--dynamic-black-midnight);
  transform: scale(var(--applewatch-case-scale-multiplier)) rotate(
      var(--applewatch-case-rotation-degrees)
    );
  animation: dynamicBlackPulse 4s ease-in-out infinite;
}
```

```javascript
// JavaScript 바인딩 - 동적 검은색과 CSS 변수 제어
const createDynamicBlackMobileAppleWatchCaseAnimationState = (
  scrollProgress
) => {
  let currentEffect = 'pulse';
  let currentBackgroundColor = '#1c1c1e';

  if (dynamicProgress <= 0.3) {
    currentEffect = 'pulse';
  } else if (dynamicProgress <= 0.6) {
    currentEffect = 'shimmer';
  } else {
    currentEffect = 'pulse+shimmer';
  }

  return {
    backgroundColor: currentBackgroundColor,
    dynamicEffect: currentEffect,
  };
};

// CSS 변수 동적 업데이트
updateDomElementCssProperty(
  appleWatchCase,
  '--applewatch-case-scale-multiplier',
  scale
);
updateDomElementCssProperty(
  appleWatchCase,
  '--watch-crown-opacity',
  crownOpacity
);
```

**변화 과정**: 기본 검은색 → Pulse → Shimmer → Pulse+Shimmer + 디테일 요소 점진적 등장

#### 📺 watch-screen (OLED 화면)

```css
/* CSS 바인딩 */
.watch-screen {
  background: var(--applewatch-display-background-color);
  border-radius: 18% / 15%;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
}
```

```javascript
// JavaScript 바인딩 - 화면 색상 제어
const createFixedWhiteTextColorAnimationState = () => {
  return {
    textColor: '#ffffff',
    backgroundColor: '#000000',
  };
};

// DOM 적용
applyGsapPropertiesToDomElement(watchScreenElement, {
  backgroundColor: colorAnimation.backgroundColor,
});
```

**변화 과정**: 고정 검은 배경 + 흰색 텍스트 유지

#### ⏰ time-section (시간 표시 영역)

```css
/* CSS 바인딩 */
.time-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.upperDate {
  opacity: 0; /* JavaScript에서 제어 */
  position: absolute;
  top: -50%;
}

.time-display {
  font-size: 130px;
  color: #ffffff;
}
```

```javascript
// JavaScript 바인딩 - 실시간 시계 + upperDate 애니메이션
const startRealtimeClockSystem = () => {
  setInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    updateDomElementTextContent('hours', hours);
    updateDomElementTextContent('minutes', minutes);
    toggleColonBlinkAnimation(); // 콜론 깜빡임
  }, 1000);
};

const createAppleWatchComplicationsAppearAnimationState = (scrollProgress) => {
  if (scrollProgress < 0.2) {
    return { opacity: 0, translateX: 0, translateY: -30 };
  }
  const progress = (scrollProgress - 0.2) / 0.25;
  return {
    opacity: progress,
    translateX: interpolateValueBetweenTwoPoints(0, 0, progress),
    translateY: interpolateValueBetweenTwoPoints(-30, 0, progress),
  };
};
```

**변화 과정**:

- upperDate: opacity: 0 → 1 (20~45% 구간에서 페이드인)
- time-display: 1초마다 실시간 시간 업데이트
- colonDivider: opacity 토글 (깜빡임 효과)

#### 📝 product-text (제품 텍스트)

```css
/* CSS 바인딩 */
.product-text {
  position: absolute;
  left: 5%;
  opacity: 0; /* JavaScript에서 제어 */
  font-size: 4rem;
  transform: translateY(-50%);
}
```

```javascript
// JavaScript 바인딩 - 85% 지점에서 등장
const createProductTextDomAppearAnimationState = (scrollProgress) => {
  if (scrollProgress < 0.85) {
    return {
      opacity: 0,
      translateX: deviceType === 'desktop' ? -100 : 0,
      translateY: 40,
      scale: 0.7,
    };
  }

  const textProgress = (scrollProgress - 0.85) / 0.15;
  return {
    opacity: textProgress,
    translateX:
      deviceType === 'desktop'
        ? interpolateValueBetweenTwoPoints(-100, 0, textProgress)
        : 0,
    translateY: interpolateValueBetweenTwoPoints(40, 0, textProgress),
    scale: interpolateValueBetweenTwoPoints(0.7, 1.0, textProgress),
  };
};
```

**변화 과정**: opacity: 0, scale: 0.7, translateY: 40px → opacity: 1, scale: 1.0, translateY: 0 (85~100% 구간)

### 🎯 설계 철학: 실제 Apple Watch 구조 모방

#### 물리적 계층 구조

실제 Apple Watch의 물리적 구성 요소를 HTML로 재현:

```html
<div class="watch-element">
  <!-- 🔗 스포츠 밴드 (상단) -->
  <div class="apple-watch-sport-band-top"></div>

  <!-- 🔗 밴드 커넥터 (상단) -->
  <div class="apple-watch-band-connector-top"></div>

  <!-- ⌚ 메인 워치 케이스 -->
  <div class="watch-main">
    <!-- 👑 디지털 크라운 -->
    <div class="apple-watch-digital-crown"></div>

    <!-- 🔘 사이드 버튼 -->
    <div class="apple-watch-side-button"></div>

    <!-- 📱 OLED 디스플레이 -->
    <div class="watch-screen">
      <div class="time-section">
        <!-- 📅 상단 날짜 (Complications) -->
        <p class="upperDate"></p>

        <!-- 🕐 메인 시간 표시 -->
        <p class="time-display"></p>
      </div>
    </div>
  </div>

  <!-- 🔗 밴드 커넥터 (하단) -->
  <div class="apple-watch-band-connector-bottom"></div>

  <!-- 🔗 스포츠 밴드 (하단) -->
  <div class="apple-watch-sport-band-bottom"></div>
</div>
```

### 🎨 왜 이런 구조를 선택했는가?

#### 1. **Z-Index 계층 관리**

```html
<!-- 배경부터 전경까지 명확한 계층 구조 -->
<div class="black-overlay">
  <!-- z-index: 1 -->
  <div class="watch-text-layout">
    <!-- z-index: 2 -->
    <div class="watch-element">
      <!-- z-index: 5 -->
      <div class="watch-main">
        <!-- z-index: 10 -->
        <div class="watch-screen">
          <!-- z-index: 15 -->
          <div class="time-section"><!-- z-index: 20 --></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**이유**: 각 요소가 겹치지 않고 올바른 순서로 표시되도록 보장

#### 2. **애니메이션 타겟 분리**

```html
<!-- 각각 다른 애니메이션을 받는 독립적인 요소들 -->
<div class="watch-element">
  <!-- 전체 스케일, 이동 애니메이션 -->
  <div class="watch-main">
    <!-- 케이스 색상, 회전 애니메이션 -->
    <div class="watch-screen">
      <!-- 화면 색상 변화 -->
      <div class="upperDate">
        <!-- 날짜 페이드인/아웃 -->
        <div class="time-display"><!-- 시간 색상 변화 --></div>
      </div>
    </div>
  </div>
</div>
```

**이유**: JavaScript에서 각 요소를 독립적으로 제어할 수 있도록 분리

#### 3. **의미론적 마크업 (Semantic Markup)**

```html
<section class="intro-section" role="banner">
  <section class="watch-section" role="main">
    <section class="dummy-section" role="region">
      <p class="time-display" aria-label="현재 시간"></p>
    </section>
  </section>
</section>
```

**이유**: 스크린 리더와 SEO를 위한 접근성 확보

### ⚙️ 스크립트와 마크업의 상호작용

#### 1. **CSS 선택자 기반 제어**

```javascript
// utils.js - DOM 요소 선택
export const queryDomElementBySelector = (cssSelector) => {
  return document.querySelector(cssSelector);
};

// 사용 예시
const watchElement = queryDomElementBySelector('.watch-element');
const watchMain = queryDomElementBySelector('.watch-main');
const upperDate = queryDomElementBySelector('.upperDate');
```

**마크업 연결**: 클래스 이름을 통해 JavaScript가 정확한 요소에 접근

#### 2. **ID 기반 개별 제어**

```html
<!-- HTML: 개별 시간 요소들 -->
<span class="time-digit" id="hours">08</span>
<span class="divider" id="colonDivider">:</span>
<span class="time-digit" id="minutes">43</span>
<span id="currentDateNumber">01</span>
<span id="currentDateName">금</span>
```

```javascript
// JavaScript: 개별 요소 업데이트
updateDomElementTextContent('hours', hours);
updateDomElementTextContent('minutes', minutes);
updateDomElementTextContent('currentDateNumber', day);
updateDomElementTextContent('currentDateName', dayName);
```

**작동 원리**: 실시간 시계 시스템이 각 숫자를 개별적으로 업데이트

#### 3. **CSS 변수와 JavaScript 연동**

```css
/* CSS: 동적 변수 정의 */
:root {
  --applewatch-case-scale-multiplier: 1;
  --applewatch-case-rotation-degrees: 0deg;
  --watch-crown-opacity: 0;
}

.watch-main {
  transform: scale(var(--applewatch-case-scale-multiplier)) rotate(
      var(--applewatch-case-rotation-degrees)
    );
}
```

```javascript
// JavaScript: CSS 변수 동적 제어
updateDomElementCssProperty(
  appleWatchCase,
  '--applewatch-case-scale-multiplier',
  animationState.scale
);
```

**연결 원리**: CSS 변수를 JavaScript에서 실시간으로 변경하여 애니메이션 구현

### 🔄 마크업 구조가 애니메이션에 미치는 영향

#### 1. **부모-자식 관계와 Transform Origin**

```html
<div class="watch-element">
  <!-- transform-origin: center center -->
  <div class="watch-main">
    <!-- 부모를 기준으로 변형 -->
    <div class="apple-watch-digital-crown">
      <!-- 부모 변형에 따라 함께 이동 -->
    </div>
  </div>
</div>
```

**효과**: 워치가 스케일될 때 모든 하위 요소들이 자연스럽게 함께 변형

#### 2. **절대 위치 기반 정밀 배치**

```css
.apple-watch-digital-crown {
  position: absolute;
  top: 20%;
  right: -6px;
}

.apple-watch-side-button {
  position: absolute;
  top: 40%;
  right: -4px;
}
```

**장점**: 실제 Apple Watch와 동일한 비율과 위치 구현

#### 3. **Flexbox 레이아웃 시스템**

```css
.watch-text-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row; /* 데스크탑: 수평 배치 */
}

@media (max-width: 768px) {
  .watch-text-layout {
    flex-direction: column; /* 모바일: 수직 배치 */
  }
}
```

**적응성**: 화면 크기에 따라 레이아웃이 자동으로 재배열

### 🎭 스크립트 동작 흐름과 마크업 연동

#### 단계 1: 초기화 시 마크업 준비

```javascript
// managers.js - 초기 상태 설정
const resetAllAnimationElementsToInitialState = () => {
  // 1. watch-element 초기화
  const watchElement = queryDomElementBySelector('.watch-element');
  applyGsapPropertiesToDomElement(watchElement, {
    scale: 4.0, // 시작 시 4배 크기
    opacity: 1,
    visibility: 'visible',
  });

  // 2. upperDate 숨김
  const upperDate = queryDomElementBySelector('.upperDate');
  applyGsapPropertiesToDomElement(upperDate, {
    opacity: 0, // 처음에는 보이지 않음
  });
};
```

#### 단계 2: 스크롤에 따른 동적 업데이트

```javascript
// ScrollTrigger onUpdate 콜백
onUpdate: (self) => {
  const progress = self.progress; // 0~1 진행률

  // 1. 애니메이션 상태 계산
  const appleWatchAnimationState =
    createAppleWatchScaleAnimationState(progress);

  // 2. DOM 요소에 적용
  const appleWatchElement = queryDomElementBySelector('.watch-element');
  applyAppleWatchAnimationStateToDomElement(
    appleWatchElement,
    appleWatchAnimationState
  );
};
```

#### 단계 3: 실시간 시계 업데이트

```javascript
// 1초마다 시간 정보 업데이트
setInterval(() => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');

  // HTML의 특정 ID 요소에 직접 업데이트
  updateDomElementTextContent('hours', hours);
}, 1000);
```

### 🎪 마크업 설계의 핵심 이점

1. **모듈성**: 각 HTML 요소가 독립적인 애니메이션을 받을 수 있음
2. **확장성**: 새로운 워치 요소 추가가 쉬움
3. **유지보수성**: 구조가 명확해 수정과 디버깅이 용이
4. **성능**: 필요한 요소만 선택적으로 업데이트 가능
5. **접근성**: 시맨틱 마크업으로 스크린 리더 지원
