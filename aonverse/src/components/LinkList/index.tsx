import clsx from "clsx";
import {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
  useMemo,
  useState,
} from "react";
import { matchPath, useLocation, useNavigate } from "react-router";
import { MotionBox } from "~/ui/motion";
import { childVariants, parentVariants } from "~/util/motion";
import { Box, BoxProps } from "~/ui";
import { CaretDownIcon } from "~/util/icons";

export const LinkListItem = (
  props: {
    link: string;
    children?: ReactNode;
    highlightPath?: string;
  } & BoxProps
) => {
  const { link, children, highlightPath, className, onClick, ...rest } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const selected = !!matchPath(highlightPath || link, location.pathname);

  return (
    <MotionBox
      className={clsx(
        "text-xl uppercase tracking-[3px] <lg:p-3",
        selected &&
          "text-[var(--color-accent)] hover:text-[var(--color-accent)] focus:text-[var(--color-accent)] cursor-pointer",
        className
      )}
      variants={childVariants({ fade: 1, slideY: 5 })}
      onClick={(e) => (onClick ? onClick(e) : navigate(link))}
      {...(rest as any)}
    >
      {children}
    </MotionBox>
  );
};

export function LinkList(props: { children?: ReactNode }) {
  const { children } = props;
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const selectedChild = useMemo(() => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return null;
      if (child.type !== LinkListItem) return null;
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
        className={clsx("gap-[32px] <lg:hidden")}
        variants={parentVariants({ stagger: 0.02 })}
      >
        {children}
      </MotionBox>
      <Box
        className="hidden <lg:flex bg-[var(--bg-caption)] p-3 rounded-lg flex-row justify-between items-center"
        onClick={() => setExpanded((x) => !x)}
      >
        {selectedChild}
        <CaretDownIcon className="h-[24px] w-[24px] text-[var(--color-accent)]" />
      </Box>
      <Box
        className={clsx(
          "backface-blur-sm bg-[var(--bg-caption)] absolute top-[100%] w-full transition-all overflow-hidden gap-[32px] hidden <lg:block",
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
