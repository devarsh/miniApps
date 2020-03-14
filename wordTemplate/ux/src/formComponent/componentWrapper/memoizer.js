import React from "react";
import shallowEqual from "formComponent/utils/shallowEqual";
/* For Individual Fields we would use this function to compare */
export const MemoizeFieldComponent = Component => {
  return React.memo(Component, (prevProps, nextProps) => {
    if (!shallowEqual(prevProps.mutate, nextProps.mutate)) {
      return false;
    } else {
      return true;
    }
  });
};
