import * as React from "react";
import { MemoizeFieldComponent } from "formComponent/componentWrapper/memoizer";
import { OptionsType } from "formComponent/types";
import { SelectRender, renderMenuItems } from "./common";

let MySelectDependent = ({
  label,
  handleBlur,
  handleChange,
  type,
  mutate,
  renderBag,
  callback,
  registerField,
  unregisterField,
  multiple
}) => {
  const { error, touched, value, name, watch, disabled } = mutate;
  const [menuItems, setMenuItems] = React.useState(renderMenuItems([]));
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
      let result = callback(watch, multiple);
      if (Promise.resolve(result) === result) {
        result
          .then(data => {
            if (_mounted.current) {
              if (data instanceof OptionsType) {
                let menuItemsList = renderMenuItems(data.getValue());
                setMenuItems(menuItemsList);
              }
            }
          })
          .catch(err => {
            console.log("an error occured:", err);
            if (_mounted.current) {
              let menuItemList = renderMenuItems([]);
              setMenuItems(menuItemList);
            }
          });
      } else {
        console.log("callback should have returned a promise");
        if (_mounted.current) {
          let menuItemList = renderMenuItems([]);
          setMenuItems(menuItemList);
        }
      }
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
  let myVal;
  if (!!value === false) {
    if (multiple) {
      myVal = [];
    } else {
      myVal = "";
    }
  } else {
    myVal = value;
  }
  return (
    <SelectRender
      error={error}
      label={label}
      type={type}
      value={myVal}
      name={name}
      handleChange={handleChange}
      handleBlur={handleBlur}
      touched={touched}
      menuItems={menuItems}
      renderBag={renderBag}
      disabled={disabled}
      multiple={multiple}
    />
  );
};

MySelectDependent = MemoizeFieldComponent(MySelectDependent);
export { MySelectDependent };
