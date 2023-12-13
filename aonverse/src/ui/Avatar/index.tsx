import { forwardRef } from "react";
import { LoadingContainer } from "../../components/LoadingContainer";
import { Image, ImageProps } from "../Image";
import { BoxProps } from "../Box";
import clsx from "clsx";

export type AvatarProps = {
  src?: string;
  size?: number | string;
  defaultSrc?: string; // Add defaultSrc prop for the default profile picture
  _Image?: Omit<ImageProps, "src">;
} & BoxProps;

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { src, defaultSrc, className, size = 40, _Image, ...rest } = props;

  return (
    <LoadingContainer
      ref={ref}
      {...rest}
      className={clsx("rounded-full overflow-hidden", className)}
    >
      <Image
        src={src} // Use defaultSrc if src is not provided
        {..._Image}
        style={{ width: size, height: size, ..._Image?.style }}
        className={clsx("block", _Image?.className)}
      />
    </LoadingContainer>
  );
});
