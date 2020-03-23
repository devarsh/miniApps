export const generateFieldGroupDepedency = fieldsArray => {
  const groupWiseFieldDepedency = {};
  const groupWiseFields = {};
  if (Array.isArray(fieldsArray)) {
    for (let i = 0; i < fieldsArray.length; i++) {
      const field = fieldsArray[i];
      const { group, name, watch } = field;
      if (groupWiseFieldDepedency[group] instanceof Set) {
        groupWiseFieldDepedency[group].add(name);
      } else {
        groupWiseFieldDepedency[group] = new Set([name]);
      }
      if (!!watch) {
        groupWiseFieldDepedency[group].add(watch);
      }
      if (Array.isArray(groupWiseFields[group])) {
        groupWiseFields[group].push(field);
      } else {
        groupWiseFields[group] = [field];
      }
    }
  }
  const keys = Object.keys(groupWiseFieldDepedency);
  for (let i = 0; i < keys.length; i++) {
    groupWiseFieldDepedency[keys[i]] = Array.from(
      groupWiseFieldDepedency[keys[i]]
    );
  }
  return { groupWiseFieldDepedency, groupWiseFields };
};
