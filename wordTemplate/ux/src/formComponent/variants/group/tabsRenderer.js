import React from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import { GroupItem } from "./memoize";
import { FormikContext } from "formik";
import { AsyncContext } from "formComponent/context/useAsync";
import { RenderContext } from "formComponent/context/renderProvider";
import { FormManagerContext } from "formComponent/context/formManager";

export const TabsRenderer = ({
  fieldGroups,
  groupWiseFields,
  groupWiseFieldDepedency
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const asyncBag = React.useContext(AsyncContext);
  const formikBag = React.useContext(FormikContext);
  const renderBag = React.useContext(RenderContext);
  const formManagerBag = React.useContext(FormManagerContext);
  const tabs = fieldGroups.map((group, myIndex) => (
    <Tab key={myIndex} label={group} />
  ));

  const groups = fieldGroups.map((group, index) => (
    <GroupItem
      key={`${group}-${index}`}
      groupMetaData={groupWiseFields[group]}
      groupDepedency={groupWiseFieldDepedency[group]}
      asyncBag={asyncBag}
      formikBag={formikBag}
      formManagerBag={formManagerBag}
      isVisible={index === currentIndex}
    />
  ));
  const handleChange = (_, newIndex) => {
    setCurrentIndex(newIndex);
  };
  return (
    <>
      <Tabs value={currentIndex} onChange={handleChange}>
        {tabs}
      </Tabs>
      <Grid container {...renderBag.container}>
        {groups}
      </Grid>
    </>
  );
};
