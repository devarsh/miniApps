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

let MySwitch = ({
  label,
  options,
  handleBlur,
  handleChange,
  mutate,
  renderBag,
  registerField,
  unregisterField
}) => {
  const { error, touched, value, name, disabled } = mutate;
  let switches;
  React.useEffect(() => {
    registerField(name);
    return () => unregisterField(name);
  }, [registerField, unregisterField, name]);
  if (Array.isArray(options)) {
    switches = options.map((currentCheckBox, index) => (
      <FormControlLabel
        key={`${index}-${currentCheckBox.value}`}
        disabled={disabled}
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
};

MySwitch = MemoizeFieldComponent(MySwitch);
export { MySwitch };
