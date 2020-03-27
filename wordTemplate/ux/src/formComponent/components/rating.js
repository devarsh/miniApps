import * as React from "react";
import Rating from "@material-ui/lab/Rating";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import { MemoizeFieldComponent } from "formComponent/componentWrapper/memoizer";

let MyRating = ({
  label,
  handleChange,
  mutate,
  type,
  renderBag,
  registerField,
  unregisterField,
  max = 5,
  precision = 0.5
}) => {
  const { value, name, disabled } = mutate;
  React.useEffect(() => {
    registerField(name);
    return () => unregisterField(name);
  }, [registerField, unregisterField, name]);
  return (
    <Grid item {...renderBag.item.size}>
      <FormLabel component="legend" style={{ lineHeight: "inherit" }}>
        {label}
      </FormLabel>
      <Rating
        name={name}
        value={value}
        disabled={disabled}
        max={max}
        precision={precision}
        onChange={(event, newValue) => {
          handleChange({
            target: {
              name: name,
              value: newValue
            }
          });
        }}
        size="small"
      />
    </Grid>
  );
};

MyRating = MemoizeFieldComponent(MyRating);
export { MyRating };
