import { AnimatePresence } from "framer-motion";
import { matchPath, useLocation } from "react-router";
import { MotionBox } from "~/ui/motion";
import { parentVariants } from "~/util/motion";
import { ComponentProps, ReactNode } from "react";
import { chain, first } from "lodash";
import clsx from "clsx";

export const RouteSwitch = (
  props: {
    routes: { key: string; patterns: string[]; Component: () => ReactNode }[];
  } & ComponentProps<typeof MotionBox>
) => {
  const { routes, className, ...rest } = props;

  const location = useLocation();
  const matched = chain(routes)
    .filter((x) => x.patterns.some((x) => matchPath(x, location.pathname)))
    .value();

  const route = first(matched);

  return (
    <AnimatePresence mode="wait">
      {route && (
        <MotionBox
          key={route.key}
          variants={parentVariants({ fade: 1 })}
          initial="initial"
          animate="animate"
          exit="exit"
          {...rest}
          className={clsx("flex flex-col", className)}
        >
          <route.Component />
        </MotionBox>
      )}
    </AnimatePresence>
  );
};
