import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
//import * as Yup from "yup";
import { useFormik, FormikProvider } from "formik";
import metaDataRenderer from "./metaDataRenderer";

const FormikForm = ({ formMetaData }) => {
  const formikBag = useFormik({
    initialValues: {}
  });
  const fields = metaDataRenderer(formMetaData, formikBag);
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormikProvider value={formikBag}>{fields}</FormikProvider>
      </MuiPickersUtilsProvider>
      <pre>{JSON.stringify(formikBag, null, 2)}</pre>
    </>
  );
};

export default FormikForm;
