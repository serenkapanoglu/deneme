import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import s from "./style.module.css";
import clsx from "clsx";

export type CenterProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Center = forwardRef<any, CenterProps>((props, ref) => {
  const { className, ...rest } = props;
  return <div ref={ref} {...rest} className={clsx(s.root, className)} />;
});

export const MotionCenter = motion(Center);
