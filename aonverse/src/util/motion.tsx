import { Variants, motion } from "framer-motion";

export const MotionDiv = motion.div;
export const MotionImg = motion.img;

export const staggerParentVariants = (
  stagger: number = 0.1,
  reverse?: boolean
): Variants => ({
  initial: {},
  animate: {
    transition: {
      when: "beforeChildren",
      staggerChildren: stagger,
      staggerDirection: reverse ? -1 : 1,
    },
  },
  exit: {
    transition: {
      when: "afterChildren",
      staggerChildren: stagger,
      staggerDirection: reverse ? 1 : -1,
    },
  },
});

export const slideUpAndFadeVariants = (
  slideAmt: number | string = 10
): Variants => ({
  initial: { opacity: 0, translateY: slideAmt },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: slideAmt },
});

export const scaleUpAndFadeVariants = (scaleAmt: number = 0.1): Variants => ({
  initial: { opacity: 0, scale: 1 - scaleAmt },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1 - scaleAmt },
});

export const parentVariants = (options?: {
  fade?: number;
  duration?: number;
  stagger?: number;
  reverse?: boolean;
}) => ({
  initial: {
    opacity: 1 - (options?.fade || 0),
  },
  animate: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: options?.duration === undefined ? 0.2 : options.duration,
      staggerChildren: options?.stagger,
      staggerDirection: options?.reverse ? -1 : 1,
    },
  },
  exit: {
    opacity: 1 - (options?.fade || 0),
    transition: {
      when: "afterChildren",
      duration: options?.duration === undefined ? 0.2 : options.duration,
      staggerChildren: options?.stagger,
      staggerDirection: options?.reverse ? 1 : -1,
    },
  },
});

export const childVariants = (options?: {
  fade?: number;
  scale?: number;
  slideY?: number;
  slideX?: number;
  duration?: number;
}): Variants => ({
  initial: {
    opacity: 1 - (options?.fade || 0),
    scale: 1 - (options?.scale || 0),
    translateY: options?.slideY || 0,
    translateX: options?.slideX || 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    translateY: 0,
    translateX: 0,
    transition: { duration: options?.duration },
  },
  exit: {
    opacity: 1 - (options?.fade || 0),
    scale: 1 - (options?.scale || 0),
    translateY: options?.slideY || 0,
    translateX: options?.slideX || 0,
    transition: { duration: options?.duration },
  },
});
