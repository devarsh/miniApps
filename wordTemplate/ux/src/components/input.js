import React from "react";
import TextField from "@material-ui/core/TextField";
import shallowEqual from "../utils/shallowEqual";

export const MyTextField = React.memo(
  props => {
    const { label, handleBlur, handleChange, mutate, ...others } = props;
    const { error, touched, value, name, type } = mutate;
    let { show } = mutate;
    if (show === "" || show === undefined || show === null) {
      show = true;
    }
    if (show === false) {
      return null;
    }
    return (
      <>
        <TextField
          label={label}
          error={touched && !!error}
          helperText={touched && error}
          onChange={e => {
            handleChange(e);
          }}
          onBlur={handleBlur}
          type={type}
          name={name}
          value={value || ""}
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
