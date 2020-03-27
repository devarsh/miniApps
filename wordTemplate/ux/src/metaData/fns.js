import { ValidationErrorType, OptionsType } from "formComponent/types";

export const makeAsyncRequest = value => {
  return new Promise(async (res, rej) => {
    try {
      let response = await fetch(`http://localhost:8081/values?name=${value}`);
      let json = await response.json();
      let data = Object.values(json.result);
      let options = new OptionsType(data);
      res(options);
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

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
export const fetchAutoCompleteData = async currentValue => {
  const response = await fetch(
    "https://country.register.gov.uk/records.json?page-size=5000"
  );
  await sleep(1e3);
  const countries = await response.json();
  return Object.keys(countries).map(key => countries[key].item[0]);
};
