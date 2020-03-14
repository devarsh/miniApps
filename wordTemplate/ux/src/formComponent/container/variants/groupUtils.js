import React from "react";
import { setIn, getIn } from "formik";
import equal from "fast-deep-equal";

export const generateFieldGroupDepedency = fieldsMetaData => {
  const groupFieldDepedency = {};
  const groupWiseFields = {};
  if (Array.isArray(fieldsMetaData)) {
    for (let i = 0; i < fieldsMetaData.length; i++) {
      const field = fieldsMetaData[i];
      const { group, name, watch, show } = field;
      if (groupFieldDepedency[group] instanceof Set) {
        groupFieldDepedency[group].add(name);
      } else {
        groupFieldDepedency[group] = new Set([name]);
      }
      if (!!watch) {
        groupFieldDepedency[group].add(watch);
      }
      if (Array.isArray(groupWiseFields[group])) {
        groupWiseFields[group].push(field);
      } else {
        groupWiseFields[group] = [field];
      }
    }
  }
  const keys = Object.keys(groupFieldDepedency);
  for (let i = 0; i < keys.length; i++) {
    groupFieldDepedency[keys[i]] = Array.from(groupFieldDepedency[keys[i]]);
  }
  return { groupFieldDepedency, groupWiseFields };
};

const constructValues = (dependency, formikBag, asyncBag) => {
  if (!Array.isArray(dependency)) {
    return {};
  }
  let newObj = { names: {}, values: {}, errors: {}, touched: {}, async: {} };
  for (let i = 0; i < dependency.length; i++) {
    const key = dependency[i];
    const value = getIn(formikBag.values, key);
    const error = getIn(formikBag.errors, key);
    const touched = getIn(formikBag.touched, key);
    const async = getIn(asyncBag.errors, key);
    newObj.values = setIn(newObj.values, key, value);
    newObj.errors = setIn(newObj.errors, key, error);
    newObj.touched = setIn(newObj.touched, key, touched);
    newObj.async = setIn(newObj.async, key, async);
  }
  return newObj;
};

export const MemoizeGroupComponent = Component => {
  return React.memo(Component, (prevProps, nextProps) => {
    if (prevProps.show !== nextProps.show) {
      return false;
    }
    const oldValues = constructValues(
      prevProps.groupDepedency,
      prevProps.formikBag,
      prevProps.asyncBag
    );
    const newValues = constructValues(
      nextProps.groupDepedency,
      nextProps.formikBag,
      nextProps.asyncBag
    );
    const result = equal(oldValues, newValues);
    return result;
  });
};
