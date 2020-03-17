import React from "react";
import Grid from "@material-ui/core/Grid";
import MetaDataRenderer from "formComponent/renderer/fieldsComponentRenderer";
import { RenderContext } from "formComponent/context/renderProvider";

export const SimpleFormRenderer = ({ formMetaData }) => {
  const renderConfig = React.useContext(RenderContext);
  return (
    <Grid container {...renderConfig.gridConfig.container}>
      <MetaDataRenderer formMetaData={formMetaData.fields} />
    </Grid>
  );
};
