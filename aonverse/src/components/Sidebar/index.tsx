import { aon } from "~/sdk";
import { Box, BoxProps } from "~/ui";
import clsx from "clsx";
import { ReactNode } from "react";

type SidebarProps = BoxProps & {
  side?: "left" | "right";
  sidebarContent?: ReactNode;
  collapsible?: boolean;
};

export default function Sidebar(props: SidebarProps) {
  const {
    side = "left",
    className,
    sidebarContent,
    children,
    collapsible,
    ...rest
  } = props;

  const headerMomentum = aon.state((x) => x.header.momentum);

  return (
    <Box
      {...rest}
      className={clsx(
        "flex-1 relative <lg:p-0",
        side === "left" &&
          `<2xl:pr-[20px] pl-[var(--size-sidebar)] ${
            collapsible ? "<2xl:pl-0" : ""
          }`,
        side === "right" &&
          `<2xl:pl-[20px] pr-[var(--size-sidebar)] ${
            collapsible ? "<2xl:pr-0" : ""
          }`,
        className
      )}
    >
      {/* Sidebar */}
      <Box
        className={clsx(
          "absolute w-[var(--size-sidebar)] h-full top-0 z-20 <lg:static <lg:p-0 <lg:w-full <lg:h-auto",
          side === "left" && "left-0",
          side === "right" && "right-0",
          collapsible && "<xl:hidden"
        )}
      >
        <Box
          className="box-border p-[40px] sticky gap-[40px] <lg:static transition-all duration-200 ease-in-out <lg:p-[20px]"
          style={{
            top: headerMomentum === "up" ? "var(--size-header)" : "0",
          }}
        >
          {/* Sidebar Content */}
          {sidebarContent}
        </Box>
      </Box>

      {/* Page Content */}
      {children}
    </Box>
  );
}
