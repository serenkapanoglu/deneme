import clsx from "clsx";
import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

export type ImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function Image(props: ImageProps) {
  const { className } = props;

  const elRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setLoaded] = useState(false);

  //listen for load
  useEffect(() => {
    if (elRef.current?.complete) setLoaded(true);
    const listener = () => {
      setLoaded(true);
    };
    elRef.current?.addEventListener("load", listener);
    return () => elRef.current?.removeEventListener("load", listener);
  }, [elRef]);

  return (
    <img
      ref={elRef}
      {...props}
      className={clsx(
        "transition-all duration-300 block",
        isLoaded ? "opacity-100" : "opacity-0",
        "object-cover", // Add this class for object-fit: cover
        className
      )}
    />
  );
}
