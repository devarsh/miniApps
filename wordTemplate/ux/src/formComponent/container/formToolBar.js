import React from "react";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import ClearAllIcon from "@material-ui/icons/ClearAll";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: "flex"
  },
  Iconbutton: {
    boxShadow: "none"
  },
  button: {
    padding: "6px 10px"
  },
  content: {
    padding: `${theme.spacing(3)}px`,
    overflowY: "auto"
  },
  paper: {
    height: "calc(100vh - 20px - 48px)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  }
}));
const FormContainer = ({ children, handleSubmit, handleReset, formName }) => {
  const classes = useStyles();
  return (
    <Paper square>
      <AppBar position="relative" elevation={0} square>
        <ToolBar variant="dense">
          <Typography variant="h6" noWrap>
            {formName}
          </Typography>
        </ToolBar>
      </AppBar>
      <Paper variant="outlined" square className={classes.paper}>
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
        <div className={classes.content}>{children}</div>
      </Paper>
    </Paper>
  );
};

export default FormContainer;
