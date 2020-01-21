import React from "react";
import { merge } from "lodash";

export const RenderContext = React.createContext(null);

export const RenderProvider = ({ render, children }) => {
  if (!typeof render === "object") {
    render = {};
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
  const finalConfig = merge(render, defaultConfig);
  return (
    <RenderContext.Provider value={finalConfig}>
      {children}
    </RenderContext.Provider>
  );
};
