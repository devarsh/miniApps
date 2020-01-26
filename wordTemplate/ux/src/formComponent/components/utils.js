import { QueueError } from "../utils/promiseQueue";

//first argument `isCancelled` will be passed by promiseQueue Manager
export const asyncValidationWrapper = async (
  isCancelled,
  key,
  value,
  validationFn,
  loadingFn,
  timeout = 2
) => {
  try {
    loadingFn(true);
    const res = await validationFn(key, value, timeout);
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  } finally {
    const { cancelled, cancelReason } = isCancelled();
    if (
      cancelled &&
      cancelReason instanceof QueueError &&
      cancelReason["type"] !== "Stale"
    ) {
      return;
    }
    loadingFn(false);
  }
};

export const isChecked = (currentValues, value) => {
  if (Array.isArray(currentValues)) {
    return currentValues.indexOf(value) < 0 ? false : true;
  }
  return false;
};
