export const showComponent = value => {
  if (typeof value === "boolean") {
    return value;
  } else if (
    value === "" ||
    value === undefined ||
    value === null ||
    value === "true"
  ) {
    return true;
  } else if (value === "false") {
    return false;
  } else {
    return true;
  }
};
