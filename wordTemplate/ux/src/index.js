import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import Form from "./formComponent/index.js";
import formData from "./formComponent/metaData/formMetaData.js";
import FormContainer from "./formComponent/formContainer";

ReactDOM.render(
  <FormContainer>
    <Form formMetaData={formData} />
  </FormContainer>,
  document.getElementById("⚛️")
);
