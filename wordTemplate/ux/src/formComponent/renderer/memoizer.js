import React from "react";
import shallowEqual from "../utils/shallowEqual";

export const MemoizeFieldComponent = Component => {
  return React.memo(Component, (prevProps, nextProps) => {
    if (
      !shallowEqual(prevProps.mutate, nextProps.mutate) ||
      prevProps.label !== nextProps.label
    ) {
      return false;
    } else {
      return true;
    }
  });
};
