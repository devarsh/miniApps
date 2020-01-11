import React from "react";
import TextField from "@material-ui/core/TextField";
import shallowEqual from "../utils/shallowEqual";
import { useDebouncedCallback } from "use-debounce";
import { showComponent, asyncValidationWrapper } from "./utils";
export const MyTextField = React.memo(
  ({
    label,
    type,
    handleBlur,
    handleChange,
    mutate,
    runAsyncFn,
    asyncValidationFn = false,
    ...others
  }) => {
    if (showComponent(mutate["show"]) === false) {
      return;
    }
    const { name, value, touched, error, asyncError } = mutate;
    const debounceDelay = 200;
    const blurDelay = 500;
    const [inputValue, setInputValue] = React.useState(value);
    const [asyncLoader, setAsyncLoader] = React.useState(false);
    //need reference to sync error between renders to determine when async validation should be dispatched
    //if font-end error exist dont call async validation.
    const syncError = React.useRef(error);
    syncError.current = error;
    React.useEffect(() => {
      setInputValue(value);
    }, [value]);
    const [handleChangeDebounce] = useDebouncedCallback(value => {
      const e = {
        target: {
          value: value,
          name: name
        }
      };
      handleChange(e);
    }, debounceDelay);
    const handleChangeWrapper = e => {
      setInputValue(e.target.value);
      handleChangeDebounce(e.target.value);
    };

    const handleBlurWrapper =
      asyncValidationFn === false
        ? handleBlur
        : e => {
            handleBlur(e);
            setTimeout(() => {
              if (!!syncError.current === false) {
                runAsyncFn(
                  asyncValidationWrapper,
                  name,
                  inputValue,
                  asyncValidationFn,
                  setAsyncLoader
                );
              }
            }, blurDelay);
          };
    const userErrorMsg =
      touched && !!error ? error : touched && !!asyncError ? asyncError : null;
    return (
      <>
        <TextField
          label={label}
          error={!!userErrorMsg}
          helperText={userErrorMsg}
          onChange={handleChangeWrapper}
          onBlur={handleBlurWrapper}
          type={type}
          name={name}
          value={inputValue || ""}
          {...others}
        />
        {asyncLoader && `🌀`}
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
