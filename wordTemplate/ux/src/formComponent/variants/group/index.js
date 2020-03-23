import React from "react";
import { generateFieldGroupDepedency } from "./utils";
import { TabsRenderer } from "./tabsRenderer";
import { GroupsRenderer } from "./groupsRenderer";

export const GroupFormRenderer = ({ formMetaData, renderTabs }) => {
  const { form, fields } = formMetaData;
  const groupMetaDataRef = React.useRef(null);
  if (!Array.isArray(form.fieldGroups)) {
    console.log("No property of form.fieldGroup exists in metaData");
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

  const { groupWiseFieldDepedency, groupWiseFields } = transformedMetaData;
  if (
    typeof groupWiseFieldDepedency !== "object" &&
    typeof groupWiseFields !== "object"
  ) {
    console.log("error occured while tranforming the meta data");
    return null;
  }
  const Component = renderTabs ? TabsRenderer : GroupsRenderer;
  return (
    <Component
      fieldGroups={form.fieldGroups}
      groupWiseFields={groupWiseFields}
      groupWiseFieldDepedency={groupWiseFieldDepedency}
    />
  );
};
