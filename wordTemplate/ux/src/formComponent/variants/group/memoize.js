import * as React from "react";
import { setIn, getIn } from "formik";
import equal from "fast-deep-equal";
import { callShowHelper } from "formComponent/componentWrapper";
import { FormRenderer } from "formComponent/renderer";

const MemoizeGroupComponent = Component => {
  return React.memo(Component, (prevProps, nextProps) => {
    if (prevProps.show !== nextProps.show) {
      return false;
    }
    const oldValues = constructValues(
      prevProps.groupMetaData,
      prevProps.groupDepedency,
      prevProps.formikBag,
      prevProps.asyncBag,
      prevProps.formManagerBag,
      prevProps.isVisible
    );
    const newValues = constructValues(
      prevProps.groupMetaData,
      nextProps.groupDepedency,
      nextProps.formikBag,
      nextProps.asyncBag,
      nextProps.formManagerBag,
      nextProps.isVisible
    );
    const result = equal(oldValues, newValues);
    return result;
  });
};

let GroupItem = ({ groupMetaData, isVisible = true }) => {
  if (!isVisible) {
    return null;
  }
  return <FormRenderer fieldsArray={groupMetaData} />;
};

GroupItem = MemoizeGroupComponent(GroupItem);
export { GroupItem };

const constructValues = (
  metaData,
  dependency,
  formikBag,
  asyncBag,
  formManagerBag,
  isVisible
) => {
  if (!Array.isArray(dependency)) {
    return {};
  }
  let newObj = {
    names: {},
    values: {},
    errors: {},
    touched: {},
    asyncErrors: {},
    show: {},
    disabled: false,
    isVisible: isVisible
  };
  for (let i = 0; i < dependency.length; i++) {
    const key = dependency[i];
    const value = getIn(formikBag.values, key);
    const error = getIn(formikBag.errors, key);
    const touched = getIn(formikBag.touched, key);
    const asyncError = getIn(asyncBag.errors, key);
    newObj.names = setIn(newObj.names, key, true);
    newObj.values = setIn(newObj.values, key, value);
    newObj.errors = setIn(newObj.errors, key, error);
    newObj.touched = setIn(newObj.touched, key, touched);
    newObj.asyncErrors = setIn(newObj.asyncErrors, key, asyncError);
    newObj.disabled = formManagerBag.fieldState;
  }
  for (let i = 0; i < metaData.length; i++) {
    const { name, show } = metaData[i];
    if (Array.isArray(show)) {
      const result = callShowHelper(show, formikBag);
      newObj.show = setIn(newObj.show, name, result);
    }
  }
  return newObj;
};
