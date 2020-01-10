import invariant from "tiny-warning";
import { getIn } from "formik";

const fieldBag = (formikBag, asyncBag, type, name, others = {}) => {
  invariant(typeof formikBag === "object", "Invalid object passed");
  invariant(!!name, "name is required");
  invariant(!!type, "type is required");
  const fieldBag = {
    mutate: {
      value: getIn(formikBag.values, name),
      error: getIn(formikBag.errors, name),
      touched: getIn(formikBag.touched, name),
      asyncError: getIn(asyncBag.errors, name),
      name: name,
      type: type
    },
    handleBlur: formikBag.handleBlur,
    handleChange: formikBag.handleChange,
    runAsyncFn: asyncBag.runner
  };
  const { watch, show } = others;
  if (!!watch) {
    fieldBag.mutate.watch = getIn(formikBag.values, watch);
  }
  if (Array.isArray(show) && show.length === 2) {
    const [callback, watcher] = show;
    const value = getIn(formikBag.values, watcher);
    const result = callback(value);
    fieldBag.mutate.show = result;
  }
  return fieldBag;
};

export default fieldBag;
