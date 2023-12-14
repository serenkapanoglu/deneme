import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";
import s from "./style.module.css";
import clsx from "clsx";

type DivProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
>;
export type BoxProps = DivProps;

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div ref={ref} {...rest} className={clsx(s.root, className)}>
      {children}
    </div>
  );
});
