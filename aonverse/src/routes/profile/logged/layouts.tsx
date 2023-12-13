import clsx from "clsx";
import { aon } from "~/sdk";
import { Box, Text } from "~/ui";
import { MotionBox } from "~/ui/motion";
import { childVariants, parentVariants } from "~/util/motion";
import { Link } from "react-router-dom";


const layouts = [
  {
    id: "launch",
    name: "Launch layout",
    stars: 100,
    preview: (
      <svg viewBox="0 0 306 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="0.96875"
          y="0.826172"
          width="304.271"
          height="228.586"
          rx="8"
          stroke="white"
        />
        <rect x="19" y="24" width="73" height="79" rx="8" stroke="white" />
        <rect
          x="18.5547"
          y="112.443"
          width="266.811"
          height="78.7436"
          rx="8"
          stroke="white"
        />
        <rect
          x="102.037"
          y="23.7612"
          width="183.48"
          height="78.7436"
          rx="8"
          stroke="white"
        />
      </svg>
    ),
  },
  {
    id: "andromeda",
    name: "Andromeda",
    stars: 10,
    preview: (
      <svg viewBox="0 0 306 231" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="1.20508"
          y="1.01855"
          width="304.271"
          height="228.586"
          rx="8"
          stroke="white"
        />
        <rect
          x="131.172"
          y="28.5405"
          width="154.429"
          height="70.3341"
          rx="8"
          stroke="white"
        />
        <rect
          x="18.793"
          y="23.9536"
          width="96.3271"
          height="167.426"
          rx="8"
          stroke="white"
        />
        <rect
          x="131.172"
          y="112.636"
          width="159.781"
          height="78.7436"
          rx="8"
          stroke="white"
        />
      </svg>
    ),
  },
  {
    id: "kryptona",
    name: "Kryptona",
    stars: 900,
    preview: (
      <svg viewBox="0 0 306 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="0.734375"
          y="0.839844"
          width="304.271"
          height="228.586"
          rx="8"
          stroke="white"
        />
        <rect
          x="18.3184"
          y="19.9521"
          width="266.811"
          height="29.051"
          rx="8"
          stroke="white"
        />
        <rect
          x="18.3184"
          y="63.5288"
          width="168.19"
          height="127.672"
          rx="8"
          stroke="white"
        />
        <rect
          x="199.508"
          y="63.5288"
          width="90.9756"
          height="127.672"
          rx="8"
          stroke="white"
        />
      </svg>
    ),
  },
];

export default function LayoutsRoute() {
  const selectedLayout = aon.store((x) => x.layout || "launch");

  function setPreference(arg0: string): void {
    throw new Error("Function not implemented.");
    console.log(arg0)
  }

  return (
    <MotionBox
      className="py-[200px] px-[300px] <lg:px-[200px] gap-[40px] scale-150"
      variants={parentVariants({ stagger: 0.1 })}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
    >
      <MotionBox
        className="flex flex-row gap-3 flex-wrap"
        variants={parentVariants({ fade: 1, stagger: 0.04 })}
      >
        {layouts.map((layout) => (
           <MotionBox
            key={layout.id}
            className={clsx(
              "p-3 hover:bg-[var(--color-hover)] rounded-lg cursor-pointer w-[250px] max-w-[47%] flex flex-col gap-3 border-1 border-solid",
              selectedLayout === layout.id
                ? "border-[var(--color-accent)]"
                : "border-transparent"
            )}
            variants={childVariants({ fade: 1 })}
          >
            <Link to={`/your-link-path/${layout.id}`}>
              <Box className="flex flex-row items-center justify-between">
                <Text
                  className={clsx(
                    selectedLayout === layout.id && "text-[var(--color-accent)]"
                  )}
                >
                  {layout.name}
                </Text>
                <Text className="text-sm opacity-60">{layout.stars} stars</Text>
              </Box>
              {layout.preview}
            </Link>
          </MotionBox>
          
        ))}
      </MotionBox>
      <MotionBox
        className="flex flex-col gap-[20px]"
        variants={parentVariants({ fade: 1, stagger: 0.04 })}
      >
        <Text>Colors</Text>
        <Box className="flex flex-row flex-wrap gap-[20px]">
        <MotionBox
        className="text-center flex flex-col gap-[12px]"
        variants={childVariants({ fade: 1 })}
        >
        <Text>Theme</Text>
        <Link to="/set-background/theme">
          <Box
            className="rounded-full w-100px h-100px border-1 border-solid border-[var(--color-divider)] cursor-pointer"
            onClick={() => setPreference("theme")}
          />
        </Link>
        <Text className="text-sm opacity-60">Dark</Text>
      </MotionBox>
      <MotionBox
        className="text-center flex flex-col gap-[12px]"
        variants={childVariants({ fade: 1 })}
        >
        <Text>Primary</Text>
        <Link to="/set-background/theme">
          <Box
            className="rounded-full w-100px h-100px border-1 border-solid border-[var(--color-divider)] cursor-pointer"
            style={{ background: "#ffffff" }}
            onClick={() => setPreference("theme")}
          />
        </Link>
        <Text className="text-sm opacity-60">Primary</Text>
      </MotionBox>
      <MotionBox
        className="text-center flex flex-col gap-[12px]"
        variants={childVariants({ fade: 1 })}
        >
        <Text>Blue</Text>
        <Link to="/set-background/theme">
          <Box
            className="rounded-full w-100px h-100px border-1 border-solid border-[var(--color-divider)] cursor-pointer"
            style={{ background: "#4bb7ff" }}
            onClick={() => setPreference("theme")}
          />
        </Link>
        <Text className="text-sm opacity-60">Blue</Text>
      </MotionBox>
      <MotionBox
        className="text-center flex flex-col gap-[12px]"
        variants={childVariants({ fade: 1 })}
        >
        <Text>Accent</Text>
        <Link to="/set-background/theme">
          <Box
            className="rounded-full w-100px h-100px border-1 border-solid border-[var(--color-divider)] cursor-pointer"
            style={{ background: "#888" }}
            onClick={() => setPreference("theme")}
          />
        </Link>
        <Text className="text-sm opacity-60">Blue</Text>
      </MotionBox>
      <MotionBox
        className="text-center flex flex-col gap-[12px]"
        variants={childVariants({ fade: 1 })}
        >
        <Text>Helvetica</Text>
        <Link to="/set-background/theme">
          <Box
            className="rounded-full w-100px h-100px border-1 border-solid border-[var(--color-divider)] cursor-pointer"
            style={{ background: "#7b4747" }}
            onClick={() => setPreference("theme")}
          />
        </Link>
        <Text className="text-sm opacity-60">Helvetica</Text>
      </MotionBox>
          

        </Box>
      </MotionBox>
    </MotionBox>
  );
}
