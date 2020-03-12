import React from "react";
import FormRenderer from "./renderer/formRenderer";
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
const FormikForm = ({ formMetaData }) => {
  return (
    <ThemeProvider theme={theme}>
      <FormRenderer formMetaData={formMetaData} />
    </ThemeProvider>
  );
};

export default FormikForm;
