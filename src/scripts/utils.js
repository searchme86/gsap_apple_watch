// src/scripts/utils.js

import { DYNAMIC_BLACK_ANIMATION_CONFIG } from './config.js';

/**
 * 값을 최솟값과 최댓값 사이로 제한하는 함수
 */
export const clampValueBetweenMinAndMax = (
  currentValue,
  minimumValue,
  maximumValue
) => {
  return Math.max(minimumValue, Math.min(currentValue, maximumValue));
};

/**
 * 특정 범위 내에서의 진행률을 계산하는 함수
 */
export const calculateProgressWithinSpecificRange = (
  currentValue,
  rangeStartValue,
  rangeEndValue
) => {
  if (currentValue <= rangeStartValue) return 0;
  if (currentValue >= rangeEndValue) return 1;
  return (currentValue - rangeStartValue) / (rangeEndValue - rangeStartValue);
};

/**
 * 두 값 사이에서 선형 보간하는 함수
 */
export const interpolateValueBetweenTwoPoints = (
  startingValue,
  endingValue,
  progressRatio
) => {
  return startingValue + (endingValue - startingValue) * progressRatio;
};

/**
 * 큐빅 베지어 곡선 이징 함수
 */
export const calculateCubicEasingProgress = (
  linearProgress,
  easingThreshold = 0.5
) => {
  return linearProgress < easingThreshold
    ? 4 * linearProgress * linearProgress * linearProgress
    : 1 - Math.pow(-2 * linearProgress + 2, 3) / 2;
};

/**
 * 사인파 회전 계산 함수
 */
export const calculateSineWaveRotation = (progress, maxRotationDegrees) => {
  return Math.sin(progress * Math.PI) * maxRotationDegrees;
};

/**
 * DOM 요소의 텍스트 내용을 업데이트하는 함수
 */
export const updateDomElementTextContent = (elementId, newTextValue) => {
  const targetElement = document.getElementById(elementId);
  if (targetElement && newTextValue !== undefined) {
    targetElement.textContent = newTextValue;
    return true;
  }
  return false;
};

/**
 * DOM 요소의 CSS 속성을 업데이트하는 함수
 */
export const updateDomElementCssProperty = (
  domElement,
  cssPropertyName,
  cssPropertyValue
) => {
  if (domElement && cssPropertyName && cssPropertyValue !== undefined) {
    domElement.style.setProperty(cssPropertyName, cssPropertyValue);
    return true;
  }
  return false;
};

/**
 * GSAP 속성을 DOM 요소에 적용하는 함수
 */
export const applyGsapPropertiesToDomElement = (
  domElement,
  gsapPropertiesObject
) => {
  if (domElement && gsapPropertiesObject) {
    gsap.set(domElement, gsapPropertiesObject);
    return true;
  }
  return false;
};

/**
 * ID로 DOM 요소를 가져오는 함수
 */
export const getDomElementById = (elementId) => {
  return document.getElementById(elementId);
};

/**
 * CSS 셀렉터로 DOM 요소를 쿼리하는 함수
 */
export const queryDomElementBySelector = (cssSelector) => {
  return document.querySelector(cssSelector);
};

/**
 * 현재 디바이스 타입을 감지하는 함수
 */
export const detectCurrentDeviceTypeBasedOnWindowWidth = (
  windowWidthPixels = window.innerWidth
) => {
  const {
    SMALL_MOBILE_DEVICE_MAX_WIDTH_PIXELS,
    MOBILE_DEVICE_MAX_WIDTH_PIXELS,
  } = DYNAMIC_BLACK_ANIMATION_CONFIG.RESPONSIVE_DEVICE_BREAKPOINTS;

  if (windowWidthPixels <= SMALL_MOBILE_DEVICE_MAX_WIDTH_PIXELS) {
    return 'small-mobile';
  }
  if (windowWidthPixels <= MOBILE_DEVICE_MAX_WIDTH_PIXELS) {
    return 'mobile';
  }
  return 'desktop';
};

/**
 * 모바일 디바이스 여부를 확인하는 함수
 */
export const checkIfCurrentDeviceIsMobileOrSmaller = (
  windowWidthPixels = window.innerWidth
) => {
  return (
    windowWidthPixels <=
    DYNAMIC_BLACK_ANIMATION_CONFIG.RESPONSIVE_DEVICE_BREAKPOINTS
      .MOBILE_DEVICE_MAX_WIDTH_PIXELS
  );
};

/**
 * 소형 모바일 디바이스 여부를 확인하는 함수
 */
export const checkIfCurrentDeviceIsSmallMobile = (
  windowWidthPixels = window.innerWidth
) => {
  return (
    windowWidthPixels <=
    DYNAMIC_BLACK_ANIMATION_CONFIG.RESPONSIVE_DEVICE_BREAKPOINTS
      .SMALL_MOBILE_DEVICE_MAX_WIDTH_PIXELS
  );
};

/**
 * 반응형 시작점을 가져오는 함수
 */
export const getResponsiveStartPoint = () => {
  const deviceType = detectCurrentDeviceTypeBasedOnWindowWidth();
  const { SMALL_MOBILE_START, MOBILE_START, DESKTOP_START } =
    DYNAMIC_BLACK_ANIMATION_CONFIG.RESPONSIVE_START_POINTS;

  const deviceStartPointMap = new Map([
    ['small-mobile', SMALL_MOBILE_START],
    ['mobile', MOBILE_START],
    ['desktop', DESKTOP_START],
  ]);

  return deviceStartPointMap.get(deviceType) || DESKTOP_START;
};

/**
 * 섹션의 최적 높이를 계산하는 함수
 */
export const calculateOptimalSectionHeight = (currentWindowWidth) => {
  const {
    REFERENCE_SCREEN_WIDTH_PIXELS,
    REFERENCE_SCREEN_HEIGHT_PIXELS,
    MINIMUM_SECTION_HEIGHT_PIXELS,
  } = DYNAMIC_BLACK_ANIMATION_CONFIG.SCROLL_HEIGHT_CALCULATION;

  const calculatedAspectRatioHeight =
    (currentWindowWidth / REFERENCE_SCREEN_WIDTH_PIXELS) *
    REFERENCE_SCREEN_HEIGHT_PIXELS;
  const finalOptimalHeight = Math.max(
    calculatedAspectRatioHeight,
    MINIMUM_SECTION_HEIGHT_PIXELS
  );
  return Math.round(finalOptimalHeight);
};

/**
 * ScrollTrigger 종료값을 계산하는 함수
 */
export const calculateScrollTriggerEndValue = (sectionHeightPixels) => {
  const { SCROLL_END_POINT_HEIGHT_MULTIPLIER } =
    DYNAMIC_BLACK_ANIMATION_CONFIG.SCROLL_HEIGHT_CALCULATION;
  const endPointHeight = Math.round(
    sectionHeightPixels * SCROLL_END_POINT_HEIGHT_MULTIPLIER
  );
  return `+=${endPointHeight}px`;
};

/**
 * 워치 이동 거리를 계산하는 함수
 */
export const calculateWatchDomMovementDistance = (windowWidthPixels) => {
  const { MOVE_DISTANCE_MULTIPLIER } =
    DYNAMIC_BLACK_ANIMATION_CONFIG.DESKTOP_APPLEWATCH_MOVEMENT;
  return windowWidthPixels * MOVE_DISTANCE_MULTIPLIER;
};
