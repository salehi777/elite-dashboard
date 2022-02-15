import { theme as chakraUITheme } from "@chakra-ui/react";
// @ts-ignore
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import "@emotion/react";

const { theme: tailwindTheme } = resolveConfig(tailwindConfig);

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
