// src/scripts/dom-handlers.js

import {
  updateDomElementCssProperty,
  applyGsapPropertiesToDomElement,
  queryDomElementBySelector,
} from './utils.js';

/**
 * 동적 검은색 Apple Watch 케이스 애니메이션 상태를 DOM 요소에 적용
 */
export const applyDynamicBlackAppleWatchCaseAnimationStateToDomElement = (
  appleWatchCaseElement,
  animationState
) => {
  if (!appleWatchCaseElement || !animationState) return false;

  let updateCount = 0;

  if (animationState.opacity !== undefined) {
    updateDomElementCssProperty(
      appleWatchCaseElement,
      'opacity',
      animationState.opacity
    );
    updateCount++;
  }

  if (animationState.backgroundColor) {
    updateDomElementCssProperty(
      appleWatchCaseElement,
      'background-color',
      animationState.backgroundColor
    );
    updateCount++;
  }

  if (animationState.dynamicEffect) {
    appleWatchCaseElement.classList.remove(
      'shimmer-effect',
      'apple-watch-transformed'
    );

    if (animationState.dynamicEffect === 'shimmer') {
      appleWatchCaseElement.classList.add('shimmer-effect');
    } else if (animationState.dynamicEffect === 'pulse+shimmer') {
      appleWatchCaseElement.classList.add('shimmer-effect');
    }
    updateCount++;
  }

  if (animationState.isTransforming !== undefined) {
    if (animationState.isTransforming) {
      appleWatchCaseElement.classList.add('apple-watch-transformed');
    }
    updateCount++;
  }

  if (animationState.scale !== undefined) {
    updateDomElementCssProperty(
      appleWatchCaseElement,
      '--applewatch-case-scale-multiplier',
      animationState.scale
    );
    updateCount++;
  }

  if (animationState.rotation !== undefined) {
    updateDomElementCssProperty(
      appleWatchCaseElement,
      '--applewatch-case-rotation-degrees',
      animationState.rotation + 'deg'
    );
    updateCount++;
  }

  if (animationState.crownOpacity !== undefined) {
    updateDomElementCssProperty(
      appleWatchCaseElement,
      '--watch-crown-opacity',
      animationState.crownOpacity
    );
    updateCount++;
  }

  if (animationState.buttonOpacity !== undefined) {
    updateDomElementCssProperty(
      appleWatchCaseElement,
      '--watch-button-opacity',
      animationState.buttonOpacity
    );
    updateCount++;
  }

  if (animationState.bandOpacity !== undefined) {
    updateDomElementCssProperty(
      appleWatchCaseElement,
      '--watch-band-opacity',
      animationState.bandOpacity
    );
    updateCount++;
  }

  return updateCount > 0;
};

/**
 * Apple Watch 애니메이션 상태를 DOM 요소에 적용
 */
export const applyAppleWatchAnimationStateToDomElement = (
  appleWatchElement,
  animationState
) => {
  if (!appleWatchElement || !animationState) return false;

  const gsapProperties = {};

  if (animationState.scale !== undefined) {
    gsapProperties.scale = animationState.scale;
  }

  if (animationState.translateX !== undefined) {
    gsapProperties.x = animationState.translateX;
  }

  if (animationState.translateY !== undefined) {
    gsapProperties.y = animationState.translateY;
  }

  return applyGsapPropertiesToDomElement(appleWatchElement, gsapProperties);
};

/**
 * Apple Watch Complications 애니메이션 상태를 DOM 요소에 적용
 */
export const applyAppleWatchComplicationsAnimationStateToDomElement = (
  complicationsDomElement,
  animationState
) => {
  if (!complicationsDomElement || !animationState) return false;

  const gsapProperties = {
    opacity: animationState.opacity || 0,
    x: animationState.translateX || 0,
    y: animationState.translateY || 0,
  };

  return applyGsapPropertiesToDomElement(
    complicationsDomElement,
    gsapProperties
  );
};

/**
 * Product Text DOM 애니메이션 상태를 DOM 요소에 적용
 */
export const applyProductTextDomAnimationStateToDomElement = (
  productTextDomElement,
  animationState,
  deviceType
) => {
  if (!productTextDomElement || !animationState) return false;

  const gsapProperties = {
    opacity: animationState.opacity || 0,
    y: animationState.translateY || 0,
    scale: animationState.scale || 0.7,
  };

  if (deviceType === 'desktop') {
    gsapProperties.x = animationState.translateX || -100;
    gsapProperties.left = '15%';
  } else {
    gsapProperties.x = 0;
    gsapProperties.left = 'auto';
  }

  return applyGsapPropertiesToDomElement(productTextDomElement, gsapProperties);
};

/**
 * 고정 흰색 색상 애니메이션 상태를 DOM 요소들에 적용
 */
export const applyFixedWhiteColorAnimationStateToDomElements = (
  colorAnimationState,
  deviceType
) => {
  const timeDisplayElement = queryDomElementBySelector('.time-display');
  const upperDateElement = queryDomElementBySelector('.upperDate');
  const watchScreenElement = queryDomElementBySelector('.watch-screen');

  let updateCount = 0;

  if (timeDisplayElement && colorAnimationState.textColor) {
    applyGsapPropertiesToDomElement(timeDisplayElement, {
      color: colorAnimationState.textColor,
    });
    updateCount++;
  }

  if (upperDateElement && colorAnimationState.textColor) {
    applyGsapPropertiesToDomElement(upperDateElement, {
      color: colorAnimationState.textColor,
    });
    updateCount++;
  }

  if (watchScreenElement && colorAnimationState.backgroundColor) {
    applyGsapPropertiesToDomElement(watchScreenElement, {
      backgroundColor: colorAnimationState.backgroundColor,
    });
    updateCount++;
  }

  return updateCount > 0;
};
