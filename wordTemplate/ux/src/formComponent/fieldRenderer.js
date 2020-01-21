import React from "react";
import {
  MyTextField,
  MyCheckbox,
  MySelectDependent,
  MySelectStatic,
  MyRadio,
  MyKeyboardDatePicker,
  MySlider,
  MySwitch
} from "./components/index";

import fieldBag from "./fieldBag";

const renderField = (formikBag, asyncBag, index, field, gridConfig) => {
  const { type, name, label } = field;
  const key = `${name}-${index}`;
  switch (type) {
    case "text":
      const { asyncValidationFn } = field;
      return (
        <MyTextField
          variant="outlined"
          label={label}
          {...fieldBag(formikBag, asyncBag, "text", name)}
          key={key}
          asyncValidationFn={asyncValidationFn}
        />
      );
    case "slider": {
      const { min, max, step } = field;
      return (
        <MySlider
          label={label}
          {...fieldBag(formikBag, asyncBag, "slider", name)}
          min={min}
          max={max}
          step={step}
          key={key}
        />
      );
    }
    case "radio": {
      const { options } = field;
      return (
        <MyRadio
          options={options}
          label={label}
          {...fieldBag(formikBag, asyncBag, "radio", name)}
          key={key}
        />
      );
    }
    case "switch": {
      const { options } = field;
      return (
        <MySwitch
          options={options}
          label={label}
          {...fieldBag(formikBag, asyncBag, "checkbox", name)}
          key={key}
        />
      );
    }
    case "checkbox": {
      const { options } = field;
      return (
        <MyCheckbox
          options={options}
          label={label}
          {...fieldBag(formikBag, asyncBag, "checkbox", name)}
          key={key}
        />
      );
    }
    case "selectStatic": {
      const { options, defaultValue } = field;
      return (
        <MySelectStatic
          options={options}
          defaultValue={defaultValue}
          label={label}
          {...fieldBag(formikBag, asyncBag, "select", name)}
          key={key}
        />
      );
    }
    case "selectDependent": {
      const { callback, watch } = field;
      return (
        <MySelectDependent
          label={label}
          callback={callback}
          {...fieldBag(formikBag, asyncBag, "select", name, { watch })}
          key={key}
        />
      );
    }
    case "date":
    case "time":
    case "datetime": {
      return (
        <MyKeyboardDatePicker
          label={label}
          {...fieldBag(formikBag, asyncBag, "datetime", name)}
          key={key}
        />
      );
    }
    default:
      return undefined;
  }
};

export default renderField;
