import React, { useEffect } from "react";
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
  type,
  value,
  name,
  handleChange,
  handleBlur,
  touched,
  menuItems,
  renderBag
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
          type={type}
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

export const MySelectStatic = MemoizeFieldComponent(
  ({ label, options, handleBlur, handleChange, type, mutate, renderBag }) => {
    if (mutate["show"] === false) {
      return;
    }
    const { error, touched, value, name } = mutate;
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
      />
    );
  }
);

export const MySelectDependent = MemoizeFieldComponent(
  ({ label, handleBlur, handleChange, type, mutate, renderBag, callback }) => {
    if (mutate["show"] === false) {
      return;
    }
    const { error, touched, value, name, watch } = mutate;
    const [menuItems, setMenuItems] = React.useState(renderMenuItems(null));
    const _mounted = React.useRef(true);
    /* eslint-disable react-hooks/exhaustive-deps*/
    useEffect(() => {
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
    useEffect(() => {
      _mounted.current = true;
      return () => {
        _mounted.current = false;
      };
    });
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
      />
    );
  }
);
