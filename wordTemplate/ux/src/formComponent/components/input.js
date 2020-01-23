import React from "react";
import TextField from "@material-ui/core/TextField";
import shallowEqual from "../utils/shallowEqual";
import { useDebouncedCallback } from "use-debounce";
import { showComponent, asyncValidationWrapper } from "./utils";
import Grid from "@material-ui/core/Grid";
import { RenderContext } from "../renderProvider";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
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
    const renderConfig = React.useContext(RenderContext);
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
              if (!!syncError.current === false && inputValue !== "") {
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
      <Grid item {...renderConfig.gridConfig.item.size}>
        <TextField
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
