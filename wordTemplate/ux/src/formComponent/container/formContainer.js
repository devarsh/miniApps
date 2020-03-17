import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import Paper from "@material-ui/core/Paper";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import makeSchemaFromTemplate from "formComponent/utils/yupSchemaBuilder";
import useAsync, { AsyncProvider } from "formComponent/context/useAsync";
import { RenderProvider } from "formComponent/context/renderProvider";
import {
  useFormManager,
  FormManagerProvider
} from "formComponent/context/formManager";
import { useFormik, FormikProvider } from "formik";
import { SimpleFormRenderer } from "formComponent/variants/simpleFormRenderer";
import FormToolBar from "./formToolBar";

const useStyles = makeStyles(
  theme =>
    console.log(theme) || {
      paper: {
        padding: `${theme.spacing(3)}px`,
        height: "calc(100vh - 48px - 48px - 48px - 15px)",
        overflow: "auto",
        display: "flex",
        flexDirection: "column"
      }
    }
);

const FormContainer = ({ formMetaData }) => {
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
  //const renderType = formMetaData["render"]["renderType"];
  const formName = formMetaData?.form?.name ?? "DEMO";
  const classes = useStyles();
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <RenderProvider value={formMetaData["render"]}>
          <FormManagerProvider value={formManagerBag}>
            <AsyncProvider value={asyncBag}>
              <FormikProvider value={formikBag}>
                <Paper square>
                  <FormToolBar
                    handleSubmit={formManagerBag.handleSubmit}
                    handleReset={formManagerBag.resetForm}
                    formName={formName}
                  />
                  <Paper variant="outlined" square className={classes.paper}>
                    <SimpleFormRenderer formMetaData={formMetaData} />
                  </Paper>
                </Paper>
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

export default FormContainer;
