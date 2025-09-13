// src/scripts/main.js

import {
  createDirectControlManager,
  createDynamicBlackAnimationManager,
  createKeyboardScrollManager,
  createViewportManager,
} from './managers.js';

/**
 * 디바이스별 UPPERDATE 좌표 시스템 초기화 메인 함수
 */
const initializeDeviceSpecificUpperDateCoordinatesSystem = () => {
  console.log(
    '[INIT] 디바이스별 UPPERDATE 좌표 분리 애니메이션 시스템 초기화 시작'
  );

  // 매니저 인스턴스 생성
  const directControlManager = createDirectControlManager();
  const animationManager =
    createDynamicBlackAnimationManager(directControlManager);
  const keyboardManager = createKeyboardScrollManager();
  const viewportManager = createViewportManager(
    directControlManager,
    animationManager
  );

  // 스크롤 최적화 처리
  let scrollTicking = false;
  const handleOptimizedScrollEvent = () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };

  // 이벤트 리스너 등록
  window.addEventListener('scroll', handleOptimizedScrollEvent, {
    passive: true,
  });

  // 매니저들 초기화
  keyboardManager.initialize();
  viewportManager.initialize();
  animationManager.initialize();

  console.log('[INIT] 모든 매니저 시스템 초기화 완료');

  // 주기적 동기화 타이머
  const periodicSyncInterval = setInterval(() => {
    const targetHeight = directControlManager.getCurrentHeight();
    if (targetHeight > 0) {
      directControlManager.forceSync(targetHeight);
    }
  }, 3000);

  // 완전한 시스템 정리 함수
  const cleanupCompleteSystem = () => {
    console.log('[CLEANUP] 시스템 정리 시작');

    clearInterval(periodicSyncInterval);
    animationManager.destroy();
    viewportManager.destroy();
    keyboardManager.destroy();
    window.removeEventListener('scroll', handleOptimizedScrollEvent);

    console.log('[CLEANUP] 시스템 정리 완료');
  };

  // 페이지 종료 시 정리
  window.addEventListener('beforeunload', cleanupCompleteSystem);

  console.log(
    '[INIT] 디바이스별 UPPERDATE 좌표 분리 애니메이션 시스템 초기화 완료'
  );

  return cleanupCompleteSystem;
};

/**
 * DOM 로드 완료 시 시스템 초기화
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('[DOM] DOM 로드 완료, 시스템 초기화 대기 중...');

  setTimeout(() => {
    const systemCleanup = initializeDeviceSpecificUpperDateCoordinatesSystem();
  }, 100);
});

/**
 * 에러 처리
 */
window.addEventListener('error', (errorEvent) => {
  console.error('[ERROR] 시스템 에러 발생:', errorEvent);
});
