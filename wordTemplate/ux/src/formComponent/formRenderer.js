import React from "react";
import MetaDataRenderer from "./metaDataRenderer";
import { setIn, getIn } from "formik";
import equal from "fast-deep-equal";
import useAsync from "./useAsync";
import { useFormik, FormikProvider } from "formik";
import makeSchemaFromTemplate from "./yupSchemaBuilder";
import { RenderProvider, RenderContext } from "./renderProvider";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";

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
  ({ groupMetaData, formikBag, asyncBag, show }) => {
    if (!show) {
      return null;
    }
    return (
      <MetaDataRenderer
        fieldMetaData={groupMetaData}
        formikBag={formikBag}
        asyncBag={asyncBag}
      />
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.show !== nextProps.show) {
      return false;
    }
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

const GroupsRenderer = ({
  fieldGroups,
  groupWiseFields,
  groupFieldDepedency,
  formikBag,
  asyncBag
}) => {
  const renderConfig = React.useContext(RenderContext);
  let result = fieldGroups.map(group => (
    <FormGroup
      show={true}
      key={group}
      groupMetaData={groupWiseFields[group]}
      groupDepedency={groupFieldDepedency[group]}
      formikBag={formikBag}
      asyncBag={asyncBag}
    />
  ));
  return (
    <Grid container {...renderConfig.gridConfig.container}>
      {result}
    </Grid>
  );
};

const TabsRenderer = ({
  fieldGroups,
  groupWiseFields,
  groupFieldDepedency,
  formikBag,
  asyncBag
}) => {
  const [index, setIndex] = React.useState(0);
  const renderConfig = React.useContext(RenderContext);
  const tabs = fieldGroups.map((group, myIndex) => (
    <Tab key={myIndex} label={group} />
  ));
  const groups = fieldGroups.map((group, myIndex) => (
    <FormGroup
      show={myIndex === index}
      key={fieldGroups[group]}
      groupMetaData={groupWiseFields[group]}
      groupDepedency={groupFieldDepedency[group]}
      formikBag={formikBag}
      asyncBag={asyncBag}
    />
  ));
  const handleChange = (_, newIndex) => {
    setIndex(newIndex);
  };
  return (
    <>
      <Tabs value={index} onChange={handleChange}>
        {tabs}
      </Tabs>
      <Grid container {...renderConfig.gridConfig.container}>
        {groups}
      </Grid>
    </>
  );
};

const GroupFormRenderer = ({ formMetaData, formikBag, asyncBag }) => {
  const { form, fields } = formMetaData;
  const groupMetaDataRef = React.useRef(null);
  const renderConfig = React.useContext(RenderContext);
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
  const Component = renderConfig.renderTabs ? TabsRenderer : GroupsRenderer;
  return (
    <Component
      fieldGroups={form.fieldGroups}
      groupWiseFields={groupWiseFields}
      groupFieldDepedency={groupFieldDepedency}
      formikBag={formikBag}
      asyncBag={asyncBag}
    />
  );
};

const SimpleFormRenderer = ({ formMetaData, formikBag, asyncBag }) => {
  const renderConfig = React.useContext(RenderContext);
  return (
    <Grid container {...renderConfig.gridConfig.container}>
      <MetaDataRenderer
        fieldMetaData={formMetaData.fields}
        formikBag={formikBag}
        asyncBag={asyncBag}
      />
    </Grid>
  );
};

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
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <RenderProvider value={formMetaData["render"]}>
          <FormikProvider value={formikBag}>
            {formMetaData["render"]["renderType"] === "groups" ? (
              <GroupFormRenderer
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
