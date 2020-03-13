import React from "react";
import { getIn, setIn } from "formik";

import { asyncValidationWrapper } from "../components/utils";

export const FormManagerContext = React.createContext(null);
FormManagerContext.displayName = "FormManagerContext";
export const FormManagerProvider = FormManagerContext.Provider;

const isError = (fieldRegister = [], errorBag = {}) => {
  for (let i = 0; i < fieldRegister.length; i++) {
    const { name } = fieldRegister[i];
    const error = getIn(errorBag, name, false);
    if (error !== false) {
      return true;
    }
  }
  return false;
};

const touchAll = (fieldRegister = []) => {
  let obj = {};
  for (let i = 0; i < fieldRegister.length; i++) {
    const { name } = fieldRegister[i];
    obj = setIn(obj, name, true);
  }
  return obj;
};

const runAsyncErrors = async (fieldRegister = [], asyncBag, formikBag) => {
  let errorResult = {};
  for (let i = 0; i < fieldRegister.length; i++) {
    const { asyncValidation, name } = fieldRegister[i];
    if (typeof asyncValidation === "function") {
      const value = getIn(formikBag.values, name);
      let result = await asyncBag.putTaskOnQueue(
        asyncValidationWrapper,
        name,
        value,
        asyncValidation
      );
      if (result !== null) {
        if (result === "") {
          errorResult = setIn(errorResult, name, undefined);
        } else {
          errorResult = setIn(errorResult, name, result);
        }
      }
    }
  }
  await asyncBag.waitForEnd();
  return Promise.resolve(errorResult);
};

export const useFormManager = (formikBag, asyncBag, isDisabled = false) => {
  const fieldRegister = React.useRef([]);
  const registerField = React.useCallback((name, asyncValidation = false) => {
    fieldRegister.current.push({ name, asyncValidation });
  }, []);
  const unregisterField = React.useCallback(name => {
    fieldRegister.current = fieldRegister.current.filter(val => {
      return val.name === name ? false : true;
    });
  }, []);
  const [fieldState, setfieldState] = React.useState(isDisabled);
  const handleSubmit = async () => {
    const staticErrors = await formikBag.validateForm();
    const result = isError(fieldRegister.current, staticErrors);
    if (result) {
      const newTouched = touchAll(fieldRegister.current);
      formikBag.setTouched(newTouched);
    } else {
      const asyncErrors = await runAsyncErrors(
        fieldRegister.current,
        asyncBag,
        formikBag
      );
      const result = isError(fieldRegister.current, asyncErrors);
      if (result) {
        const newTouched = touchAll(fieldRegister.current);
        formikBag.setTouched(newTouched);
        asyncBag.setErrors(asyncErrors);
      } else {
        console.log("form submitted");
      }
    }
  };
  const resetForm = () => {
    formikBag.resetForm({});
    console.log(asyncBag);
    asyncBag.reset();
  };
  return {
    registerField,
    unregisterField,
    handleSubmit,
    fieldState,
    setfieldState,
    resetForm
  };
};

/*
const getUntouchedAsyncFields = fieldRegister.current.filter(field => {
      const touched = getIn(formikBag.touched, field.name, false);
      if (!touched && field.asyncValidation) {
        return true;
      }
      return false;
    });
    console.log(getUntouchedAsyncFields);
*/
