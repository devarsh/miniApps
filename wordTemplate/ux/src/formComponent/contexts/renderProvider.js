import React from "react";
import merge from "lodash/merge";

export const RenderContext = React.createContext(null);

export const RenderProvider = ({ value, children }) => {
  if (!typeof value === "object") {
    value = {};
  }
  const defaultConfig = {
    gridConfig: {
      item: {
        size: {
          xs: 12,
          sm: 3,
          md: 3
        }
      },
      container: {
        direction: "row",
        spacing: 2
      }
    }
  };
  const finalConfig = merge({}, defaultConfig, value);
  return (
    <RenderContext.Provider value={finalConfig}>
      {children}
    </RenderContext.Provider>
  );
};
