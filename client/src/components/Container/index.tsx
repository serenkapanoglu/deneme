import clsx from "clsx";
import { forwardRef } from "react";
import { Box, BoxProps } from "~/ui";

export const Container = forwardRef<
  HTMLDivElement,
  BoxProps & { size: number }
>((props, ref) => {
  const { children, className, style, size = 1600, ...rest } = props;
  return (
    <Box
      ref={ref}
      {...rest}
      className={clsx(
        "w-full border-box mx-auto flex flex-col <md:px-[20px] max-w-full",
        className
      )}
      style={{ maxWidth: size, ...style }}
    >
      {children}
    </Box>
  );
});
