import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";
import s from "./style.module.css";
import clsx from "clsx";

export type ButtonProps = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { variant?: "contained" | "outlined" | "text" };

export const Button = forwardRef<any, ButtonProps>((props, ref) => {
  const { className, variant = "contained", ...rest } = props;
  return (
    <button
      ref={ref}
      {...rest}
      className={clsx(s.root, s[variant], className)}
    />
  );
});
