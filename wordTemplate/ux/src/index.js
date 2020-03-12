import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import Form from "./formComponent/index.js";
import formData from "./formComponent/metaData/formMetaData.js";

ReactDOM.render(
  <Form formMetaData={formData} />,
  document.getElementById("⚛️")
);
