import PromiseQueue from "./utils/promiseQueue";
import { setIn } from "formik";
import React from "react";

const AsyncContext = React.createContext();

function AsyncPromiseQueueContextProvider({ globalErrorHandler, children }) {
  const [errors, setErrors] = React.useState({});
  const queue = PromiseQueue();
  const handler =
    typeof globalErrorHandler === "function" ? globalErrorHandler : e => {};
  const runAsyncValidation = async (fn, key, value, ...others) => {
    try {
      let data = await queue.addTask(fn, key, value, ...others);
      if (data["error"]) {
        setErrors(setIn(errors, key, data["error"]));
      } else {
        setErrors(setIn(errors, key, undefined));
      }
    } catch (e) {
      handler(e);
    }
  };
  return (
    <React.Provider runAsyncValidation={runAsyncValidation}>
      {children}
    </React.Provider>
  );
}
