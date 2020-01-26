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
} from "../components/index";

import { FieldBagWrapper } from "../fieldComponent";

const renderField = (index, field) => {
  const { type, name, label } = field;
  const key = `${name}-${index}`;
  switch (type) {
    case "text":
      const { asyncValidationFn } = field;
      return (
        <FieldBagWrapper
          key={key}
          label={label}
          asyncValidationFn={asyncValidationFn}
          name={name}
          type={type}
        >
          <MyTextField />
        </FieldBagWrapper>
      );
    case "slider": {
      const { min, max, step } = field;
      return (
        <FieldBagWrapper
          label={label}
          type={type}
          name={name}
          min={min}
          max={max}
          step={step}
          key={key}
        >
          <MySlider />
        </FieldBagWrapper>
      );
    }
    case "radio": {
      const { options } = field;
      return (
        <FieldBagWrapper
          options={options}
          label={label}
          type={type}
          name={name}
          key={key}
        >
          <MyRadio />
        </FieldBagWrapper>
      );
    }
    case "switch": {
      const { options } = field;
      return (
        <FieldBagWrapper
          options={options}
          label={label}
          type={"checkbox"}
          name={name}
          key={key}
        >
          <MySwitch />
        </FieldBagWrapper>
      );
    }
    case "checkbox": {
      const { options } = field;
      return (
        <FieldBagWrapper
          name={name}
          type={type}
          options={options}
          label={label}
          key={key}
        >
          <MyCheckbox />
        </FieldBagWrapper>
      );
    }
    case "selectStatic": {
      const { options, defaultValue } = field;
      return (
        <FieldBagWrapper
          options={options}
          defaultValue={defaultValue}
          label={label}
          type="select"
          name={name}
          key={key}
        >
          <MySelectStatic />
        </FieldBagWrapper>
      );
    }
    case "selectDependent": {
      const { callback, watch } = field;
      return (
        <FieldBagWrapper
          label={label}
          callback={callback}
          type="select"
          name={name}
          others={{ watch }}
          key={key}
        >
          <MySelectDependent />
        </FieldBagWrapper>
      );
    }
    case "date":
    case "time":
    case "datetime": {
      return (
        <FieldBagWrapper label={label} type={type} name={name} key={key}>
          <MyKeyboardDatePicker />
        </FieldBagWrapper>
      );
    }
    default:
      return null;
  }
};

export default renderField;
