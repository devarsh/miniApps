import React from "react";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import { MemoizeFieldComponent } from "formComponent/componentWrapper/memoizer";

let MySlider = ({
  label,
  type,
  handleBlur,
  handleChange,
  mutate,
  runAsyncFn,
  renderBag,
  registerField,
  unregisterField,
  ...others
}) => {
  const { error, touched, value, name, disabled } = mutate;
  React.useEffect(() => {
    registerField(name);
    return () => unregisterField(name);
  }, [registerField, unregisterField, name]);
  const handleSliderChange = (_, v) => {
    handleChange({
      target: {
        name: name,
        value: v
      }
    });
  };
  const handleSliderBlur = e => {
    handleBlur({
      target: {
        name: name
      }
    });
  };

  return (
    <Grid item {...renderBag.gridConfig.item.size}>
      <InputLabel disabled={disabled} component="legend">
        {label}
      </InputLabel>
      <Slider
        onChange={handleSliderChange}
        onBlur={handleSliderBlur}
        value={value || 0}
        type={type}
        name={name}
        disabled={disabled}
        {...others}
      />
      {touched && !!error ? <FormHelperText>{error}</FormHelperText> : null}
    </Grid>
  );
};

MySlider = MemoizeFieldComponent(MySlider);
export { MySlider };
