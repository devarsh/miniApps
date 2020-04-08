import * as React from "react";
import {
  MyTextField,
  MyCheckbox,
  MySelectDependent,
  MySelectStatic,
  MyRadio,
  MyKeyboardDatePicker,
  MySlider,
  MySwitch,
  MyAutoCompleteStatic,
  MyAutoCompleteDynamic,
  MyRating,
} from "formComponent/components";
import {
  ArrayComponent,
  FieldBagWrapper,
} from "formComponent/componentWrapper";

export const renderField = (field) => {
  const { type, name, label, watch, show } = field;
  key = `${name}`;
  const commonProps = { key, type, name, label, others: { watch, show } };
  switch (type) {
    case "text": {
      const { asyncValidationFn } = field;
      return (
        <FieldBagWrapper {...commonProps} asyncValidationFn={asyncValidationFn}>
          <MyTextField />
        </FieldBagWrapper>
      );
    }
    case "rating": {
      const { max, precision } = field;
      return (
        <FieldBagWrapper {...commonProps} max={max} precision={precision}>
          <MyRating />
        </FieldBagWrapper>
      );
    }
    case "autocompleteStatic": {
      const {
        options,
        getOptionLabel,
        multiple = false,
        freeSolo = false,
      } = field;
      return (
        <FieldBagWrapper
          {...commonProps}
          options={options}
          getOptionLabel={getOptionLabel}
          multiple={multiple}
          freeSolo={freeSolo}
        >
          <MyAutoCompleteStatic />
        </FieldBagWrapper>
      );
    }
    case "autocompleteDynamic": {
      const {
        callback = () => {},
        getOptionLabel,
        multiple = false,
        freeSolo = false,
      } = field;
      return (
        <FieldBagWrapper
          {...commonProps}
          getOptionLabel={getOptionLabel}
          multiple={multiple}
          freeSolo={freeSolo}
          callback={callback}
        >
          <MyAutoCompleteDynamic />
        </FieldBagWrapper>
      );
    }
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
      const { options, defaultValue, multiple = false } = field;
      return (
        <FieldBagWrapper
          {...commonProps}
          options={options}
          defaultValue={defaultValue}
          multiple={multiple}
        >
          <MySelectStatic />
        </FieldBagWrapper>
      );
    }
    case "selectDependent": {
      const { callback, multiple = false } = field;
      return (
        <FieldBagWrapper
          {...commonProps}
          callback={callback}
          multiple={multiple}
        >
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
