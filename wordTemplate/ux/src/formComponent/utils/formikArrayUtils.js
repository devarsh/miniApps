import { isFunction } from "formik";

export const copyArrayLike = arrayLike => {
  if (!arrayLike) {
    return [];
  } else if (Array.isArray(arrayLike)) {
    return [...arrayLike];
  } else {
    const maxIndex = Object.keys(arrayLike)
      .map(key => parseInt(key))
      .reduce((max, el) => (el > max ? el : max), 0);
    return Array.from({ ...arrayLike, length: maxIndex + 1 });
  }
};

export const remove = (array = [], index) => {
  let result;
  const copy = array ? copyArrayLike(array) : [];
  if (!result) {
    result = copy[index];
  }
  if (isFunction(copy.splice)) {
    copy.splice(index, 1);
  }
  return copy;
};
