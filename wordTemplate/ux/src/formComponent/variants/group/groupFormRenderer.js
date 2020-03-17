import React from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import { RenderContext } from "formComponent/context/renderProvider";
import MetaDataRenderer from "../fieldRenderer";
import {
  MemoizeGroupComponent,
  generateFieldGroupDepedency
} from "./groupUtils";

export const GroupFormRenderer = ({ formMetaData }) => {
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
    />
  );
};

const GroupsRenderer = ({
  fieldGroups,
  groupWiseFields,
  groupFieldDepedency
}) => {
  const renderConfig = React.useContext(RenderContext);
  let result = fieldGroups.map(group => (
    <FormGroup
      key={group}
      groupMetaData={groupWiseFields[group]}
      groupDepedency={groupFieldDepedency[group]}
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
  groupFieldDepedency
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

const FormGroup = MemoizeGroupComponent(({ groupMetaData }) => {
  return <MetaDataRenderer fieldMetaData={groupMetaData} />;
});
