import React from "react";
import metaDataRenderer, {
  generateFieldGroupDepedency
} from "./metaDataRenderer";

const FormGroup = React.memo(
  ({ groupMetaData, groupDepedency, formikBag, asyncBag }) => {
    const fields = metaDataRenderer(groupMetaData, formikBag, asyncBag);
    return <>{fields}</>;
  },
  (prevProps, nextProps) => {
    return true;
  }
);

export const FormRenderer = ({ formMetaData, formikBag, asyncBag }) => {
  const fields = metaDataRenderer(formMetaData.fields, formikBag, asyncBag);
  return <>{fields}</>;
};

export const FormGroupRenderer = ({ formMetaData, formikBag, asyncBag }) => {
  const { fieldGroups } = formMetaData;
  const groupMetaDataRef = React.useRef(null);
  if (!Array.isArray(fieldGroups)) {
    console.log("No property of form.fieldGroup exists in Meta Data");
    return;
  }
  function getInstance() {
    let instance = groupMetaDataRef.current;
    if (instance !== null) {
      return instance;
    }
    let newInstance = generateFieldGroupDepedency(formMetaData);
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
    return;
  }
  let result = fieldGroups.map(group => (
    <FormGroup
      key={group}
      groupMetaData={groupWiseFields[group]}
      groupDepedency={groupFieldDepedency[group]}
      formikBag={formikBag}
      asyncBag={asyncBag}
    />
  ));
  return <>{result}</>;
};

export default FormRenderer;
