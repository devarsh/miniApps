import React from "react";
import { setIn, getIn } from "formik";
import toPath from "lodash/toPath";
import PromiseQueue from "formComponent/utils/promiseQueue";

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
      const error = await queue.addTask(fn, key, value, ...others);
      if (typeof error === "string") {
        return error;
      } else {
        console.log("error is not of type string", error);
        return "unexpected error occurred";
      }
    } catch (e) {
      console.log(e);
      return "unexpected error occured";
    }
  };

  const handleTask = (key, error) => {
    if (error !== "") {
      setErrors(oldError => setIn(oldError, key, error));
    } else {
      setErrors(oldError => {
        oldError = setIn(oldError, key, undefined);
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
    if (error !== null) {
      handleTask(key, error);
    }
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
