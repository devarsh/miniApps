import React from "react";
import merge from "lodash/merge";

export const RenderContext = React.createContext(null);
RenderContext.displayName = "RenderContext";

export const RenderProvider = ({ value, children }) => {
  const defaultGridConfig = {
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
  };
  const finalConfig = merge({}, defaultGridConfig, value);
  return (
    <RenderContext.Provider value={finalConfig}>
      {children}
    </RenderContext.Provider>
  );
};
