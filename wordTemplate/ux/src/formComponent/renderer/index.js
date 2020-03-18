import { renderField } from "./fieldsRenderer";
export const FormRenderer = ({ fieldsArray }) => {
  if (Array.isArray(fieldsArray)) {
    const renderMap = fieldsArray.map((field, index) => {
      return renderField(field, index);
    });
    return renderMap;
  }
  return null;
};
