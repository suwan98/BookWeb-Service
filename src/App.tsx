import "./App.css";
import Router from "./routes/Router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkMode } from "./recoil/atom";
import { DarkModeTheme, LightModeTheme } from "./theme/theme";
const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.background};
    color : ${(props) => props.theme.textColor};
    @font-face {
  font-family: "S-CoreDream-3Light";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
    font-family: 'S-CoreDream-3Light'
  }
`;

function App() {
  const isMode = useRecoilValue(isDarkMode);
  return (
    <>
      <ThemeProvider theme={isMode ? DarkModeTheme : LightModeTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
