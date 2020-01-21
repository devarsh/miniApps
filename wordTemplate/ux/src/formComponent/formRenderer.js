import React from "react";
import MetaDataRenderer from "./metaDataRenderer";
import { setIn, getIn } from "formik";
import equal from "fast-deep-equal";
import useAsync from "./useAsync";
import { useFormik, FormikProvider } from "formik";
import makeSchemaFromTemplate from "./yupSchemaBuilder";
import { RenderProvider } from "./renderProvider";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const constructValues = (dependency, formikBag, asyncBag) => {
  if (!Array.isArray(dependency)) {
    return {};
  }
  let newObj = { values: {}, errors: {}, touched: {}, async: {} };
  for (let i = 0; i < dependency.length; i++) {
    const key = dependency[i];
    const value = getIn(formikBag.values, key);
    const error = getIn(formikBag.errors, key);
    const touched = getIn(formikBag.touched, key);
    const async = getIn(asyncBag.errors, key);
    newObj.values = setIn(newObj.values, key, value);
    newObj.errors = setIn(newObj.errors, key, error);
    newObj.touched = setIn(newObj.touched, key, touched);
    newObj.async = setIn(newObj.async, key, async);
  }
  return newObj;
};

export const generateFieldGroupDepedency = fields => {
  const groupFieldDepedency = {};
  const groupWiseFields = {};
  if (Array.isArray(fields)) {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const { group, name, watch } = field;
      if (groupFieldDepedency[group] instanceof Set) {
        groupFieldDepedency[group].add(name);
      } else {
        groupFieldDepedency[group] = new Set([name]);
      }
      if (!!watch) {
        groupFieldDepedency[group].add(watch);
      }
      if (Array.isArray(groupWiseFields[group])) {
        groupWiseFields[group].push(field);
      } else {
        groupWiseFields[group] = [field];
      }
    }
  }
  const keys = Object.keys(groupFieldDepedency);
  for (let i = 0; i < keys.length; i++) {
    groupFieldDepedency[keys[i]] = Array.from(groupFieldDepedency[keys[i]]);
  }
  return { groupFieldDepedency, groupWiseFields };
};

const FormGroup = React.memo(
  ({ groupMetaData, formikBag, asyncBag }) => {
    return (
      <MetaDataRenderer
        fieldMetaData={groupMetaData}
        formikBag={formikBag}
        asyncBag={asyncBag}
      />
    );
  },
  (prevProps, nextProps) => {
    const oldValues = constructValues(
      prevProps.groupDepedency,
      prevProps.formikBag,
      prevProps.asyncBag
    );
    const newValues = constructValues(
      nextProps.groupDepedency,
      nextProps.formikBag,
      nextProps.asyncBag
    );
    const result = equal(oldValues, newValues);
    return result;
  }
);

const SimpleFormRenderer = ({ formMetaData, formikBag, asyncBag }) => (
  <MetaDataRenderer
    fieldMetaData={formMetaData.fields}
    formikBag={formikBag}
    asyncBag={asyncBag}
  />
);

const FormGroupRenderer = ({ formMetaData, formikBag, asyncBag }) => {
  const { form, fields } = formMetaData;
  const groupMetaDataRef = React.useRef(null);
  if (!Array.isArray(form.fieldGroups)) {
    console.log("No property of form.fieldGroup exists in Meta Data");
    return null;
  }
  function getInstance() {
    let instance = groupMetaDataRef.current;
    if (instance !== null) {
      return instance;
    }
    let newInstance = generateFieldGroupDepedency(fields);
    groupMetaDataRef.current = newInstance;
    return newInstance;
  }
  const transformedMetaData = getInstance();
  const { groupFieldDepedency, groupWiseFields } = transformedMetaData;
  if (
    typeof groupFieldDepedency !== "object" &&
    typeof groupWiseFields !== "object"
  ) {
    console.log(
      `error tranforming the meta data
      groupFieldDepedency=${groupFieldDepedency}
      groupWiseFields=${groupFieldDepedency}
      formMetaData=${groupFieldDepedency}`
    );
    return null;
  }
  let result = form.fieldGroups.map(group => (
    <FormGroup
      key={group}
      groupName={group}
      groupMetaData={groupWiseFields[group]}
      groupDepedency={groupFieldDepedency[group]}
      formikBag={formikBag}
      asyncBag={asyncBag}
    />
  ));
  return <>{result}</>;
};

const FormRenderer = ({ formMetaData, renderType }) => {
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
        <RenderProvider value={formMetaData["render"]}>
          <FormikProvider value={formikBag}>
            {renderType === "grid" ? (
              <FormGroupRenderer
                formMetaData={formMetaData}
                asyncBag={asyncBag}
                formikBag={formikBag}
              />
            ) : (
              <SimpleFormRenderer
                formMetaData={formMetaData}
                asyncBag={asyncBag}
                formikBag={formikBag}
              />
            )}
          </FormikProvider>
        </RenderProvider>
      </MuiPickersUtilsProvider>
      <pre>{JSON.stringify(asyncBag, null, 2)}</pre>
      <pre>{JSON.stringify(formikBag, null, 2)}</pre>
    </>
  );
};

export default FormRenderer;
