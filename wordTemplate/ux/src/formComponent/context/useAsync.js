import React from "react";
import { setIn, getIn } from "formik";
import toPath from "lodash/toPath";
import PromiseQueue from "formComponent/utils/promiseQueue";
import { ValidationErrorType } from "formComponent/types";

export const AsyncContext = React.createContext({});
AsyncContext.displayName = "AsyncContext";
export const AsyncProvider = AsyncContext.Provider;

const useAsync = () => {
  const [errors, setErrors] = React.useState({});
  const queueRef = React.useRef(null);
  function getInstance() {
    let instance = queueRef.current;
    if (instance !== null) {
      return instance;
    }
    let newInstance = PromiseQueue();
    queueRef.current = newInstance;
    return newInstance;
  }
  const queue = getInstance();

  const putTaskOnQueue = async (fn, key, value, ...others) => {
    try {
      const result = await queue.addTask(fn, key, value, ...others);
      if (!(result instanceof ValidationErrorType)) {
        console.log(
          "invalid error type returned expected error of ValidationErrorType, check validationMethod passed"
        );
        return "unexpected error occured while validating";
      } else {
        let result = result.getError(undefined);
        return result;
      }
    } catch (e) {
      console.log(e);
      return "unexpected error occured while validating";
    }
  };

  const handleTask = (key, error) => {
    if (error !== undefined) {
      setErrors(oldError => setIn(oldError, key, error));
    } else {
      setErrors(oldError => {
        oldError = setIn(oldError, key, error);
        let path = toPath(key);
        if (path.length >= 2) {
          path = path.slice(0, path.length - 1);
          const newKey = path.join(".");
          const result = getIn(oldError, newKey);
          if (typeof result === "object") {
            if (!Object.keys(result).length > 0) {
              oldError = setIn(oldError, newKey, undefined);
            }
          }
        }
        return oldError;
      });
    }
  };

  const _runner = async (fn, key, value, ...others) => {
    const error = await putTaskOnQueue(fn, key, value, ...others);
    handleTask(key, error);
  };

  const resetAsyncError = () => {
    queue.resetQueue();
    setErrors({});
  };

  return {
    errors,
    setErrors,
    runner: _runner,
    count: queue.activeCount,
    reset: resetAsyncError,
    putTaskOnQueue: putTaskOnQueue,
    waitAll: queue.waitAll
  };
};

export default useAsync;
