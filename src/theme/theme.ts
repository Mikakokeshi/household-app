import { createTheme } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import {
  PaletteColor,
  PaletteColorOptions,
  light,
} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  interface Palette {
    incomeColor: PaletteColor;
    expenseColor: PaletteColor;
    balanceColor: PaletteColor;
  }
  interface PaletteOptions {
    incomeColor?: PaletteColorOptions;
    expenseColor?: PaletteColorOptions;
    balanceColor?: PaletteColorOptions;
  }
}
export const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans JP, Roboto",
  },
  palette: {
    incomeColor: {
      main: blue[500],
      light: blue[500],
      dark: blue[700],
    },
    expenseColor: {
      main: red[500],
      light: red[500],
      dark: red[700],
    },
    balanceColor: {
      main: green[500],
      light: green[500],
      dark: green[700],
    },
  },
});
