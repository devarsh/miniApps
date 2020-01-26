import React from "react";
import invariant from "tiny-warning";
import { FormikContext, getIn } from "formik";
import { AsyncContext } from "../contexts/useAsync";
import { RenderContext } from "../contexts/renderProvider";
import { showComponent } from "../utils/showComponent";

const useFieldBag = (type, name, others = {}) => {
  invariant(!!name, "name is required");
  invariant(!!type, "type is required");
  const asyncBag = React.useContext(AsyncContext);
  const formikBag = React.useContext(FormikContext);
  const renderBag = React.useContext(RenderContext);
  const fieldBag = {
    mutate: {
      name: name,
      value: getIn(formikBag.values, name),
      error: getIn(formikBag.errors, name),
      touched: getIn(formikBag.touched, name),
      asyncError: getIn(asyncBag.errors, name)
    },
    type: type,
    handleBlur: formikBag.handleBlur,
    handleChange: formikBag.handleChange,
    runAsyncFn: asyncBag.runner,
    renderBag: renderBag
  };
  const { watch, show } = others;
  if (!!watch) {
    fieldBag.mutate.watch = getIn(formikBag.values, watch);
  }
  if (Array.isArray(show) && show.length === 2) {
    const [callback, watcher] = show;
    const value = getIn(formikBag.values, watcher);
    const result = callback(value);
    fieldBag.mutate.show = showComponent(result);
  }
  return fieldBag;
};

export const FieldBagWrapper = ({ type, name, others, children, ...rest }) => {
  const fieldBag = useFieldBag(type, name, others);
  return React.cloneElement(children, { ...rest, ...fieldBag });
};
