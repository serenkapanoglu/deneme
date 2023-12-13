import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/Theme";
import RootRouter from "./routes";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <RootRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}
