import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useFormik, FormikProvider } from "formik";
import makeSchemaFromTemplate from "../utils/yupSchemaBuilder";
import useAsync, { AsyncProvider } from "../context/useAsync";
import { RenderProvider } from "../context/renderProvider";
import { useFormManager, FormManagerProvider } from "../context/formManager";
import { SimpleFormRenderer } from "./variants/simpleFormRenderer";
/*import { GroupFormRenderer } from "./variants/groupFormRenderer";*/
import FormToolBar from "./formToolBar";

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
  const formManagerBag = useFormManager(formikBag, asyncBag);
  const renderType = formMetaData["render"]["renderType"];
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <RenderProvider value={formMetaData["render"]}>
          <FormManagerProvider value={formManagerBag}>
            <AsyncProvider value={asyncBag}>
              <FormikProvider value={formikBag}>
                <FormToolBar
                  handleSubmit={formManagerBag.handleSubmit}
                  handleReset={formManagerBag.resetForm}
                  handleEditMode={formManagerBag.setfieldState}
                  editState={formManagerBag.fieldState}
                >
                  {renderType === "groups" ? (
                    <SimpleFormRenderer formMetaData={formMetaData} />
                  ) : (
                    <SimpleFormRenderer formMetaData={formMetaData} />
                  )}
                </FormToolBar>
              </FormikProvider>
            </AsyncProvider>
          </FormManagerProvider>
        </RenderProvider>
      </MuiPickersUtilsProvider>
      <pre>{JSON.stringify(asyncBag, null, 2)}</pre>
      <pre>{JSON.stringify(formikBag, null, 2)}</pre>
    </>
  );
};

export default FormRenderer;
