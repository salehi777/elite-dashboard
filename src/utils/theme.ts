import { theme as chakraTheme } from "@chakra-ui/react";
// @ts-ignore
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const { theme: tailwindTheme } = resolveConfig(tailwindConfig);

// console.log("tailwindTheme", tailwindTheme);

export const theme = {
  ...chakraTheme,
  colors: tailwindTheme.colors,
  blur: tailwindTheme.blur,
  space: tailwindTheme.space,
};
