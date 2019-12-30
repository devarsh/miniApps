import React from "react";
import TextField from "@material-ui/core/TextField";
import shallowEqual from "../utils/shallowEqual";
import { useDebouncedCallback } from "use-debounce";
const delayTime = 200;
export const MyTextField = React.memo(
  props => {
    const { label, handleBlur, handleChange, mutate, ...others } = props;
    const { error, touched, name, type } = mutate;
    let { show } = mutate;
    if (show === "" || show === undefined || show === null) {
      show = true;
    }
    if (show === false) {
      return null;
    }
    const inputRef = React.useRef(null);
    const [handleChangeDebounce] = useDebouncedCallback(e => {
      const newE = {
        target: {
          value: inputRef.current.value,
          name: name
        }
      };
      console.log(inputRef);
      handleChange(newE);
    }, delayTime);
    return (
      <>
        <TextField
          label={label}
          error={touched && !!error}
          helperText={touched && error}
          onChange={handleChangeDebounce}
          onBlur={handleBlur}
          type={type}
          name={name}
          inputRef={inputRef}
          {...others}
        />
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
