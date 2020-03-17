import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import FormContainer from "./formComponent/container/formContainer";
import formData from "./metaData";
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
    <FormContainer formMetaData={formData} />
  </ThemeProvider>,
  document.getElementById("⚛️")
);
