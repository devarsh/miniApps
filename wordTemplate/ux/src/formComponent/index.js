import React from "react";
import FormRenderer from "./renderer/formRenderer";
const FormikForm = ({ formMetaData }) => {
  return <FormRenderer formMetaData={formMetaData} />;
};

export default FormikForm;
