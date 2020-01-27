import React from "react";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { MemoizeFieldComponent } from "../renderer/memoizer";

let MyKeyboardDatePicker = ({
  label,
  handleBlur,
  handleChange,
  mutate,
  type,
  runAsyncFn,
  renderBag,
  ...others
}) => {
  const { error, touched, value, name, show } = mutate;
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
    <>
      {show ? (
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
      ) : null}
    </>
  );
};

MyKeyboardDatePicker = MemoizeFieldComponent(MyKeyboardDatePicker);
export { MyKeyboardDatePicker };
