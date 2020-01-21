import React from "react";
import shallowEqual from "../utils/shallowEqual";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import { showComponent } from "./utils";
import Grid from "@material-ui/core/Grid";
import { RenderContext } from "../renderProvider";

export const MyKeyboardDatePicker = React.memo(
  ({
    label,
    handleBlur,
    handleChange,
    mutate,
    type,
    runAsyncFn,
    ...others
  }) => {
    if (showComponent(mutate["show"]) === false) {
      return;
    }
    const renderConfig = React.useContext(RenderContext);
    const { error, touched, value, name } = mutate;
    const handleDateChange = e =>
      handleChange({
        target: {
          value: e,
          name: name
        }
      });
    const ComponentType =
      type === "date"
        ? KeyboardDatePicker
        : type === "time"
        ? KeyboardTimePicker
        : type === "datetime"
        ? KeyboardDateTimePicker
        : KeyboardDatePicker;
    return (
      <Grid item {...renderConfig.gridConfig.item.size}>
        <ComponentType
          disableToolbar
          label={label}
          error={touched && !!error}
          helperText={touched && error}
          onChange={handleDateChange}
          onBlur={handleBlur}
          value={!!value ? new Date(value) : new Date()}
          type={"text"}
          name={name}
          {...others}
          fullWidth={true}
        />
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
