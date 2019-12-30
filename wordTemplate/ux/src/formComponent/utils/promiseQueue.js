/*PromiseQueue
It provides the following functionality
1. Put promises in queue and maintain count of currently executing promises
2. Promise expiration if the timeout has expired
3. Promise caching
   Each Promise is refered by a unique key
   - if promise is already running against that same value, reference of the currently running promise will be provided.
   - if promise is already running the a new value is provided, old promise will be cancel because its result would be 
   stale now, and new promise will be spwaned and the reference would be returned.
   - if promise has already finised executing but if its available in cache, promise result will be returned wrapped in a promise.
*/
const DONE = Symbol("done");
const PROMISE = Symbol("promise");
const VALUE = Symbol("value");
const RESULT = Symbol("result");
const ERROR = Symbol("error");
const STARTTIME = Symbol("startTime");
const ENDTIME = Symbol("endTime");
const CANCELFN = Symbol("cancelFn");

export const ErrorConst = {
  _STALE_: {
    reason: "Stale",
    errorMsg: "promised cancelled becuase promise is stale"
  },
  _RESET_: {
    reason: "Reset",
    errorMsg:
      "cancelling the running promise as queue is about to been reinitialized"
  },
  _TIMEOUT_: {
    reason: "Timeout",
    errorMsg: "promise cancelled becuase it timeout"
  },
  _OTHER_: errorMsg => ({
    reason: "Others",
    errorMsg: errorMsg
  })
};

const defaultConfig = {
  cacheInvalidateTimeInSeconds: 30,
  timeoutInSeconds: 30,
  cleanupIntervalInSeconds: 1
};

const PromiseQueue = (userConfig = {}) => {
  let _internalQueue = {};
  let interval = null;
  const config = { ...userConfig, ...defaultConfig };
  let cacheInvalidateTimeInSeconds = config.cacheInvalidateTimeInSeconds;
  let timeoutInSeconds = config.timeoutInSeconds;
  let cleanupIntervalInSeconds = config.cleanupIntervalInSeconds;
  const errorObjectMaker = (key, value, others, reason) => ({
    path: key,
    value: value,
    others: others,
    error: reason
  });
  const cancelFn = (reason, callback, key, value, others) => {
    const error = errorObjectMaker(key, value, others, reason);
    _internalQueue[key][DONE] = true;
    _internalQueue[key][ENDTIME] = Date.now();
    _internalQueue[key][ERROR] = error;
    callback(error);
  };
  const functionWrapper = (fn, key, value, ...others) => {
    return new Promise(async (res, rej) => {
      let cancelled = false;
      try {
        _internalQueue[key] = {
          [DONE]: false,
          [STARTTIME]: Date.now(),
          [VALUE]: value,
          [CANCELFN]: reason => {
            cancelFn(reason, rej, key, value, others);
            cancelled = true;
          }
        };
        let result = await Promise.resolve(fn(key, value, ...others));
        if (!cancelled) {
          _internalQueue[key][RESULT] = result;
          res(result);
        }
      } catch (e) {
        if (!cancelled) {
          let error;
          if (e && e.path && e.key && e.error) {
            error = e;
          } else {
            if (e instanceof Error) {
              error = errorObjectMaker(
                key,
                value,
                others,
                ErrorConst._OTHER_(e.message)
              );
            } else {
              error = errorObjectMaker(
                key,
                value,
                others,
                ErrorConst._OTHER_(e)
              );
            }
          }
          _internalQueue[key][ERROR] = error;
          rej(error);
        }
      } finally {
        if (!cancelled) {
          _internalQueue[key][DONE] = true;
          _internalQueue[key][ENDTIME] = Date.now();
        }
      }
    });
  };

  const addTask = forced => (fn, key, value, ...others) => {
    startCleanUp();
    if (!forced) {
      const currentPromise = _internalQueue[key];
      if (typeof currentPromise === "object") {
        if (currentPromise[VALUE] === value) {
          if (!currentPromise[DONE]) {
            return currentPromise[PROMISE];
          } else if (currentPromise[DONE]) {
            if (currentPromise[RESULT]) {
              return Promise.resolve(currentPromise[RESULT]);
            }
          }
        } else {
          currentPromise[CANCELFN](ErrorConst._STALE_);
        }
      }
    }
    if (forced) {
      const currentPromise = _internalQueue[key];
      if (typeof currentPromise === "object") {
        if (currentPromise[VALUE] === value) {
          if (!currentPromise[DONE]) {
            currentPromise[CANCELFN](ErrorConst._STALE_);
          }
        }
      }
    }
    let p = functionWrapper(fn, key, value, ...others);
    _internalQueue[key][PROMISE] = p;
    return p;
  };

  const cleanUp = () => {
    let keys = Object.keys(_internalQueue);
    for (let i = 0; i < keys.length; i++) {
      let state = _internalQueue[keys[i]];
      if (state[DONE]) {
        let endtime = new Date(state[ENDTIME]).getTime();
        let currTime = new Date().getTime();
        let inseconds = (currTime - endtime) / 1000;
        if (inseconds > cacheInvalidateTimeInSeconds) {
          delete _internalQueue[keys[i]];
        }
      } else if (!state[DONE]) {
        let startTime = new Date(state[STARTTIME]).getTime();
        let currTime = new Date().getTime();
        let inseconds = (currTime - startTime) / 1000;
        if (inseconds > timeoutInSeconds) {
          _internalQueue[keys[i]][CANCELFN](ErrorConst._TIMEOUT_);
        }
      }
    }
    if (count() === 0) {
      stopCleanUp();
    }
  };
  const activeCount = () => {
    const clonedQueue = { ..._internalQueue };
    let count = 0;
    for (let value of Object.values(clonedQueue)) {
      if (!value.done) {
        count++;
      }
    }
    return count;
  };
  const count = () => {
    let keys = Object.keys(_internalQueue);
    return keys.length;
  };
  const resetQueue = () => {
    let values = Object.values(_internalQueue);
    for (let i = 0; i < values.length; i++) {
      if (!values[i][DONE]) {
        values[i][CANCELFN](ErrorConst._RESET_);
      }
    }
    _internalQueue = {};
  };
  const stopCleanUp = () => {
    clearInterval(interval);
    interval = null;
  };
  const startCleanUp = () => {
    if (interval === null) {
      interval = setInterval(() => cleanUp(), cleanupIntervalInSeconds * 1000);
    }
  };
  return {
    addTask: addTask(false),
    addTaskForced: addTask(true),
    cleanUp,
    activeCount,
    resetQueue,
    startCleanUp,
    stopCleanUp
  };
};

export default PromiseQueue;

/*const fetchWrapper = (key, options) => {
    const { timeout, value } = options;
    return new Promise(async (res, rej) => {
      try {
        const controller = new AbortController();
        const signal = controller.signal;
        const abort = controller.abort.bind(controller);
        _internalQueue[key] = {
          [DONE]: false,
          [STARTTIME]: Date.now(),
          [VALUE]: value,
          [CANCELFN]: () => abort()
        };

        let response = await fetch(
          `http://localhost:8081/error?sleep=${timeout}&name=${value}`,
          { mode: "cors", signal }
        );
        let json = await response.json();
        const result = {
          path: key,
          value: value,
          others: [timeout],
          result: json
        };
        _internalQueue[key][RESULT] = result;
        res(result);
      } catch (e) {
        const error = {};
        if (e.name === "AbortError") {
          error = {
            path: key,
            value: value,
            others: [timeout],
            error: new Error("Stale Promise")
          };
        } else {
          error = {
            path: key,
            value: value,
            others: [timeout],
            error: e
          };
        }
        _internalQueue[key][ERROR] = error;
        rej(error);
      } finally {
        _internalQueue[key][DONE] = true;
        _internalQueue[key][ENDTIME] = Date.now();
      }
    });
  };
*/

const fetchResult = async (key, value, timeout) => {
  try {
    const res = await fetch(
      `http://localhost:8081/error?sleep=${timeout}&name=${value}`,
      { mode: "cors" }
    );
    let data = await res.json();
    return Promise.resolve({
      path: key,
      value: value,
      others: [timeout],
      result: data
    });
  } catch (e) {
    return Promise.reject({
      path: key,
      value: value,
      others: [timeout],
      error: e
    });
  }
};

(function abc() {
  const names = [
    { path: "name", value: "name1", timeout: 5 },
    { path: "address", value: "name2", timeout: 5 },
    { path: "age", value: "name3", timeout: 7 },
    { path: "address.street1", value: "name4", timeout: 9 },
    { path: "address.street2", value: "name5", timeout: 7 },
    { path: "phone", value: "name5", timeout: 12 },
    { path: "email", value: "name6", timeout: 40 },
    { path: "company", value: "name8", timeout: 20 }
  ];
  const newQueue = PromiseQueue();
  names.forEach(one => {
    const { path, value, timeout } = one;
    newQueue
      .addTask(fetchResult, path, value, timeout)
      .then(data => console.log(data))
      .catch(e => console.log("err", e));
  });
  setTimeout(() => {
    const myNames = [
      { path: "name", value: "name1", timeout: 5 },
      { path: "address", value: "name2", timeout: 5 },
      { path: "age", value: "name3", timeout: 7 },
      { path: "address.street1", value: "name4", timeout: 9 },
      { path: "address.street2", value: "name5", timeout: 7 },
      { path: "phone", value: "name6", timeout: 12 },
      { path: "email", value: "name7", timeout: 3 },
      { path: "company", value: "name8", timeout: 20 }
    ];
    myNames.forEach(one => {
      const { path, value, timeout } = one;
      newQueue
        .addTask(fetchResult, path, value, timeout)
        .then(data => console.log(data))
        .catch(e => console.log("err", e));
    });
  }, 5000);
})();
