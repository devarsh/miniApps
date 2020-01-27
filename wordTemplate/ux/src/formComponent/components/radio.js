import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { MemoizeFieldComponent } from "../renderer/memoizer";

let MyRadio = ({
  label,
  options,
  handleBlur,
  handleChange,
  type,
  mutate,
  renderBag
}) => {
  const { error, touched, value, name, show } = mutate;
  let radios;

  if (Array.isArray(options)) {
    radios = options.map((currentCheckBox, index) => {
      /* eslint-disable eqeqeq*/
      const ischecked = value == currentCheckBox.value;
      return (
        <FormControlLabel
          key={`${index}-${currentCheckBox.value}`}
          control={
            <Radio
              type={type}
              name={name}
              value={currentCheckBox.value || ""}
              checked={ischecked}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          }
          label={currentCheckBox.label}
        />
      );
    });
  }
  return (
    <>
      {show ? (
        <Grid item {...renderBag.gridConfig.item.size}>
          <FormControl error={touched && !!error}>
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>{radios}</FormGroup>
            {touched && !!error ? (
              <FormHelperText>{error}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
      ) : null}
    </>
  );
};

MyRadio = MemoizeFieldComponent(MyRadio);
export { MyRadio };
