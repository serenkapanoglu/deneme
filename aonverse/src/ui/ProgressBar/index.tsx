import { forwardRef } from "react";
import { Box, BoxProps } from "../";
import clsx from "clsx";

export type ProgressBarProps = BoxProps & { progress?: number };

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  function (props, ref) {
    const { className, children, progress, ...rest } = props;

    return (
      <Box
        ref={ref}
        {...rest}
        className={clsx(
          "border-solid border-1 border-[var(--color-button)] rounded-full h-[16px] relative overflow-hidden",
          className
        )}
      >
        <Box
          className="absolute left-0 top-0 bottom-0 bg-[var(--color-button)]"
          style={{ width: `${progress}%` }}
        />
      </Box>
    );
  }
);
