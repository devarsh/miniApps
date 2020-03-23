import { renderField } from "./fieldsRenderer";
export const FormRenderer = ({ fieldsArray }) => {
  const renderMap = fieldsArray.map((field, index) => {
    return renderField(field, index);
  });
  return renderMap;
};
