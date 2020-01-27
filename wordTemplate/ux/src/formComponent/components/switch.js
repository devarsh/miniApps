import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import { isChecked } from "./utils";
import { MemoizeFieldComponent } from "../renderer/memoizer";

export const MySwitch = MemoizeFieldComponent(
  ({ label, options, handleBlur, handleChange, mutate, renderBag }) => {
    if (mutate["show"] === false) {
      return null;
    }
    const { error, touched, value, name } = mutate;
    let switches;
    let { show } = mutate;
    if (show === "" || show === undefined || show === null) {
      show = true;
    }
    if (show === false) {
      return null;
    }
    if (Array.isArray(options)) {
      switches = options.map((currentCheckBox, index) => (
        <FormControlLabel
          key={`${index}-${currentCheckBox.value}`}
          control={
            <Switch
              type="checkbox"
              name={name}
              value={currentCheckBox.value || ""}
              checked={isChecked(value, currentCheckBox.value)}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          }
          label={currentCheckBox.label}
        />
      ));
    }
    return (
      <Grid item {...renderBag.gridConfig.item.size}>
        <FormControl>
          <FormLabel error={!!error} component="legend">
            {label}
          </FormLabel>
          <FormGroup row={true}>{switches}</FormGroup>
          <FormHelperText error={touched && !!error}>{error}</FormHelperText>
        </FormControl>
      </Grid>
    );
  }
);
