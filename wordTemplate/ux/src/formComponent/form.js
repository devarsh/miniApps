import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import useAsync from "./useAsync";
import { useFormik, FormikProvider } from "formik";
import makeSchemaFromTemplate from "./yupSchemaBuilder";

import FormRenderer from "./formRenderer";
const FormikForm = ({ formMetaData }) => {
  const validationSchemaRef = React.useRef(null);
  function getInstance() {
    let instance = validationSchemaRef.current;
    if (instance !== null) {
      return instance;
    }
    let newInstance = makeSchemaFromTemplate(formMetaData.fields);
    validationSchemaRef.current = newInstance;
    return newInstance;
  }
  const validationSchema = getInstance();
  const asyncBag = useAsync();
  const formikBag = useFormik({
    initialValues: {},
    validationSchema
  });
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormikProvider value={formikBag}>
          <FormRenderer
            formMetaData={formMetaData}
            asyncBag={asyncBag}
            formikBag={formikBag}
          />
        </FormikProvider>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default FormikForm;
