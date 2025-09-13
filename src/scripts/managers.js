// src/scripts/managers.js

import { DYNAMIC_BLACK_ANIMATION_CONFIG } from './config.js';
import {
  calculateOptimalSectionHeight,
  calculateScrollTriggerEndValue,
  updateDomElementCssProperty,
  queryDomElementBySelector,
  getDomElementById,
  updateDomElementTextContent,
  getResponsiveStartPoint,
  clampValueBetweenMinAndMax,
  applyGsapPropertiesToDomElement,
  detectCurrentDeviceTypeBasedOnWindowWidth,
  checkIfCurrentDeviceIsMobileOrSmaller,
} from './utils.js';
import {
  createDynamicBlackMobileAppleWatchCaseAnimationState,
  createDynamicBlackDesktopAppleWatchCaseAnimationState,
  createAppleWatchTransformationAnimationState,
  createMobileAppleWatchCaseFadeInAnimationState,
  createMobileAppleWatchCaseScaleAnimationState,
  createMobileAppleWatchCaseRotationAnimationState,
  createAppleWatchScaleAnimationState,
  createAppleWatchComplicationsAppearAnimationState,
  createProductTextDomAppearAnimationState,
  createDesktopAppleWatchMovementAnimationState,
  createFixedWhiteTextColorAnimationState,
} from './animations.js';
import {
  applyDynamicBlackAppleWatchCaseAnimationStateToDomElement,
  applyAppleWatchAnimationStateToDomElement,
  applyAppleWatchComplicationsAnimationStateToDomElement,
  applyProductTextDomAnimationStateToDomElement,
  applyFixedWhiteColorAnimationStateToDomElements,
} from './dom-handlers.js';

/**
 * 직접 제어 매니저 생성 함수
 */
export const createDirectControlManager = () => {
  let currentUnifiedHeight = 0;
  let currentEndValue = '';

  const applyUnifiedDimensionsAndGetEndValue = () => {
    const currentWidth = window.innerWidth;
    const calculatedHeight = calculateOptimalSectionHeight(currentWidth);
    const calculatedEndValue = calculateScrollTriggerEndValue(calculatedHeight);

    currentUnifiedHeight = calculatedHeight;
    currentEndValue = calculatedEndValue;

    const watchSection = queryDomElementBySelector('.watch-section');
    if (watchSection) {
      updateDomElementCssProperty(
        watchSection,
        'height',
        `${calculatedHeight}px`
      );
    }

    return {
      height: calculatedHeight,
      endValue: calculatedEndValue,
    };
  };

  const forcePinSpacerHeight = (targetHeight) => {
    const pinSpacer = queryDomElementBySelector('.pin-spacer');

    if (pinSpacer && targetHeight > 0) {
      updateDomElementCssProperty(pinSpacer, 'height', `${targetHeight}px`);
      updateDomElementCssProperty(pinSpacer, 'min-height', `${targetHeight}px`);
      updateDomElementCssProperty(pinSpacer, 'max-height', `${targetHeight}px`);
      return true;
    }
    return false;
  };

  return {
    apply: applyUnifiedDimensionsAndGetEndValue,
    forceSync: forcePinSpacerHeight,
    getCurrentHeight: () => currentUnifiedHeight,
    getCurrentEndValue: () => currentEndValue,
  };
};

/**
 * 동적 검은색 애니메이션 매니저 생성 함수
 */
export const createDynamicBlackAnimationManager = (directControlManager) => {
  let scrollTriggerInstance = null;
  let animationProgress = 0;
  let clockInterval = null;

  /**
   * 모든 애니메이션 요소를 초기 상태로 리셋
   */
  const resetAllAnimationElementsToInitialState = () => {
    const initialScale =
      DYNAMIC_BLACK_ANIMATION_CONFIG.APPLEWATCH_SCALE_ANIMATION
        .AT_ANIMATION_START;

    const watchElement = queryDomElementBySelector('.watch-element');
    applyGsapPropertiesToDomElement(watchElement, {
      scale: initialScale,
      x: 0,
      opacity: 1,
      visibility: 'visible',
      transformOrigin: 'center center',
      force3D: true,
    });

    const productText = queryDomElementBySelector('.product-text');
    const {
      INITIAL_SCALE,
      INITIAL_Y_OFFSET_PIXELS,
      DESKTOP_INITIAL_X_OFFSET_PIXELS,
    } = DYNAMIC_BLACK_ANIMATION_CONFIG.PRODUCTTEXT_DOM_ANIMATION;
    applyGsapPropertiesToDomElement(productText, {
      opacity: 0,
      left: '5%',
      x: DESKTOP_INITIAL_X_OFFSET_PIXELS,
      y: INITIAL_Y_OFFSET_PIXELS,
      scale: INITIAL_SCALE,
      force3D: true,
      visibility: 'visible',
    });

    const deviceType = detectCurrentDeviceTypeBasedOnWindowWidth();
    const upperDate = queryDomElementBySelector('.upperDate');

    const {
      UPPERDATE_DESKTOP_INITIAL_X_OFFSET_PIXELS,
      UPPERDATE_DESKTOP_INITIAL_Y_OFFSET_PIXELS,
      UPPERDATE_MOBILE_INITIAL_X_OFFSET_PIXELS,
      UPPERDATE_MOBILE_INITIAL_Y_OFFSET_PIXELS,
      UPPERDATE_SMALL_MOBILE_INITIAL_X_OFFSET_PIXELS,
      UPPERDATE_SMALL_MOBILE_INITIAL_Y_OFFSET_PIXELS,
    } = DYNAMIC_BLACK_ANIMATION_CONFIG.APPLEWATCH_COMPLICATIONS_ANIMATION;

    let upperDateInitialX, upperDateInitialY;

    if (deviceType === 'small-mobile') {
      upperDateInitialX = UPPERDATE_SMALL_MOBILE_INITIAL_X_OFFSET_PIXELS;
      upperDateInitialY = UPPERDATE_SMALL_MOBILE_INITIAL_Y_OFFSET_PIXELS;
    } else if (deviceType === 'mobile') {
      upperDateInitialX = UPPERDATE_MOBILE_INITIAL_X_OFFSET_PIXELS;
      upperDateInitialY = UPPERDATE_MOBILE_INITIAL_Y_OFFSET_PIXELS;
    } else {
      upperDateInitialX = UPPERDATE_DESKTOP_INITIAL_X_OFFSET_PIXELS;
      upperDateInitialY = UPPERDATE_DESKTOP_INITIAL_Y_OFFSET_PIXELS;
    }

    applyGsapPropertiesToDomElement(upperDate, {
      opacity: 0,
      x: upperDateInitialX,
      y: upperDateInitialY,
      force3D: true,
      visibility: 'visible',
    });

    // 화면과 텍스트 초기화
    const screenElement = queryDomElementBySelector('.watch-screen');
    const timeDisplay = queryDomElementBySelector('.time-display');
    const dateElement = queryDomElementBySelector('.upperDate');

    applyGsapPropertiesToDomElement(screenElement, {
      backgroundColor: '#000000',
      color: '#ffffff',
    });
    applyGsapPropertiesToDomElement(timeDisplay, { color: '#ffffff' });
    if (dateElement)
      applyGsapPropertiesToDomElement(dateElement, { color: '#ffffff' });

    const layoutElement = queryDomElementBySelector('.watch-text-layout');
    applyGsapPropertiesToDomElement(layoutElement, {
      justifyContent: 'center',
    });

    const appleWatchCase = queryDomElementBySelector('.watch-main');

    if (checkIfCurrentDeviceIsMobileOrSmaller()) {
      appleWatchCase.classList.remove(
        'shimmer-effect',
        'apple-watch-transformed'
      );
      applyGsapPropertiesToDomElement(appleWatchCase, {
        opacity: 0,
        backgroundColor:
          DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.BASE_BLACK,
        transformOrigin: 'center center',
      });
      updateDomElementCssProperty(
        appleWatchCase,
        '--applewatch-case-scale-multiplier',
        DYNAMIC_BLACK_ANIMATION_CONFIG
          .DYNAMIC_BLACK_MOBILE_APPLEWATCH_CASE_ANIMATION
          .SCALE_AT_ANIMATION_START
      );
      updateDomElementCssProperty(
        appleWatchCase,
        '--applewatch-case-rotation-degrees',
        '0deg'
      );
      updateDomElementCssProperty(appleWatchCase, '--watch-crown-opacity', 0);
      updateDomElementCssProperty(appleWatchCase, '--watch-button-opacity', 0);
      updateDomElementCssProperty(appleWatchCase, '--watch-band-opacity', 0);
    } else {
      appleWatchCase.classList.remove(
        'shimmer-effect',
        'apple-watch-transformed'
      );
      applyGsapPropertiesToDomElement(appleWatchCase, {
        opacity: 1,
        backgroundColor:
          DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.BASE_BLACK,
        transformOrigin: 'center center',
      });
      updateDomElementCssProperty(
        appleWatchCase,
        '--applewatch-case-scale-multiplier',
        1
      );
      updateDomElementCssProperty(
        appleWatchCase,
        '--applewatch-case-rotation-degrees',
        '0deg'
      );
      updateDomElementCssProperty(appleWatchCase, '--watch-crown-opacity', 0);
      updateDomElementCssProperty(appleWatchCase, '--watch-button-opacity', 0);
      updateDomElementCssProperty(appleWatchCase, '--watch-band-opacity', 0);
    }

    return initialScale;
  };

  /**
   * 동적 검은색 애니메이션 시스템 설정
   */
  const setupDynamicBlackAnimationSystem = () => {
    const initialScale = resetAllAnimationElementsToInitialState();
    const { height, endValue } = directControlManager.apply();
    const deviceType = detectCurrentDeviceTypeBasedOnWindowWidth();
    const responsiveStartPoint = getResponsiveStartPoint();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.intro-section',
        pin: '.watch-section',
        scrub:
          DYNAMIC_BLACK_ANIMATION_CONFIG.ANIMATION_DURATION_SETTINGS
            .SCROLL_TRIGGER_SCRUB_DELAY_SECONDS,
        start: responsiveStartPoint,
        end: endValue,
        anticipatePin: 1,
        refreshPriority: 1,
        invalidateOnRefresh: true,

        onStart: (self) => {
          setTimeout(() => {
            const targetHeight = directControlManager.getCurrentHeight();
            directControlManager.forceSync(targetHeight);
          }, 100);
        },

        onRefresh: (self) => {
          const newStartPoint = getResponsiveStartPoint();
          self.vars.start = newStartPoint;

          setTimeout(() => {
            const targetHeight = directControlManager.getCurrentHeight();
            directControlManager.forceSync(targetHeight);
          }, 100);
        },

        onUpdate: (self) => {
          const progress = self.progress;
          animationProgress = progress;
          const currentDeviceType = detectCurrentDeviceTypeBasedOnWindowWidth();

          // 애니메이션 상태 생성
          const appleWatchAnimationState = {
            ...createAppleWatchScaleAnimationState(progress),
            ...createDesktopAppleWatchMovementAnimationState(
              progress,
              currentDeviceType
            ),
          };

          const appleWatchCaseAnimationState =
            checkIfCurrentDeviceIsMobileOrSmaller()
              ? {
                  ...createMobileAppleWatchCaseFadeInAnimationState(
                    progress,
                    currentDeviceType
                  ),
                  ...createDynamicBlackMobileAppleWatchCaseAnimationState(
                    progress,
                    currentDeviceType
                  ),
                  ...createMobileAppleWatchCaseScaleAnimationState(
                    progress,
                    currentDeviceType
                  ),
                  ...createMobileAppleWatchCaseRotationAnimationState(
                    progress,
                    currentDeviceType
                  ),
                  ...createAppleWatchTransformationAnimationState(
                    progress,
                    currentDeviceType
                  ),
                }
              : {
                  ...createDynamicBlackDesktopAppleWatchCaseAnimationState(
                    progress,
                    currentDeviceType
                  ),
                  ...createAppleWatchTransformationAnimationState(
                    progress,
                    currentDeviceType
                  ),
                };

          const complicationsAnimation =
            createAppleWatchComplicationsAppearAnimationState(
              progress,
              currentDeviceType
            );
          const productTextAnimation = createProductTextDomAppearAnimationState(
            progress,
            currentDeviceType
          );
          const colorAnimation = createFixedWhiteTextColorAnimationState(
            progress,
            currentDeviceType
          );

          // DOM 적용
          const appleWatchElement = queryDomElementBySelector('.watch-element');
          const appleWatchCaseElement =
            queryDomElementBySelector('.watch-main');
          const complicationsElement = queryDomElementBySelector('.upperDate');
          const productTextElement = queryDomElementBySelector('.product-text');

          applyAppleWatchAnimationStateToDomElement(
            appleWatchElement,
            appleWatchAnimationState
          );
          applyDynamicBlackAppleWatchCaseAnimationStateToDomElement(
            appleWatchCaseElement,
            appleWatchCaseAnimationState
          );
          applyAppleWatchComplicationsAnimationStateToDomElement(
            complicationsElement,
            complicationsAnimation
          );
          applyProductTextDomAnimationStateToDomElement(
            productTextElement,
            productTextAnimation,
            currentDeviceType
          );
          applyFixedWhiteColorAnimationStateToDomElements(
            colorAnimation,
            currentDeviceType
          );

          if (
            progress >=
              DYNAMIC_BLACK_ANIMATION_CONFIG.ANIMATION_TRIGGER_THRESHOLDS
                .DESKTOP_APPLEWATCH_MOVE_START_AT_PROGRESS &&
            !checkIfCurrentDeviceIsMobileOrSmaller()
          ) {
            const layoutElement =
              queryDomElementBySelector('.watch-text-layout');
            applyGsapPropertiesToDomElement(layoutElement, {
              justifyContent: 'space-between',
            });
          }
        },

        onComplete: () => {},

        onLeaveBack: (self) => {
          if (self.progress <= 0.01) {
            resetAllAnimationElementsToInitialState();
          }
        },
      },
    });

    return timeline;
  };

  /**
   * 실시간 시계 시스템 시작
   */
  const startRealtimeClockSystem = () => {
    if (clockInterval) return;

    const updateCurrentTimeDisplay = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const day = now.getDate();
      const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
      const dayName = dayNames[now.getDay()];

      updateDomElementTextContent('hours', hours);
      updateDomElementTextContent('minutes', minutes);
      updateDomElementTextContent('currentDateNumber', day);
      updateDomElementTextContent('currentDateName', dayName);

      return { hours, minutes, day, dayName };
    };

    const toggleColonBlinkAnimation = () => {
      const colonElement = getDomElementById('colonDivider');
      if (!colonElement) return;

      const currentOpacity = colonElement.style.opacity || '1';
      const newOpacity = currentOpacity === '0' ? '1' : '0';
      updateDomElementCssProperty(colonElement, 'opacity', newOpacity);
    };

    updateCurrentTimeDisplay();

    clockInterval = setInterval(() => {
      updateCurrentTimeDisplay();
      toggleColonBlinkAnimation();
    }, 1000);
  };

  /**
   * 실시간 시계 시스템 정지
   */
  const stopRealtimeClockSystem = () => {
    if (clockInterval) {
      clearInterval(clockInterval);
      clockInterval = null;
    }
  };

  /**
   * 뷰포트 변화 시 완전한 재초기화 처리
   */
  const handleViewportChangeWithCompleteReinitialization = () => {
    ScrollTrigger.killAll();
    const pinSpacers = document.querySelectorAll('.pin-spacer');
    pinSpacers.forEach((spacer) => spacer.remove());

    const watchSection = getDomElementById('watchSection');
    if (watchSection) {
      watchSection.removeAttribute('style');
      directControlManager.apply();
    }

    setTimeout(() => {
      resetAllAnimationElementsToInitialState();
      scrollTriggerInstance = setupDynamicBlackAnimationSystem();

      setTimeout(() => {
        ScrollTrigger.refresh();

        setTimeout(() => {
          const targetHeight = directControlManager.getCurrentHeight();
          directControlManager.forceSync(targetHeight);
        }, 200);
      }, 100);
    }, 300);
  };

  return {
    initialize: () => {
      resetAllAnimationElementsToInitialState();
      scrollTriggerInstance = setupDynamicBlackAnimationSystem();
      startRealtimeClockSystem();

      setTimeout(() => {
        const targetHeight = directControlManager.getCurrentHeight();
        directControlManager.forceSync(targetHeight);
      }, 800);
    },

    handleViewportChange: handleViewportChangeWithCompleteReinitialization,

    destroy: () => {
      ScrollTrigger.killAll();
      stopRealtimeClockSystem();
    },

    getCurrentState: () => ({
      progress: animationProgress,
      isMobile: checkIfCurrentDeviceIsMobileOrSmaller(),
    }),
  };
};

/**
 * 키보드 스크롤 매니저 생성 함수
 */
export const createKeyboardScrollManager = () => {
  const scrollStepAmount = 100;
  let isCurrentlyScrolling = false;

  const performSmoothScrollToTarget = (targetScrollY) => {
    if (isCurrentlyScrolling) return;

    isCurrentlyScrolling = true;
    const maxScrollY = document.body.scrollHeight - window.innerHeight;
    const clampedScrollY = clampValueBetweenMinAndMax(
      targetScrollY,
      0,
      maxScrollY
    );

    window.scrollTo({
      top: clampedScrollY,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isCurrentlyScrolling = false;
    }, 300);
  };

  const handleKeyboardScrollNavigation = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        performSmoothScrollToTarget(window.pageYOffset - scrollStepAmount);
        break;
      case 'ArrowDown':
        event.preventDefault();
        performSmoothScrollToTarget(window.pageYOffset + scrollStepAmount);
        break;
      case 'PageUp':
        event.preventDefault();
        performSmoothScrollToTarget(
          window.pageYOffset - window.innerHeight * 0.8
        );
        break;
      case 'PageDown':
        event.preventDefault();
        performSmoothScrollToTarget(
          window.pageYOffset + window.innerHeight * 0.8
        );
        break;
      case 'Home':
        event.preventDefault();
        performSmoothScrollToTarget(0);
        break;
      case 'End':
        event.preventDefault();
        performSmoothScrollToTarget(document.body.scrollHeight);
        break;
    }
  };

  return {
    initialize: () => {
      document.addEventListener('keydown', handleKeyboardScrollNavigation);
    },
    destroy: () => {
      document.removeEventListener('keydown', handleKeyboardScrollNavigation);
    },
  };
};

/**
 * 뷰포트 매니저 생성 함수
 */
export const createViewportManager = (
  directControlManager,
  animationManager
) => {
  let isProcessingViewportChange = false;

  const createDebounceFunction = (targetFunction, delayMilliseconds) => {
    let timeoutId;
    return function executedFunction(...functionArguments) {
      const laterExecution = () => {
        clearTimeout(timeoutId);
        targetFunction(...functionArguments);
      };
      clearTimeout(timeoutId);
      timeoutId = setTimeout(laterExecution, delayMilliseconds);
    };
  };

  const handleViewportResizeWithDebounce = createDebounceFunction(() => {
    if (isProcessingViewportChange) {
      return;
    }

    isProcessingViewportChange = true;

    getResponsiveStartPoint();
    animationManager.handleViewportChange();

    setTimeout(() => {
      isProcessingViewportChange = false;
    }, 1500);
  }, 300);

  return {
    initialize: () => {
      directControlManager.apply();
      getResponsiveStartPoint();
      window.addEventListener('resize', handleViewportResizeWithDebounce);
    },
    destroy: () => {
      window.removeEventListener('resize', handleViewportResizeWithDebounce);
    },
  };
};
