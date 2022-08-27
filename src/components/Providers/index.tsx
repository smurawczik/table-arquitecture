import { FC } from "react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import { teal } from "@mui/material/colors";

export const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: teal["400"],
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};
