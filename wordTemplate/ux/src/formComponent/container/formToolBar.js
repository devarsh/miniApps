import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import ClearAllIcon from "@material-ui/icons/ClearAll";

const useStyles = makeStyles(theme => ({
  sectionDesktop: {
    display: "flex"
  },
  button: {
    padding: "6px 10px"
  }
}));
const FormContainer = ({ handleSubmit, handleReset, formName }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="relative" elevation={0} square>
        <ToolBar variant="dense">
          <Typography variant="h6" noWrap>
            {formName}
          </Typography>
        </ToolBar>
      </AppBar>
      <AppBar position="relative" color="secondary" elevation={0} square>
        <ToolBar variant="dense">
          <div className={classes.sectionDesktop}>
            <Button
              onClick={handleSubmit}
              className={classes.button}
              startIcon={<SaveIcon>Save</SaveIcon>}
            >
              Save
            </Button>
            <Button
              onClick={handleReset}
              className={classes.button}
              startIcon={<ClearAllIcon>Reset</ClearAllIcon>}
            >
              Reset
            </Button>
          </div>
        </ToolBar>
      </AppBar>
    </>
  );
};

export default FormContainer;
