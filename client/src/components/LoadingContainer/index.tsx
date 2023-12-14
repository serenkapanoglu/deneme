import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { SpinnerIcon } from "~/util/icons";

type LoadingContainerProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
> & { size?: number };

export const LoadingContainer = forwardRef<
  HTMLDivElement,
  LoadingContainerProps
>((props, ref) => {
  const { className, children, style, size = 20, ...rest } = props;

  return (
    <div
      ref={ref}
      {...rest}
      className={clsx("bg-[var(--bg2)] relative overflow-hidden", className)}
    >
      <SpinnerIcon
        className="absolute left-1/2 top-1/2 opacity-50"
        style={{ transform: "translate(-50%, -50%)", fontSize: size, ...style }}
      />
      <div className="relative z-1">{children}</div>
    </div>
  );
});
