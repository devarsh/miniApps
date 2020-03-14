import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import Form from "./formComponent/index.js";
import formData from "./metaData/formMetaData.js";
import grey from "@material-ui/core/colors/grey";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900]
    },
    secondary: {
      main: grey[300]
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Form formMetaData={formData} />
  </ThemeProvider>,
  document.getElementById("⚛️")
);
