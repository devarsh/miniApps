import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import shallowEqual from "../utils/shallowEqual";
import FormHelperText from "@material-ui/core/FormHelperText";
import { showComponent } from "./utils";

const isChecked = (currentValues, value) => {
  if (Array.isArray(currentValues)) {
    return currentValues.indexOf(value) < 0 ? false : true;
  }
  return false;
};

export const MyCheckbox = React.memo(
  ({ label, options, handleBlur, handleChange, mutate, type }) => {
    if (showComponent(mutate["show"]) === false) {
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
      <>
        <FormLabel error={!!error} component="legend">
          {label}
        </FormLabel>
        <FormGroup row={true}>{checkboxes}</FormGroup>
        <FormHelperText error={touched && !!error}>{error}</FormHelperText>
      </>
    );
  },
  (prevProps, nextProps) => {
    if (
      !shallowEqual(prevProps.mutate, nextProps.mutate) ||
      prevProps.label !== nextProps.label
    ) {
      return false;
    } else {
      return true;
    }
  }
);
