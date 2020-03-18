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
} from "formComponent/components";
import {
  ArrayComponent,
  FieldBagWrapper
} from "formComponent/componentWrapper";

export const renderField = (field, index = "") => {
  const { type, name, label, watch, show } = field;
  let key;
  if (index === "") {
    key = name;
  }
  key = `${name}-${index}`;
  const commonProps = { key, type, name, label, others: { watch, show } };
  switch (type) {
    case "text":
      const { asyncValidationFn } = field;
      return (
        <FieldBagWrapper {...commonProps} asyncValidationFn={asyncValidationFn}>
          <MyTextField />
        </FieldBagWrapper>
      );
    case "slider": {
      const { min, max, step } = field;
      return (
        <FieldBagWrapper {...commonProps} min={min} max={max} step={step}>
          <MySlider />
        </FieldBagWrapper>
      );
    }
    case "radio": {
      const { options } = field;
      return (
        <FieldBagWrapper {...commonProps} options={options}>
          <MyRadio />
        </FieldBagWrapper>
      );
    }
    case "switch": {
      const { options } = field;
      return (
        <FieldBagWrapper {...commonProps} options={options}>
          <MySwitch />
        </FieldBagWrapper>
      );
    }
    case "checkbox": {
      const { options } = field;
      return (
        <FieldBagWrapper {...commonProps} options={options}>
          <MyCheckbox />
        </FieldBagWrapper>
      );
    }
    case "selectStatic": {
      const { options, defaultValue } = field;
      return (
        <FieldBagWrapper
          {...commonProps}
          options={options}
          defaultValue={defaultValue}
        >
          <MySelectStatic />
        </FieldBagWrapper>
      );
    }
    case "selectDependent": {
      const { callback } = field;
      return (
        <FieldBagWrapper {...commonProps} callback={callback}>
          <MySelectDependent />
        </FieldBagWrapper>
      );
    }
    case "date":
    case "time":
    case "datetime": {
      return (
        <FieldBagWrapper {...commonProps}>
          <MyKeyboardDatePicker />
        </FieldBagWrapper>
      );
    }
    case "array": {
      const { template } = field;
      return <ArrayComponent {...commonProps} template={template} />;
    }
    default:
      return null;
  }
};
