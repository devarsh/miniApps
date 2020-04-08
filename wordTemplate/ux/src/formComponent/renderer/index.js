import { renderField } from "./fieldsRenderer";
export const FormRenderer = ({ fieldsArray }) => {
  const renderMap = fieldsArray.map((field) => renderField(field));
  return renderMap;
};
