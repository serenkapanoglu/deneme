import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { Text } from "../Text";
import { XIcon } from "~/util/icons";
import { Box } from "../Box";

export type ChipProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
> & { onDelete?: () => void };

export const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const { className, children, onDelete, ...rest } = props;

  return (
    <div
      ref={ref}
      {...rest}
      className={clsx(
        "rounded-full bg-[var(--color-button)] text-[var(--color-button-text)] px-2 h-[44px] flex flex-row items-center",
        className
      )}
    >
      <Text className="px-2 w-full">{children}</Text>
      {onDelete && (
        <Box
          className="rounded-full w-[40px] h-[40px] flex flex-col items-center justify-center cursor-pointer"
          onClick={onDelete}
        >
          <XIcon />
        </Box>
      )}
    </div>
  );
});
