"use client";

import { createTheme } from "@mui/material";

// Settings
import { Colors } from "../globalStyles";

const theme = createTheme({
  breakpoints: {
    //TODO: 반응형 지정 <- 나중에 MUI 반응형 쓸거면?
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "40px",

          "& .MuiInputBase-root": {
            borderRadius: "8px",
          },

          "& .Mui-focused": {
            borderWidth: 1,
            borderColor: Colors.Gray50,
          },

          "& input": {
            padding: "9px 18px 9px 13px",
          },

          "& fieldset": {
            borderColor: Colors.Gray50,

            "&:hover": {
              borderColor: Colors.Gray50,
            },
          },
        },
      },
    },
  },
});

export default theme;
