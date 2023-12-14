import clsx from "clsx";
import { ReactNode } from "react";
import {
  Popover as BasePopover,
  PopoverProps,
  ArrowContainer,
} from "react-tiny-popover";
import { Box, BoxProps } from "~/ui";

export function Popover(
  props: {
    content?: ReactNode;
    _Content?: BoxProps;
  } & Omit<PopoverProps, "content">
) {
  const { children, content, _Content, ...rest } = props;

  return (
    <BasePopover
      {...rest}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={"var(--bg-caption)"}
          arrowSize={10}
        >
          <Box
            {..._Content}
            className={clsx(
              "bg-[var(--bg-caption)] rounded-lg backdrop-blur-md",
              _Content?.className
            )}
          >
            {content}
          </Box>
        </ArrowContainer>
      )}
    >
      {children}
    </BasePopover>
  );
}
