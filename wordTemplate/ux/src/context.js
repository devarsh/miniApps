import PromiseQueue from "./formComponent/utils/promiseQueue";
import { setIn } from "formik";
import React from "react";

const AsyncRunner = React.createContext(null);

const AsyncContext = ({ children }) => {
  const [errors, setErrors] = React.useState("");
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

  const runner = forced => async (fn, key, value, ...others) => {
    try {
      let data;
      if (forced) {
        data = await queue.addTaskForced(fn, key, value, ...others);
      } else {
        data = await queue.addTask(fn, key, value, ...others);
      }
      if (data && data.error) {
        const { error } = data;
        if (typeof error === "string") {
          setErrors(setIn(errors, key, error));
        } else if (typeof error === "object") {
          if (error && error.reason && error.errorMsg) {
            const { reason, errorMsg } = error;
            if (["stale", "timeout", "rest"].indexOf(reason) >= 0) {
              console.log(key, value, errorMsg);
            }
          }
        }
      } else {
        setErrors(setIn(errors, key, undefined));
      }
    } catch (e) {
      handler(e);
    }
  };
  return (
    <AsyncRunner.Provider
      value={{
        run: runner(false),
        runForced: runner(true),
        error,
        count: queue.activeCount,
        reset: queue.resetQueue,
        completed: completed
      }}
    >
      {children}
    </AsyncRunner.Provider>
  );
};

const DemoContext = () => {
  const value = React.useContext(AsyncRunner);

  return (
    <div>
      <input type="text" ref={myRef} />
      <h1>{!!value ? `${value}!` : ""} </h1>
      <button
        onClick={() => {
          setValue(myRef.current.value);
        }}
      >
        Update
      </button>
    </div>
  );
};

export default () => (
  <DummyValueProvider>
    <DemoContext />
  </DummyValueProvider>
);
