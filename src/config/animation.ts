export const TIMINGS = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  superSlow: 1.2
} as const;

export const EASING = {
  luxury: [0.25, 0.46, 0.45, 0.94],
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.26, 1.55]
} as const;

export const FRAMER_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: TIMINGS.normal, ease: EASING.luxury } },
    exit: { opacity: 0, transition: { duration: TIMINGS.fast } }
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: TIMINGS.normal, ease: EASING.luxury } }
  }
};

export const gsapPresets = {
  fadeIn: { opacity: 0, duration: 1, ease: "power2.out" }
};

export const pageTransition = FRAMER_VARIANTS.fadeIn;
export const loadingScreenVariants = FRAMER_VARIANTS.fadeIn;

export const ANIMATION_CONFIG = {
  timings: TIMINGS,
  easing: EASING,
  framerVariants: FRAMER_VARIANTS,
  gsapPresets,
  pageTransition,
  loadingScreenVariants,
} as const;

export default ANIMATION_CONFIG;
