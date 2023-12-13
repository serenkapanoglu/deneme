import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ThemeContextValue = {
  mode: "light" | "dark";
  setMode: Dispatch<SetStateAction<"light" | "dark">>;
};

const ThemeContext = createContext<ThemeContextValue>({
  mode: "dark",
  setMode: () => {},
});

export const ThemeProvider = (props: { children?: ReactNode }) => {
  const { children } = props;

  const [mode, setMode] = useState<ThemeContextValue["mode"]>("dark");

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <style>
        {`
        :root {
          --size-header: 80px;
          --size-cover: 600px;
          --size-sidebar: 420px;
        `}
        {mode === "dark"
          ? `
          --bg1: #0f1f2b;
          --bg2: #1c2126;
          --bg-input: #ffffff11;
          --bg-caption: #000000aa;
          --color-text: #ffffff;
          --color-red: #cd2323;
          --color-yellow: #ffb800;
          --color-blue: #47aac4;
          --color-accent: #47aac4;
          --color-divider: #ffffff15;
          --color-hover: #ffffff09;
          --color-modal: black;
          --color-createpost: rgba(0, 0, 0, 0.9);
          --color-button: #ffffff;
          --color-button-text: #000000;
        `
          : `
          --bg1: #ffffff;
          --bg2: #cccccc;
          --bg-input: #00000011;
          --bg-caption: #eeeeeedd;
          --color-text: #222222;
          --color-red: #cd2323;
          --color-yellow: #ffb800;
          --color-blue: #47aac4;
          --color-accent: #47aac4;
          --color-divider: #00000015;
          --color-hover: #ffffff09;
          --color-modal: #000000bb;
          --color-button: #ffffff;
          --color-button-text: #000000;
        `}
        {`}`}
      </style>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
