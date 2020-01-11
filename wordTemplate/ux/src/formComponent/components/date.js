import React from "react";
import shallowEqual from "../utils/shallowEqual";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import { showComponent } from "./utils";

export const MyKeyboardDatePicker = React.memo(
  ({ label, handleBlur, handleChange, mutate, type, ...others }) => {
    if (showComponent(mutate["show"]) === false) {
      return;
    }
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
      <>
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
        />
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
