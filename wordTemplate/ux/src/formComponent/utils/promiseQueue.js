const DONE = Symbol("done");
const PROMISE = Symbol("promise");
const VALUE = Symbol("value");
const RESULT = Symbol("result");
const ERROR = Symbol("error");
const STARTTIME = Symbol("startTime");
const ENDTIME = Symbol("endTime");
const CANCELFN = Symbol("cancelFn");

const PromiseQueue = () => {
  let _internalQueue = {};
  let interval = null;
  let cacheInvalidateTimeInSeconds = 30;
  let timeoutInSeconds = 60;
  let cleanupIntervalInSeconds = 1;

  const cancelFn = (reason, callback, key, value, others) => {
    const error = {
      path: key,
      value: value,
      others: others,
      error: new Error(reason)
    };
    _internalQueue[key][DONE] = true;
    _internalQueue[key][ENDTIME] = Date.now();
    _internalQueue[key][ERROR] = error;
    callback(error);
  };
  const functionWrapper = (fn, key, value, ...others) => {
    return new Promise(async (res, rej) => {
      try {
        _internalQueue[key] = {
          [DONE]: false,
          [STARTTIME]: Date.now(),
          [VALUE]: value,
          [CANCELFN]: reason => cancelFn(reason, rej, key, value, others)
        };
        let result = await Promise.resolve(fn(key, value, ...others));
        _internalQueue[key][RESULT] = result;
        res(result);
      } catch (e) {
        _internalQueue[key][ERROR] = e;
        rej(e);
      } finally {
        _internalQueue[key][DONE] = true;
        _internalQueue[key][ENDTIME] = Date.now();
      }
    });
  };

  const fetchWrapper = (key, options) => {
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

  const addTask = forced => (fn, key, value, ...others) => {
    startCleanUp();
    const currentPromise = _internalQueue[key];
    if (!forced) {
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
          currentPromise[CANCELFN]("cancelled because you're stale");
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
          _internalQueue[keys[i]][CANCELFN]("cancelled due to timeout");
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

const sleep = seconds => {
  return new Promise(res => {
    setTimeout(() => res(true), seconds * 1000);
  });
};

const fetchResult = async (key, value, timeout) => {
  if (value === "deva") {
    await sleep(timeout);
    return Promise.reject({ err: "fucked eup" });
  } else {
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
  }
};

(function abc() {
  const names = [
    { path: "name", value: "devarsh", timeout: 5 },
    { path: "address", value: "Amit", timeout: 5 },
    { path: "age", value: "aayush", timeout: 7 },
    { path: "address.street1", value: "dvija", timeout: 9 },
    { path: "address.street2", value: "urja", timeout: 7 },
    { path: "phone", value: "chirag", timeout: 12 },
    { path: "email", value: "deva", timeout: 40 },
    { path: "company", value: "Hafiz Mohammad Saeed", timeout: 20 }
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
      { path: "name", value: "devar", timeout: 5 },
      { path: "address", value: "amit", timeout: 5 },
      { path: "age", value: "aayush", timeout: 7 },
      { path: "address.street1", value: "dvija", timeout: 9 },
      { path: "address.street2", value: "urja", timeout: 7 },
      { path: "phone", value: "chirag", timeout: 12 },
      { path: "email", value: "deva", timeout: 3 },
      { path: "company", value: "Hafiz Mohammad Saeed", timeout: 20 }
    ];
    myNames.forEach(one => {
      const { path, value, timeout } = one;
      newQueue
        .addTask(fetchResult, path, value, timeout)
        .then(data => console.log(data))
        .catch(e => console.log("err", e));
    });
  }, 15000);
})();
