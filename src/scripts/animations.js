// src/scripts/animations.js

import { DYNAMIC_BLACK_ANIMATION_CONFIG } from './config.js';
import {
  calculateProgressWithinSpecificRange,
  interpolateValueBetweenTwoPoints,
  calculateSineWaveRotation,
  calculateCubicEasingProgress,
  calculateWatchDomMovementDistance,
  checkIfCurrentDeviceIsMobileOrSmaller,
} from './utils.js';

/**
 * 모바일 동적 검은색 Apple Watch 케이스 애니메이션 상태 생성
 */
export const createDynamicBlackMobileAppleWatchCaseAnimationState = (
  scrollProgress,
  deviceType
) => {
  if (deviceType !== 'mobile' && deviceType !== 'small-mobile') {
    return {
      backgroundColor:
        DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.MIDNIGHT,
      dynamicEffect: 'none',
    };
  }

  const { DYNAMIC_BLACK_START_AT_PROGRESS } =
    DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_MOBILE_APPLEWATCH_CASE_ANIMATION;

  if (scrollProgress <= DYNAMIC_BLACK_START_AT_PROGRESS) {
    return {
      backgroundColor:
        DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.BASE_BLACK,
      dynamicEffect: 'pulse',
    };
  }

  const dynamicProgress = calculateProgressWithinSpecificRange(
    scrollProgress,
    DYNAMIC_BLACK_START_AT_PROGRESS,
    1.0
  );

  let currentEffect = 'pulse';
  let currentBackgroundColor =
    DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.MIDNIGHT;

  if (dynamicProgress <= 0.3) {
    currentEffect = 'pulse';
    currentBackgroundColor =
      DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.MIDNIGHT;
  } else if (dynamicProgress <= 0.6) {
    currentEffect = 'shimmer';
    currentBackgroundColor =
      DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.SPACE_GRAY;
  } else {
    currentEffect = 'pulse+shimmer';
    currentBackgroundColor =
      DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.GLOSSY_BLACK;
  }

  return {
    backgroundColor: currentBackgroundColor,
    dynamicEffect: currentEffect,
  };
};

/**
 * 데스크탑 동적 검은색 Apple Watch 케이스 애니메이션 상태 생성
 */
export const createDynamicBlackDesktopAppleWatchCaseAnimationState = (
  scrollProgress,
  deviceType
) => {
  if (checkIfCurrentDeviceIsMobileOrSmaller()) {
    return {
      backgroundColor:
        DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.MIDNIGHT,
      dynamicEffect: 'none',
    };
  }

  const { DESKTOP_DYNAMIC_BLACK_START_AT_PROGRESS } =
    DYNAMIC_BLACK_ANIMATION_CONFIG.ANIMATION_TRIGGER_THRESHOLDS;

  if (scrollProgress <= DESKTOP_DYNAMIC_BLACK_START_AT_PROGRESS) {
    return {
      backgroundColor:
        DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.BASE_BLACK,
      dynamicEffect: 'pulse',
    };
  }

  const dynamicProgress = calculateProgressWithinSpecificRange(
    scrollProgress,
    DESKTOP_DYNAMIC_BLACK_START_AT_PROGRESS,
    1.0
  );

  let currentEffect = 'pulse';
  let currentBackgroundColor =
    DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.MIDNIGHT;

  if (dynamicProgress <= 0.3) {
    currentEffect = 'pulse';
    currentBackgroundColor =
      DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.MIDNIGHT;
  } else if (dynamicProgress <= 0.6) {
    currentEffect = 'shimmer';
    currentBackgroundColor =
      DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.SPACE_GRAY;
  } else {
    currentEffect = 'pulse+shimmer';
    currentBackgroundColor =
      DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_COLORS.DEEP_BLACK;
  }

  return {
    backgroundColor: currentBackgroundColor,
    dynamicEffect: currentEffect,
  };
};

/**
 * Apple Watch 변환 애니메이션 상태 생성
 */
export const createAppleWatchTransformationAnimationState = (
  scrollProgress,
  deviceType
) => {
  const transformStartThreshold = checkIfCurrentDeviceIsMobileOrSmaller()
    ? DYNAMIC_BLACK_ANIMATION_CONFIG
        .DYNAMIC_BLACK_MOBILE_APPLEWATCH_CASE_ANIMATION
        .APPLE_WATCH_TRANSFORM_START_AT_PROGRESS
    : DYNAMIC_BLACK_ANIMATION_CONFIG.ANIMATION_TRIGGER_THRESHOLDS
        .DESKTOP_APPLE_WATCH_TRANSFORM_START_AT_PROGRESS;

  if (scrollProgress < transformStartThreshold) {
    return {
      crownOpacity:
        DYNAMIC_BLACK_ANIMATION_CONFIG.APPLE_WATCH_TRANSFORMATION
          .CROWN_OPACITY_START,
      buttonOpacity:
        DYNAMIC_BLACK_ANIMATION_CONFIG.APPLE_WATCH_TRANSFORMATION
          .BUTTON_OPACITY_START,
      bandOpacity:
        DYNAMIC_BLACK_ANIMATION_CONFIG.APPLE_WATCH_TRANSFORMATION
          .BAND_OPACITY_START,
      isTransforming: false,
    };
  }

  const transformProgress = calculateProgressWithinSpecificRange(
    scrollProgress,
    transformStartThreshold,
    transformStartThreshold +
      DYNAMIC_BLACK_ANIMATION_CONFIG.APPLE_WATCH_TRANSFORMATION
        .TRANSFORMATION_DURATION_PROGRESS
  );

  const currentCrownOpacity = interpolateValueBetweenTwoPoints(
    DYNAMIC_BLACK_ANIMATION_CONFIG.APPLE_WATCH_TRANSFORMATION
      .CROWN_OPACITY_START,
    DYNAMIC_BLACK_ANIMATION_CONFIG.APPLE_WATCH_TRANSFORMATION.CROWN_OPACITY_END,
    transformProgress
  );

  const currentButtonOpacity = interpolateValueBetweenTwoPoints(
    DYNAMIC_BLACK_ANIMATION_CONFIG.APPLE_WATCH_TRANSFORMATION
      .BUTTON_OPACITY_START,
    DYNAMIC_BLACK_ANIMATION_CONFIG.APPLE_WATCH_TRANSFORMATION
      .BUTTON_OPACITY_END,
    transformProgress
  );

  const currentBandOpacity = interpolateValueBetweenTwoPoints(
    DYNAMIC_BLACK_ANIMATION_CONFIG.APPLE_WATCH_TRANSFORMATION
      .BAND_OPACITY_START,
    DYNAMIC_BLACK_ANIMATION_CONFIG.APPLE_WATCH_TRANSFORMATION.BAND_OPACITY_END,
    transformProgress
  );

  return {
    crownOpacity: currentCrownOpacity,
    buttonOpacity: currentButtonOpacity,
    bandOpacity: currentBandOpacity,
    isTransforming: transformProgress > 0,
  };
};

/**
 * 모바일 Apple Watch 케이스 페이드인 애니메이션 상태 생성
 */
export const createMobileAppleWatchCaseFadeInAnimationState = (
  scrollProgress,
  deviceType
) => {
  if (deviceType !== 'mobile' && deviceType !== 'small-mobile') {
    return { opacity: 1 };
  }

  const fadeCompleteThreshold =
    DYNAMIC_BLACK_ANIMATION_CONFIG
      .DYNAMIC_BLACK_MOBILE_APPLEWATCH_CASE_ANIMATION
      .FADE_ANIMATION_COMPLETE_AT_PROGRESS;

  if (scrollProgress <= fadeCompleteThreshold) {
    const fadeProgress = calculateProgressWithinSpecificRange(
      scrollProgress,
      0,
      fadeCompleteThreshold
    );
    return { opacity: fadeProgress };
  }

  return { opacity: 1 };
};

/**
 * 모바일 Apple Watch 케이스 스케일 애니메이션 상태 생성
 */
export const createMobileAppleWatchCaseScaleAnimationState = (
  scrollProgress,
  deviceType
) => {
  if (deviceType !== 'mobile' && deviceType !== 'small-mobile') {
    return { scale: 1 };
  }

  const {
    SCALE_AT_ANIMATION_START,
    SCALE_AT_ANIMATION_END,
    SCALE_ANIMATION_START_AT_PROGRESS,
  } =
    DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_MOBILE_APPLEWATCH_CASE_ANIMATION;

  if (scrollProgress <= SCALE_ANIMATION_START_AT_PROGRESS) {
    return { scale: SCALE_AT_ANIMATION_START };
  }

  const scaleAnimationProgress = calculateProgressWithinSpecificRange(
    scrollProgress,
    SCALE_ANIMATION_START_AT_PROGRESS,
    1.0
  );
  const currentScale = interpolateValueBetweenTwoPoints(
    SCALE_AT_ANIMATION_START,
    SCALE_AT_ANIMATION_END,
    scaleAnimationProgress
  );

  return { scale: currentScale };
};

/**
 * 모바일 Apple Watch 케이스 회전 애니메이션 상태 생성
 */
export const createMobileAppleWatchCaseRotationAnimationState = (
  scrollProgress,
  deviceType
) => {
  if (deviceType !== 'mobile' && deviceType !== 'small-mobile') {
    return { rotation: 0 };
  }

  const { SCALE_ANIMATION_START_AT_PROGRESS, ROTATION_MAX_DEGREES } =
    DYNAMIC_BLACK_ANIMATION_CONFIG.DYNAMIC_BLACK_MOBILE_APPLEWATCH_CASE_ANIMATION;

  if (scrollProgress <= SCALE_ANIMATION_START_AT_PROGRESS) {
    return { rotation: 0 };
  }

  const rotationAnimationProgress = calculateProgressWithinSpecificRange(
    scrollProgress,
    SCALE_ANIMATION_START_AT_PROGRESS,
    1.0
  );
  const currentRotation = calculateSineWaveRotation(
    rotationAnimationProgress,
    ROTATION_MAX_DEGREES
  );

  return { rotation: currentRotation };
};

/**
 * Apple Watch 스케일 애니메이션 상태 생성
 */
export const createAppleWatchScaleAnimationState = (scrollProgress) => {
  const { AT_ANIMATION_START, AT_ANIMATION_END } =
    DYNAMIC_BLACK_ANIMATION_CONFIG.APPLEWATCH_SCALE_ANIMATION;
  const currentWatchScale = interpolateValueBetweenTwoPoints(
    AT_ANIMATION_START,
    AT_ANIMATION_END,
    scrollProgress
  );

  return { scale: currentWatchScale };
};

/**
 * Apple Watch Complications 등장 애니메이션 상태 생성
 */
export const createAppleWatchComplicationsAppearAnimationState = (
  scrollProgress,
  deviceType
) => {
  const complicationsAppearThreshold =
    DYNAMIC_BLACK_ANIMATION_CONFIG.ANIMATION_TRIGGER_THRESHOLDS
      .APPLEWATCH_COMPLICATIONS_APPEAR_AT_PROGRESS;

  const {
    UPPERDATE_DESKTOP_INITIAL_X_OFFSET_PIXELS,
    UPPERDATE_DESKTOP_INITIAL_Y_OFFSET_PIXELS,
    UPPERDATE_MOBILE_INITIAL_X_OFFSET_PIXELS,
    UPPERDATE_MOBILE_INITIAL_Y_OFFSET_PIXELS,
    UPPERDATE_SMALL_MOBILE_INITIAL_X_OFFSET_PIXELS,
    UPPERDATE_SMALL_MOBILE_INITIAL_Y_OFFSET_PIXELS,
    UPPERDATE_FADE_IN_DURATION_PROGRESS,
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

  if (scrollProgress < complicationsAppearThreshold) {
    return {
      opacity: 0,
      translateX: upperDateInitialX,
      translateY: upperDateInitialY,
    };
  }

  const complicationsAppearProgress = calculateProgressWithinSpecificRange(
    scrollProgress,
    complicationsAppearThreshold,
    complicationsAppearThreshold + UPPERDATE_FADE_IN_DURATION_PROGRESS
  );

  return {
    opacity: complicationsAppearProgress,
    translateX: interpolateValueBetweenTwoPoints(
      upperDateInitialX,
      0,
      complicationsAppearProgress
    ),
    translateY: interpolateValueBetweenTwoPoints(
      upperDateInitialY,
      0,
      complicationsAppearProgress
    ),
  };
};

/**
 * Product Text DOM 등장 애니메이션 상태 생성
 */
export const createProductTextDomAppearAnimationState = (
  scrollProgress,
  deviceType
) => {
  const textAppearThreshold =
    DYNAMIC_BLACK_ANIMATION_CONFIG.ANIMATION_TRIGGER_THRESHOLDS
      .PRODUCTTEXT_DOM_APPEAR_AT_PROGRESS;
  const {
    INITIAL_SCALE,
    FINAL_SCALE,
    INITIAL_Y_OFFSET_PIXELS,
    DESKTOP_INITIAL_X_OFFSET_PIXELS,
    FADE_IN_DURATION_PROGRESS,
  } = DYNAMIC_BLACK_ANIMATION_CONFIG.PRODUCTTEXT_DOM_ANIMATION;

  if (scrollProgress < textAppearThreshold) {
    return {
      opacity: 0,
      translateX:
        deviceType === 'desktop' ? DESKTOP_INITIAL_X_OFFSET_PIXELS : 0,
      translateY: INITIAL_Y_OFFSET_PIXELS,
      scale: INITIAL_SCALE,
    };
  }

  const textAppearProgress = calculateProgressWithinSpecificRange(
    scrollProgress,
    textAppearThreshold,
    textAppearThreshold + FADE_IN_DURATION_PROGRESS
  );

  return {
    opacity: textAppearProgress,
    translateX:
      deviceType === 'desktop'
        ? interpolateValueBetweenTwoPoints(
            DESKTOP_INITIAL_X_OFFSET_PIXELS,
            0,
            textAppearProgress
          )
        : 0,
    translateY: interpolateValueBetweenTwoPoints(
      INITIAL_Y_OFFSET_PIXELS,
      0,
      textAppearProgress
    ),
    scale: interpolateValueBetweenTwoPoints(
      INITIAL_SCALE,
      FINAL_SCALE,
      textAppearProgress
    ),
  };
};

/**
 * 데스크탑 Apple Watch 움직임 애니메이션 상태 생성
 */
export const createDesktopAppleWatchMovementAnimationState = (
  scrollProgress,
  deviceType
) => {
  if (checkIfCurrentDeviceIsMobileOrSmaller()) {
    return { translateX: 0 };
  }

  const watchMoveThreshold =
    DYNAMIC_BLACK_ANIMATION_CONFIG.ANIMATION_TRIGGER_THRESHOLDS
      .DESKTOP_APPLEWATCH_MOVE_START_AT_PROGRESS;

  if (scrollProgress < watchMoveThreshold) {
    return { translateX: 0 };
  }

  const moveProgress = calculateProgressWithinSpecificRange(
    scrollProgress,
    watchMoveThreshold,
    1.0
  );
  const easedProgress = calculateCubicEasingProgress(
    moveProgress,
    DYNAMIC_BLACK_ANIMATION_CONFIG.DESKTOP_APPLEWATCH_MOVEMENT
      .EASING_CURVE_THRESHOLD
  );
  const maxMoveDistance = calculateWatchDomMovementDistance(window.innerWidth);
  const currentTranslateX = maxMoveDistance * easedProgress;

  return { translateX: currentTranslateX };
};

/**
 * 고정 흰색 텍스트 색상 애니메이션 상태 생성
 */
export const createFixedWhiteTextColorAnimationState = (
  scrollProgress,
  deviceType
) => {
  return {
    textColor: '#ffffff',
    backgroundColor: '#000000',
  };
};
