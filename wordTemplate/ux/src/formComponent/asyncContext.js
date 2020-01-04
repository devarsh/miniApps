import PromiseQueue, { QueueError } from "./utils/promiseQueue";
import { setIn } from "formik";
import React from "react";

export const AsyncContext = React.createContext(null);

const AsyncProvider = ({ children }) => {
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
          setErrors(oldError => setIn(oldError, key, undefined));
        }
      } else {
        console.log("error is not of type string", error);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AsyncContext.Provider
      value={{
        runner: _runner,
        errors,
        count: queue.activeCount,
        reset: queue.resetQueue
      }}
    >
      {children}
    </AsyncContext.Provider>
  );
};

export default AsyncProvider;
