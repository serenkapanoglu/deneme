import clsx from "clsx";
import {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
  useMemo,
  useState,
} from "react";
import { matchPath, useLocation } from "react-router";
import { Box } from "~/ui";
import { MotionBox, MotionLink } from "~/ui/motion";
import { CaretDownIcon } from "~/util/icons";
import { childVariants, parentVariants } from "~/util/motion";

export const LinkTab = (props: {
  link: string;
  children?: ReactNode;
  highlightPath?: string;
}) => {
  const { link, children, highlightPath } = props;
  const location = useLocation();

  const selected = !!matchPath(highlightPath || link, location.pathname);

  return (
    <Box className={clsx(selected ? "opacity-100" : "opacity-60")}>
      <MotionLink
        to={link}
        className={clsx("text-lg uppercase tracking-[2px] <md:p-3")}
        variants={childVariants({ fade: 1, slideX: 5 })}
      >
        {children}
      </MotionLink>
    </Box>
  );
};

export function LinkTabs(props: { children?: ReactNode }) {
  const { children } = props;
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const selectedChild = useMemo(() => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return null;
      if (child.type !== LinkTab) return null;
      const selected = !!matchPath(
        child.props.highlightPath || child.props.link,
        location.pathname
      );
      if (!selected) return null;
      //@ts-ignore
      return cloneElement(child, { onClick: () => {} });
    })?.filter((x) => !!x)[0];
  }, [children, location.pathname]);
  return (
    <Box className="relative">
      <MotionBox
        className="flex flex-row items-center gap-[32px] <md:hidden"
        variants={parentVariants({ stagger: 0.04 })}
      >
        {children}
      </MotionBox>
      <Box
        className="hidden <md:flex rounded-lg flex-row justify-between items-center"
        onClick={() => setExpanded((x) => !x)}
      >
        {selectedChild}
        <CaretDownIcon className="h-[24px] w-[24px]" />
      </Box>
      <Box
        className={clsx(
          "backface-blur-sm bg-[var(--bg-caption)] absolute top-[100%] right-[0px] w-full transition-all overflow-hidden min-w-[200px] gap-[32px] z-49 rounded-lg",
          expanded ? "h-auto" : "h-0"
        )}
        onClick={() => {
          setExpanded((x) => !x);
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
