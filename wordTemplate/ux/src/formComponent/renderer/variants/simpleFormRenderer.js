import React from "react";
import Grid from "@material-ui/core/Grid";
import MetaDataRenderer from "../fieldRenderer";
import { RenderContext } from "../../context/renderProvider";

export const SimpleFormRenderer = ({ formMetaData }) => {
  const renderConfig = React.useContext(RenderContext);
  return (
    <Grid container {...renderConfig.gridConfig.container}>
      <MetaDataRenderer fieldMetaData={formMetaData.fields} />
    </Grid>
  );
};
