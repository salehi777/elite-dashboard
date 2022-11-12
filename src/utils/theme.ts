import { theme as chakraUITheme } from "@chakra-ui/react";
// @ts-ignore
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";
import "@emotion/react";

let { theme: tailwindTheme } = resolveConfig(tailwindConfig);
tailwindTheme = tailwindTheme || {};
declare module "@emotion/react" {
  export interface Theme {
    colors: any;
  }
}

export const chakraTheme = {
  ...chakraUITheme,
  colors: tailwindTheme.colors,
  blur: tailwindTheme.blur,
  space: tailwindTheme.space,
};

export { tailwindTheme };
