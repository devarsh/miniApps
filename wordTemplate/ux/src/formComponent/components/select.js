import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import { MemoizeFieldComponent } from "../renderer/memoizer";

const renderMenuItems = options => {
  if (!Array.isArray(options)) {
    options = [];
  }
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
const SelectRender = ({
  error,
  label,
  value,
  name,
  handleChange,
  handleBlur,
  touched,
  menuItems,
  renderBag,
  disabled
}) => {
  const selectLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(selectLabel.current.offsetWidth);
  }, []);
  return (
    <Grid item {...renderBag.gridConfig.item.size}>
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
          value={value || []}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          labelWidth={labelWidth}
        >
          {menuItems}
        </Select>
        {touched && !!error ? <FormHelperText>{error}</FormHelperText> : null}
      </FormControl>
    </Grid>
  );
};

let MySelectStatic = ({
  label,
  options,
  handleBlur,
  handleChange,
  type,
  mutate,
  renderBag,
  registerField,
  unregisterField
}) => {
  const { error, touched, value, name, disabled } = mutate;
  React.useEffect(() => {
    registerField(name);
    return () => unregisterField(name);
  }, [registerField, unregisterField, name]);
  const [menuItems] = React.useState(renderMenuItems(options));
  return (
    <SelectRender
      error={error}
      label={label}
      type={type}
      value={value || ""}
      name={name}
      handleChange={handleChange}
      handleBlur={handleBlur}
      touched={touched}
      menuItems={menuItems}
      renderBag={renderBag}
      disabled={disabled}
    />
  );
};

let MySelectDependent = ({
  label,
  handleBlur,
  handleChange,
  type,
  mutate,
  renderBag,
  callback,
  registerField,
  unregisterField
}) => {
  const { error, touched, value, name, watch, disabled } = mutate;
  const [menuItems, setMenuItems] = React.useState(renderMenuItems(null));
  const _mounted = React.useRef(true);
  /* eslint-disable react-hooks/exhaustive-deps*/
  React.useEffect(() => {
    if (typeof callback === "function" && !!watch) {
      //remove any existing value, since parent checkbox changed and we're dynamic
      handleChange({
        target: {
          value: "",
          name: name
        },
        type: "click"
      });
      callback(watch)
        .then(data => {
          if (_mounted.current) {
            let menuItemsList = renderMenuItems(data);
            setMenuItems(menuItemsList);
          }
        })
        .catch(err => {
          if (_mounted.current) {
            let menuItemList = renderMenuItems(null);
            setMenuItems(menuItemList);
          }
        });
    }
  }, [watch]);
  React.useEffect(() => {
    _mounted.current = true;
    return () => {
      _mounted.current = false;
    };
  }, []);
  React.useEffect(() => {
    registerField(name);
    return () => unregisterField(name);
  }, [registerField, unregisterField, name]);
  return (
    <SelectRender
      error={error}
      label={label}
      type={type}
      value={value || ""}
      name={name}
      handleChange={handleChange}
      handleBlur={handleBlur}
      touched={touched}
      menuItems={menuItems}
      renderBag={renderBag}
      disabled={disabled}
    />
  );
};

MySelectDependent = MemoizeFieldComponent(MySelectDependent);
MySelectStatic = MemoizeFieldComponent(MySelectStatic);
export { MySelectDependent, MySelectStatic };
