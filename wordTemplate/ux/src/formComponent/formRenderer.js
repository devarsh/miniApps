import React from "react";
import metaDataRenderer, {
  generateFieldGroupDepedency
} from "./metaDataRenderer";
import { setIn, getIn } from "formik";
import equal from "fast-deep-equal";

const FormGroup = React.memo(
  ({ groupMetaData, formikBag, asyncBag }) => {
    const count = React.useRef(0);
    const fields = metaDataRenderer(groupMetaData, formikBag, asyncBag);
    return (
      <>
        {fields}
        {count.current++}
      </>
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
    console.log(prevProps.groupName, oldValues, newValues, result);
    return result;
  }
);

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

export const FormRenderer = ({ formMetaData, formikBag, asyncBag }) => {
  const fields = metaDataRenderer(formMetaData.fields, formikBag, asyncBag);
  return <>{fields}</>;
};

export const FormGroupRenderer = ({ formMetaData, formikBag, asyncBag }) => {
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

export default FormRenderer;
