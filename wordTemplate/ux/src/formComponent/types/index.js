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
