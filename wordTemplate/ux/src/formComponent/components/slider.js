import React from "react";
import { useDebouncedCallback } from "use-debounce";
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
  const debounceDelay = 200;
  const [sliderValue, setSliderValue] = React.useState(value);
  React.useEffect(() => {
    registerField(name);
    return () => unregisterField(name);
  }, [registerField, unregisterField, name]);
  const [handleChangeDebounce] = useDebouncedCallback(eventVal => {
    const e = {
      target: {
        value: eventVal,
        name: name
      }
    };
    handleChange(e);
  }, debounceDelay);

  const handleSliderChangeWrapper = (_, v) => {
    setSliderValue(v);
    handleChangeDebounce(v);
  };
  const handleSliderBlur = e => {
    handleBlur({
      target: {
        name: name
      }
    });
  };

  return (
    <Grid item {...renderBag.item.size}>
      <InputLabel disabled={disabled} component="legend">
        {label}
      </InputLabel>
      <Slider
        onChange={handleSliderChangeWrapper}
        onBlur={handleSliderBlur}
        value={sliderValue || 0}
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
