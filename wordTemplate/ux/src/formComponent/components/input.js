import React from "react";
import TextField from "@material-ui/core/TextField";
import shallowEqual from "../utils/shallowEqual";
import { useDebouncedCallback } from "use-debounce";
import { QueueError } from "../utils/promiseQueue";
export const MyTextField = React.memo(
  props => {
    const {
      label,
      handleBlur,
      handleChange,
      mutate,
      runAsyncFn,
      asyncValidationFn = false,
      ...others
    } = props;
    const { value, error, touched, asyncError, name, type } = mutate;
    //logic to determine if to show or hide the field
    let { show } = mutate;
    if (show === "" || show === undefined || show === null) {
      show = true;
    }
    if (show === false) {
      return null;
    }
    //handle user input with debounce in place to ease the constant rerendering of the form.
    const delayTime = 200;
    const inputRef = React.useRef(null);
    const [handleChangeDebounce] = useDebouncedCallback(e => {
      const newE = {
        target: {
          value: inputRef.current.value,
          name: name
        }
      };
      handleChange(newE);
    }, delayTime);
    //handle async validation.
    const [loading, setLoading] = React.useState(false);
    const syncError = React.useRef(error);
    syncError.current = error;
    const validationWrapper = async (
      isCancelled,
      key,
      value,
      validationFn,
      loadingFn,
      timeout = 2
    ) => {
      try {
        loadingFn(true);
        const res = await validationFn(key, value, timeout);
        return Promise.resolve(res);
      } catch (e) {
        return Promise.reject(e);
      } finally {
        const { cancelled, cancelReason } = isCancelled();
        if (
          cancelled &&
          cancelReason instanceof QueueError &&
          cancelReason["type"] !== "Stale"
        ) {
          return;
        }
        loadingFn(false);
      }
    };
    const handleBlurNew =
      asyncValidationFn === false
        ? handleBlur
        : e => {
            handleBlur(e);
            setTimeout(() => {
              if (!!syncError.current === false) {
                runAsyncFn(
                  validationWrapper,
                  name,
                  value,
                  asyncValidationFn,
                  setLoading
                );
              }
            }, 500);
          };
    const syncAsyncErrorMsg =
      touched && !!error ? error : touched && !!asyncError ? asyncError : null;
    return (
      <>
        <TextField
          label={label}
          error={!!syncAsyncErrorMsg}
          helperText={syncAsyncErrorMsg}
          onChange={handleChangeDebounce}
          onBlur={handleBlurNew}
          type={type}
          name={name}
          inputRef={inputRef}
          {...others}
        />
        {loading && `🌀`}
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
