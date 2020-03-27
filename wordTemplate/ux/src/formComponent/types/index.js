import { ValidationError } from "yup";
import * as yup from "yup";

export class OptionsType {
  #result = null;
  constructor(options) {
    try {
      let optionsSchema = yup
        .array()
        .required()
        .of(
          yup.object().shape({
            value: yup.lazy(value => {
              switch (typeof value) {
                case "number":
                  return yup.number().required();
                default:
                  return yup.string().required();
              }
            }),
            label: yup.string().required()
          })
        );
      let result = optionsSchema.validateSync(options, {
        abortEarly: false,
        strict: true
      });
      this.#result = result;
    } catch (e) {
      throw e;
    }
  }
  getValue() {
    return this.#result;
  }
}

export class MetaDataSchemaValidatorType {
  #result = null;
  #iserror = false;
  constructor(result) {
    if (result instanceof ValidationError) {
      this.#iserror = true;
      this.#result = result?.errors;
    } else if (typeof result === "object") {
      this.#iserror = false;
      this.#result = result;
    } else {
      throw new Error("MetaDataSchemaValidatorType: Not a valid type passed");
    }
  }
  isError() {
    return this.#iserror;
  }
  getValue() {
    return this.#result;
  }
}

export class ValidationErrorType {
  #result = null;
  constructor(result) {
    if (result === null) {
      throw new Error("ValidationType: Cannot be instianted empty");
    }
    if (!(result instanceof Error || typeof result === "string")) {
      throw new Error(
        "ValidationType: constructor can take a string or Error type"
      );
    }
    this.#result = result;
  }
  getError(emptyValue = "") {
    if (typeof this.#result === "string") {
      if (this.#result === "") {
        return emptyValue;
      } else {
        return this.#result;
      }
    } else {
      throw this.#result;
    }
  }
}

export class BoolType {
  #result = true;
  constructor(result) {
    if (typeof result === "boolean") {
      this.#result = result;
      return;
    }
    if (result === null || result === undefined) {
      this.#result = true;
      return;
    }
    if (typeof result === "string") {
      if (result === "true" || result === "1") {
        this.#result = true;
      } else if (result === "false" || result === "0") {
        this.#result = false;
      } else {
        this.#result = true;
      }
      return;
    }
    if (typeof result === "number") {
      if (result !== 0) {
        this.#result = true;
      } else {
        this.#result = false;
      }
      return;
    }
    this.#result = true;
  }
  getResult() {
    return this.#result;
  }
}
