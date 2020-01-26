import React from "react";
import { setIn, getIn } from "formik";
import toPath from "lodash/toPath";
import PromiseQueue from "../utils/promiseQueue";

export const AsyncContext = React.createContext({});
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

  const _runner = async (fn, key, value, ...others) => {
    try {
      const error = await queue.addTask(fn, key, value, ...others);
      if (typeof error === "string") {
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
      } else {
        console.log("error is not of type string", error);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return {
    errors,
    setErrors,
    runner: _runner,
    count: queue.activeCount,
    rest: queue.reset
  };
};

export default useAsync;
