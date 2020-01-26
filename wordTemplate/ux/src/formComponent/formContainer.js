import React from "react";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";

import {
  ThemeProvider,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";

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
const FormContainer = ({ children, saveFn }) => {
  if (!typeof saveFn === "function") {
    console.log("saveFn not passed");
    saveFn = () => {
      alert("save function not passed");
    };
  }
  const classes = useStyles();
  return (
    <Paper square>
      <AppBar position="relative" elevation={0} square>
        <ToolBar variant="dense">
          <Typography variant="h6" noWrap>
            From Name
          </Typography>
        </ToolBar>
      </AppBar>
      <Paper variant="outlined" square className={classes.paper}>
        <AppBar position="relative" color="secondary" elevation={0} square>
          <ToolBar variant="dense">
            <div className={classes.sectionDesktop}>
              <Button className={classes.button} startIcon={<Add>New</Add>}>
                New
              </Button>
              <Button
                className={classes.button}
                startIcon={<EditIcon>New</EditIcon>}
              >
                Edit
              </Button>
              <Button
                onClick={saveFn}
                className={classes.button}
                startIcon={<SaveIcon>Save</SaveIcon>}
              >
                Save
              </Button>
            </div>
          </ToolBar>
        </AppBar>
        <div className={classes.content}>{children}</div>
      </Paper>
    </Paper>
  );
};

const Wrapper = ({ children }) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: grey[900]
      },
      secondary: {
        main: grey[300]
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <FormContainer>{children}</FormContainer>
    </ThemeProvider>
  );
};

export default Wrapper;
