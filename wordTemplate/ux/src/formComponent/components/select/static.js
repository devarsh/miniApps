import * as React from "react";
import { MemoizeFieldComponent } from "formComponent/componentWrapper/memoizer";
import { SelectRender, renderMenuItems } from "./common";

let MySelectStatic = ({
  label,
  options,
  handleBlur,
  handleChange,
  type,
  mutate,
  renderBag,
  registerField,
  unregisterField,
  multiple
}) => {
  const { error, touched, value, name, disabled } = mutate;
  React.useEffect(() => {
    registerField(name);
    return () => unregisterField(name);
  }, [registerField, unregisterField, name]);
  const [menuItems] = React.useState(renderMenuItems(options));
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

MySelectStatic = MemoizeFieldComponent(MySelectStatic);
export { MySelectStatic };
