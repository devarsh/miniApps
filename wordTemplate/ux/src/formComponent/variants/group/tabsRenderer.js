import * as React from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import { GroupItem } from "./memoize";
import { FormikContext } from "formik";
import { AsyncContext } from "formComponent/context/useAsync";
import { RenderContext } from "formComponent/context/renderProvider";
import { FormManagerContext } from "formComponent/context/formManager";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  tabsContainer: {
    padding: theme.spacing(2)
  },
  tabs: {
    background: theme.palette.secondary.light
  }
}));

export const TabsRenderer = ({
  fieldGroups,
  groupWiseFields,
  groupWiseFieldDepedency
}) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const asyncBag = React.useContext(AsyncContext);
  const formikBag = React.useContext(FormikContext);
  const renderBag = React.useContext(RenderContext);
  const formManagerBag = React.useContext(FormManagerContext);
  const tabs = fieldGroups.map((group, myIndex) => (
    <Tab key={myIndex} label={group} />
  ));
  const groups = fieldGroups.map((group, index) => {
    const display =
      index !== currentIndex ? { display: "none" } : { display: "flex" };
    return (
      <Grid
        container
        {...renderBag.container}
        key={`${group}-${index}`}
        style={display}
      >
        <GroupItem
          groupMetaData={groupWiseFields[group]}
          groupDepedency={groupWiseFieldDepedency[group]}
          asyncBag={asyncBag}
          formikBag={formikBag}
          formManagerBag={formManagerBag}
        />
      </Grid>
    );
  });
  const handleChange = (_, newIndex) => {
    setCurrentIndex(newIndex);
  };
  return (
    <>
      <Paper elevation={3} square>
        <Tabs
          value={currentIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          className={classes.tabs}
        >
          {tabs}
        </Tabs>
      </Paper>
      <div className={classes.tabsContainer}>{groups}</div>
    </>
  );
};
