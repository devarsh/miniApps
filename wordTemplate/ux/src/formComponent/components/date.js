import React from "react";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { MemoizeFieldComponent } from "../renderer/memoizer";

export const MyKeyboardDatePicker = MemoizeFieldComponent(
  ({
    label,
    handleBlur,
    handleChange,
    mutate,
    type,
    runAsyncFn,
    renderBag,
    ...others
  }) => {
    if (mutate["show"] === false) {
      return;
    }
    const { error, touched, value, name } = mutate;
    const handleDateChange = date => {
      handleChange({
        target: {
          value: date,
          name: name
        }
      });
    };
    const ComponentType =
      type === "date"
        ? KeyboardDatePicker
        : type === "time"
        ? KeyboardTimePicker
        : type === "datetime"
        ? KeyboardDateTimePicker
        : KeyboardDatePicker;
    const format =
      type === "date"
        ? "dd/MM/yyyy"
        : type === "time"
        ? "h:mm:ss aaaa"
        : type === "datetime"
        ? "dd/MM/yyyy h:mm:ss aaaa"
        : "dd/MM/yyyy";
    return (
      <Grid item {...renderBag.gridConfig.item.size}>
        <ComponentType
          disableToolbar
          label={label}
          error={touched && !!error}
          helperText={touched && error}
          onChange={handleDateChange}
          onBlur={handleBlur}
          value={!!value ? new Date(value) : new Date()}
          type={"text"}
          inputVariant="outlined"
          size="small"
          name={name}
          {...others}
          fullWidth={true}
          format={format}
        />
      </Grid>
    );
  }
);
