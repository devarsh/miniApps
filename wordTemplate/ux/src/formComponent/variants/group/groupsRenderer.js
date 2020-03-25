import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { GroupItem } from "./memoize";
import { FormikContext } from "formik";
import { AsyncContext } from "formComponent/context/useAsync";
import { RenderContext } from "formComponent/context/renderProvider";
import { FormManagerContext } from "formComponent/context/formManager";

export const GroupsRenderer = ({
  fieldGroups,
  groupWiseFields,
  groupWiseFieldDepedency
}) => {
  const asyncBag = React.useContext(AsyncContext);
  const formikBag = React.useContext(FormikContext);
  const renderBag = React.useContext(RenderContext);
  const formManagerBag = React.useContext(FormManagerContext);

  let result = fieldGroups.map(group => (
    <GroupItem
      key={group}
      groupMetaData={groupWiseFields[group]}
      groupDepedency={groupWiseFieldDepedency[group]}
      asyncBag={asyncBag}
      formikBag={formikBag}
      formManagerBag={formManagerBag}
    />
  ));
  return (
    <Grid container {...renderBag.container}>
      {result}
    </Grid>
  );
};
