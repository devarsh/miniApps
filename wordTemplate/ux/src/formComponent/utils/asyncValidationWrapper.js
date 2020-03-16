import { QueueError } from "./promiseQueue";

//first argument `isCancelled` will be passed by promiseQueue Manager
export const asyncValidationWrapper = async (
  isCancelled,
  key,
  value,
  validationFn,
  loadingFn = () => {}
) => {
  try {
    loadingFn(true);
    const res = await validationFn(key, value, 2);
    return Promise.resolve(res);
  } catch (e) {
    return Promise.resolve(e);
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
