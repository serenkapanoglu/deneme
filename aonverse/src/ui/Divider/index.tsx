import { forwardRef } from "react";
import { Box, BoxProps } from "../";
import clsx from "clsx";

export type DividerProps = BoxProps;

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function (
  props,
  ref
) {
  const { className, children, ...rest } = props;

  return (
    <Box
      ref={ref}
      {...rest}
      className={clsx(
        "h-[1px] w-full self-stretch bg-[var(--color-divider)]",
        className
      )}
    >
      {children}
    </Box>
  );
});
