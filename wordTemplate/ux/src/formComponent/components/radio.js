import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import shallowEqual from "../utils/shallowEqual";
import FormHelperText from "@material-ui/core/FormHelperText";

export const MyRadio = React.memo(
  props => {
    const { label, options, handleBlur, handleChange, mutate } = props;
    const { error, touched, value, name, type } = mutate;
    let radios;
    let { show } = mutate;
    if (show === "" || show === undefined || show === null) {
      show = true;
    }
    if (show === false) {
      return null;
    }
    if (Array.isArray(options)) {
      radios = options.map((currentCheckBox, index) => {
        /* eslint-disable eqeqeq*/
        const ischecked = value == currentCheckBox.value;
        return (
          <FormControlLabel
            key={`${index}-${currentCheckBox.value}`}
            control={
              <Radio
                type={type}
                name={name}
                value={currentCheckBox.value || ""}
                checked={ischecked}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            }
            label={currentCheckBox.label}
          />
        );
      });
    }
    return (
      <>
        <FormLabel error={!!error} component="legend">
          {label}
        </FormLabel>
        <FormGroup row={true}>{radios}</FormGroup>
        <FormHelperText error={touched && !!error}>{error}</FormHelperText>
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
