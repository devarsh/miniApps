export const showComponent = value => {
  if (value === "" || value === undefined || value === null) {
    return true;
  }
  if (value === false) {
    return false;
  }
};
