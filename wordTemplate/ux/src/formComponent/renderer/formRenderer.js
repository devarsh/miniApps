import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useFormik, FormikProvider } from "formik";
import makeSchemaFromTemplate from "./yupSchemaBuilder";
import useAsync, { AsyncProvider } from "../contexts/useAsync";
import { RenderProvider } from "../contexts/renderProvider";
import { SimpleFormRenderer } from "./variants/simpleFormRenderer";
import { GroupFormRenderer } from "./variants/groupFormRenderer";

const FormRenderer = ({ formMetaData }) => {
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
  const renderType = formMetaData["render"]["renderType"];
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <RenderProvider value={formMetaData["render"]}>
          <AsyncProvider value={asyncBag}>
            <FormikProvider value={formikBag}>
              {renderType === "groups" ? (
                <GroupFormRenderer
                  formMetaData={formMetaData}
                  asyncBag={asyncBag}
                  formikBag={formikBag}
                />
              ) : (
                <SimpleFormRenderer formMetaData={formMetaData} />
              )}
            </FormikProvider>
          </AsyncProvider>
        </RenderProvider>
      </MuiPickersUtilsProvider>
      <pre>{JSON.stringify(asyncBag, null, 2)}</pre>
      <pre>{JSON.stringify(formikBag, null, 2)}</pre>
    </>
  );
};

export default FormRenderer;
