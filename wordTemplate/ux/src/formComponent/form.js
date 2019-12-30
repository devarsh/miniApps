import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useFormik, FormikProvider } from "formik";
import metaDataRenderer from "./metaDataRenderer";
import makeSchemaFromTemplate from "./yupSchemaBuilder";

const FormikForm = ({ formMetaData }) => {
  const [validationSchema] = React.useState(() =>
    makeSchemaFromTemplate(formMetaData)
  );
  const formikBag = useFormik({
    initialValues: {},
    validationSchema
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