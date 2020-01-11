import React from "react";
import shallowEqual from "../utils/shallowEqual";
import Slider from "@material-ui/core/Slider";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { showComponent } from "./utils";

export const MySlider = React.memo(
  ({ label, handleBlur, handleChange, mutate, ...others }) => {
    if (showComponent(mutate["show"]) === false) {
      return;
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
      <>
        <FormLabel error={!!error} component="legend">
          {label}
        </FormLabel>
        <Slider
          onChange={handleSliderChange}
          onBlur={handleSliderBlur}
          value={value || 0}
          type={"slider"}
          name={name}
          {...others}
        />
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
