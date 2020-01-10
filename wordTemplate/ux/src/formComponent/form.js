import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useFormik, FormikProvider } from "formik";
import metaDataRenderer from "./metaDataRenderer";
import makeSchemaFromTemplate from "./yupSchemaBuilder";
import useAsync from "./useAsync";
const FormikForm = ({ formMetaData }) => {
  const asyncBag = useAsync();
  const [validationSchema] = React.useState(() =>
    makeSchemaFromTemplate(formMetaData)
  );
  const formikBag = useFormik({
    initialValues: {},
    validationSchema
  });
  const fields = metaDataRenderer(formMetaData, formikBag, asyncBag);
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormikProvider value={formikBag}>{fields}</FormikProvider>
      </MuiPickersUtilsProvider>
      <pre>{JSON.stringify(asyncBag.errors, null, 2)}</pre>
      <pre>{JSON.stringify(formikBag, null, 2)}</pre>
    </>
  );
};

export default FormikForm;
