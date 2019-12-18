import React, { useEffect } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import shallowEqual from "../utils/shallowEqual";
import FormHelperText from "@material-ui/core/FormHelperText";

const renderMenuItems = options => {
  if (Array.isArray(options)) {
    let menuItems = options.map((item, index) => (
      <MenuItem key={`${index}-${item.value}`} value={item.value}>
        {item.label}
      </MenuItem>
    ));
    return menuItems;
  }
  return undefined;
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
  props => {
    const { label, options, handleBlur, handleChange, mutate } = props;
    const { error, touched, value, name, type } = mutate;
    let menuItems = renderMenuItems(options);
    let { show } = mutate;
    if (show === "" || show === undefined || show === null) {
      show = true;
    }
    if (show === false) {
      return null;
    }
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
  props => {
    const { label, handleBlur, handleChange, mutate, callback } = props;
    const { error, touched, value, name, type, watch } = mutate;
    const [menuItems, setMenuItems] = React.useState(undefined);
    const _mounted = React.useRef(true);
    let { show } = mutate;
    if (show === "" || show === undefined || show === null) {
      show = true;
    }
    if (show === false) {
      return null;
    }
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
              let menuItemList = renderMenuItems([
                { value: "", label: "None" }
              ]);
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
