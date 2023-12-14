import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
} from "react";
import s from "./style.module.css";
import clsx from "clsx";

export type FieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Field = forwardRef<any, FieldProps>((props, ref) => {
  const { className, ...rest } = props;
  return <input ref={ref} {...rest} className={clsx(s.root, className)} />;
});

export type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const TextArea = forwardRef<any, TextAreaProps>((props, ref) => {
  const { className, ...rest } = props;
  return <textarea ref={ref} {...rest} className={clsx(s.root, className)} />;
});
