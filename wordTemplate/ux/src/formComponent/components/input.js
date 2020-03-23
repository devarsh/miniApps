import * as React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDebouncedCallback } from "use-debounce";
import { asyncValidationWrapper } from "formComponent/utils/asyncValidationWrapper";
import { MemoizeFieldComponent } from "formComponent/componentWrapper/memoizer";

let MyTextField = ({
  label,
  type,
  handleBlur,
  handleChange,
  mutate,
  runAsyncFn,
  asyncValidationFn = false,
  renderBag,
  registerField,
  unregisterField,
  ...others
}) => {
  const {
    name,
    value,
    touched,
    error,
    asyncError,
    //executeAsync,
    disabled
  } = mutate;
  const debounceDelay = 200;
  const blurDelay = 500;
  const [inputValue, setInputValue] = React.useState(value);
  const [asyncLoader, setAsyncLoader] = React.useState(false);
  /*need reference to sync error between renders to determine 
  when async validation should be dispatched
  if sync error exist dont call async validation.*/
  const syncError = React.useRef(error);
  syncError.current = error;

  /* run async validation if never ran and user had passed it */
  //const asyncRunCount = React.useRef(0);
  /*eslint-disable react-hooks/exhaustive-deps*/
  /*React.useEffect(() => {
    if (asyncRunCount.current === 0 && executeAsync === true) {
      asyncRunCount.current++;
      runAsyncFn(
        asyncValidationWrapper,
        name,
        inputValue,
        asyncValidationFn,
        setAsyncLoader
      );
    }
  }, [executeAsync]);*/

  /*register and unregister field*/
  React.useEffect(() => {
    registerField(name, asyncValidationFn);
    return () => unregisterField(name);
  }, [registerField, unregisterField, name]);
  /*everytime component re-renders, reset the formvalue 
  to the value coming from props to avoid any kind of data inconsistency*/
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);
  /*debounce the handleChange event and mainatin the state locally 
  to avoid rendering the entier form on every keystroke*/
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
  /*handleBlur wrapper would wrap async error calls, incase user had 
  enabled async validation otherwise fallback to actual handleblur 
  which would only check for static error*/
  const handleBlurWrapper =
    asyncValidationFn === false
      ? handleBlur
      : e => {
          handleBlur(e);
          setTimeout(() => {
            if (!!syncError.current === false && inputValue !== "") {
              //asyncRunCount.current++;
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
    <Grid item {...renderBag.item.size}>
      <TextField
        disabled={disabled}
        size="small"
        label={label}
        error={!!userErrorMsg}
        helperText={userErrorMsg}
        onChange={handleChangeWrapper}
        onBlur={handleBlurWrapper}
        type={type}
        name={name}
        value={inputValue || ""}
        fullWidth={true}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {asyncLoader && <CircularProgress size={24} thickness={4} />}
            </InputAdornment>
          )
        }}
        {...others}
      />
    </Grid>
  );
};

MyTextField = MemoizeFieldComponent(MyTextField);
export { MyTextField };
