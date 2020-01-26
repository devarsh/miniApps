import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import { MemoizeFieldComponent } from "../renderer/memoizer";
import { isChecked } from "./utils";

export const MyCheckbox = MemoizeFieldComponent(
  ({ label, options, handleBlur, handleChange, mutate, type, renderBag }) => {
    if (mutate["show"] === false) {
      return;
    }
    const { error, touched, value, name } = mutate;
    let checkboxes;
    if (Array.isArray(options)) {
      checkboxes = options.map((currentCheckBox, index) => (
        <FormControlLabel
          key={`${index}-${currentCheckBox.value}`}
          control={
            <Checkbox
              type={type}
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
        <FormControl error={touched && !!error}>
          <FormLabel component="legend">{label}</FormLabel>
          <FormGroup>{checkboxes}</FormGroup>
          {touched && !!error ? <FormHelperText>{error}</FormHelperText> : null}
        </FormControl>
      </Grid>
    );
  }
);
