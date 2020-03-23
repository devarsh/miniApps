function getFieldsName(fieldArray = [], parent = "") {
  if (Array.isArray(fieldArray)) {
    let fields = [];
    for (let i = 0; i < fieldArray.length; i++) {
      const field = fieldArray[i];
      const name = field?.name;
      const type = field?.type ?? "";
      if (type !== "") {
        if (type === "array") {
          const childFieldArray = field?.template;
          let result = getFieldsName(childFieldArray, name);
          fields = [...fields, ...result];
        } else {
          if (parent !== "") {
            fields.push(`${parent}.${name}`);
          } else {
            fields.push(name);
          }
        }
      }
    }
    return fields;
  }
  return [];
}

export function validateWatcher(watchField) {
  let context = this?.options?.context ?? {};
  if (!!watchField === false) {
    return true;
  }
  const fieldsArray = context?.fields ?? [];
  let fieldNames = getFieldsName(fieldsArray);
  let result = fieldNames.indexOf(watchField) >= 0 ? true : false;
  return result;
}

export function isFunctionNotRequired(fieldValue) {
  if (fieldValue === null || fieldValue === undefined) {
    return true;
  }
  if (typeof fieldValue === "function") {
    return true;
  }
  return false;
}
