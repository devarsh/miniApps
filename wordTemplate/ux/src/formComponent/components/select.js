import React, { useEffect } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import shallowEqual from "../utils/shallowEqual";
import FormHelperText from "@material-ui/core/FormHelperText";
import { showComponent } from "./utils";

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
  menuItems
}) => (
  <>
    <FormLabel error={!!error} component="legend">
      {label}
    </FormLabel>
    <Select
      type={type}
      value={value || []}
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
    >
      {menuItems}
    </Select>
    <FormHelperText error={touched && !!error}>{error}</FormHelperText>
  </>
);

export const MySelectStatic = React.memo(
  ({ label, options, handleBlur, handleChange, type, mutate }) => {
    if (showComponent(mutate["show"]) === false) {
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
      />
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

export const MySelectDependent = React.memo(
  ({ label, handleBlur, handleChange, type, mutate, callback }) => {
    if (showComponent(mutate["show"]) === false) {
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
      />
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
