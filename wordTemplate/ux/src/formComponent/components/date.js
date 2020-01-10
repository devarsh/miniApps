import React from "react";
import shallowEqual from "../utils/shallowEqual";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  KeyboardDateTimePicker
} from "@material-ui/pickers";

export const MyKeyboardDatePicker = React.memo(
  props => {
    const { label, handleBlur, handleChange, mutate, ...others } = props;
    const { error, touched, value, name, type } = mutate;
    let { show } = mutate;
    if (show === "" || show === undefined || show === null) {
      show = true;
    }
    if (show === false) {
      return null;
    }
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
