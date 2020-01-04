import AsyncProvider, { AsyncContext } from "./formComponent/asyncContext";
import React from "react";

const DemoComponent = () => {
  const { runner, errors, count } = React.useContext(AsyncContext);
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [text, setText] = React.useState("");
  const [text2, setText2] = React.useState("");
  const [counter, setCounter] = React.useState(0);
  const makeRequest = async (isCancelled, key, value, timeout, loadingFn) => {
    try {
      loadingFn(true);
      const res = await fetch(
        `http://localhost:8081/error?sleep=${timeout}&name=${value}`,
        { mode: "cors" }
      );
      let data = await res.json();
      if (data && data.error) {
        return Promise.resolve(data.error);
      } else {
        return Promise.resolve("");
      }
    } catch (e) {
      return Promise.reject(e);
    } finally {
      if (!isCancelled()) {
        loadingFn(false);
      }
    }
  };
  return (
    <div>
      <div>
        <input
          name="name"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => runner(makeRequest, "name", text, 5, setLoading)}
        />
        {loading && `🌀`}
      </div>
      <div>
        <input
          name="name2"
          type="text"
          value={text2}
          onChange={e => setText2(e.target.value)}
          onBlur={() => runner(makeRequest, "name2", text2, 3, setLoading2)}
        />
        {loading2 && `🌀`}
      </div>
      <button onClick={() => setCounter(count())}>GetCount</button>
      <div>Count:{counter}</div>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </div>
  );
};

export default () => (
  <AsyncProvider>
    <DemoComponent />
  </AsyncProvider>
);
