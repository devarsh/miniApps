import React from "react";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import { MemoizeFieldComponent } from "../renderer/memoizer";

export const MySlider = MemoizeFieldComponent(
  ({
    label,
    type,
    handleBlur,
    handleChange,
    mutate,
    runAsyncFn,
    renderBag,
    ...others
  }) => {
    if (mutate["show"] === false) {
      return null;
    }
    const { error, touched, value, name } = mutate;
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
        <InputLabel component="legend">{label}</InputLabel>
        <Slider
          onChange={handleSliderChange}
          onBlur={handleSliderBlur}
          value={value || 0}
          type={type}
          name={name}
          {...others}
        />
        {touched && !!error ? <FormHelperText>{error}</FormHelperText> : null}
      </Grid>
    );
  }
);
