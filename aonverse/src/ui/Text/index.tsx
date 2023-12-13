import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import s from "./style.module.css";
import clsx from "clsx";

export type TextProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export const Text = forwardRef<any, TextProps>((props, ref) => {
  const { className, ...rest } = props;
  return <span ref={ref} {...rest} className={clsx(s.root, className)} />;
});

export const MotionText = motion(Text);
