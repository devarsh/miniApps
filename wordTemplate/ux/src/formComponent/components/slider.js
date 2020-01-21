import React from "react";
import shallowEqual from "../utils/shallowEqual";
import Slider from "@material-ui/core/Slider";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { showComponent } from "./utils";
import Grid from "@material-ui/core/Grid";
import { RenderContext } from "../renderProvider";
export const MySlider = React.memo(
  ({ label, handleBlur, handleChange, mutate, runAsyncFn, ...others }) => {
    if (showComponent(mutate["show"]) === false) {
      return;
    }
    const renderConfig = React.useContext(RenderContext);
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
      <Grid item {...renderConfig.gridConfig.item.size}>
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
      </Grid>
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
