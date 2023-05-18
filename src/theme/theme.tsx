import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    textColor: string;
    accentColor: string;
    HeaderBgColor: string;
    FooterBgColor: string;
  }
}

export const DarkModeTheme: DefaultTheme = {
  background: "linear-gradient(135deg, #434343 0%, black 100%)",
  textColor: "#f8f8f8",
  accentColor: "#1abc9c",
  HeaderBgColor:
    "(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 100%);",
  FooterBgColor:
    "(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 100%);",
};

export const LightModeTheme: DefaultTheme = {
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  textColor: " #202020",
  accentColor: "#5DADEC",
  HeaderBgColor: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  FooterBgColor: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%",
};
