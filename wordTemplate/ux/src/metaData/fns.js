import { ValidationErrorType } from "formComponent/types";

export const makeAsyncRequest = value => {
  return new Promise(async (res, rej) => {
    try {
      let response = await fetch(`http://localhost:8081/values?name=${value}`);
      let json = await response.json();
      let data = Object.values(json.result);
      res(data);
    } catch (e) {
      rej(e);
    }
  });
};

export const asyncValidationHandler = async (fieldName, value, timeout) => {
  try {
    const res = await fetch(
      `http://localhost:8081/error?sleep=${timeout}&name=${value}`,
      { mode: "cors" }
    );
    let data = await res.json();
    //check if error property exist on data and if not return empty string
    let result = data?.error ?? "";
    let errorWrapper = new ValidationErrorType(result);
    return Promise.resolve(errorWrapper);
  } catch (e) {
    let errorWrapper = new ValidationErrorType(e);
    return Promise.resolve(errorWrapper);
  }
};
