import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { FormRenderer } from "formComponent/renderer";
import { RenderContext } from "formComponent/context/renderProvider";

export const SimpleFormRenderer = ({ formMetaData }) => {
  const renderConfig = React.useContext(RenderContext);
  return (
    <Grid container {...renderConfig.container}>
      <FormRenderer fieldsArray={formMetaData.fields} />
    </Grid>
  );
};
