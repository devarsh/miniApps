import * as React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";

export const SelectRender = ({
  error,
  label,
  value,
  name,
  handleChange,
  handleBlur,
  touched,
  menuItems,
  renderBag,
  disabled,
  multiple
}) => {
  const selectLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  /* still need to figure out why label width is not computed at first */
  let offsetWidth = selectLabel.current?.offsetWidth ?? 0;
  React.useEffect(() => {
    setLabelWidth(selectLabel.current.offsetWidth);
  }, [offsetWidth]);
  return (
    <Grid item {...renderBag.item.size}>
      <FormControl
        fullWidth={true}
        variant="outlined"
        error={touched && !!error}
        size="small"
        disabled={disabled}
      >
        <InputLabel
          ref={selectLabel}
          id={`${label}-${name}`}
          error={!!error}
          component="legend"
        >
          {label}
        </InputLabel>
        <Select
          labelId={`${label}-${name}`}
          type={"select"}
          value={value}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          labelWidth={labelWidth}
          multiple={multiple}
        >
          {menuItems}
        </Select>
        {touched && !!error ? <FormHelperText>{error}</FormHelperText> : null}
      </FormControl>
    </Grid>
  );
};

export const renderMenuItems = options => {
  let menuItems = options.map((item, index) => (
    <MenuItem key={`${index}-${item.value}`} value={item.value}>
      {item.label}
    </MenuItem>
  ));
  const dummyMenuItem = (
    <MenuItem key="zeroValue" value="" style={{ display: "none" }}>
      {""}
    </MenuItem>
  );
  return [dummyMenuItem, ...menuItems];
};
