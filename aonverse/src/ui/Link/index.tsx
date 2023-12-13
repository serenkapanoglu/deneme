import s from "./style.module.css";
import clsx from "clsx";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { forwardRef } from "react";

export type LinkProps = RouterLinkProps;

export const Link = forwardRef<any, LinkProps>((props, ref) => {
  const { className, ...rest } = props;
  return <RouterLink ref={ref} {...rest} className={clsx(s.root, className)} />;
});
