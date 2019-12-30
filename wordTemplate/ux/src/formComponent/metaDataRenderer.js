import React from "react";
import { FieldArray } from "formik";
import Button from "@material-ui/core/Button";
import renderField from "./fieldRenderer.js";

const metaDataRendered = (formMetaData, formikBag) => {
  if (Array.isArray(formMetaData)) {
    return formMetaData.map((field, index) => {
      if (field.type === "array") {
        return (
          <FieldArray
            key={field.name}
            name={field.name}
            render={({ push, remove }) => (
              <div>
                {formikBag.values[field.name] &&
                formikBag.values[field.name].length > 0 ? (
                  <>
                    <Button
                      onClick={() => push(generateTempelateRow(field.template))}
                    >
                      Add Field
                    </Button>

                    {formikBag.values[field.name].map((_, index) => (
                      <div key={index}>
                        {renderTemplate(
                          field.template,
                          formikBag,
                          field.name,
                          index
                        )}
                        <Button onClick={() => remove(index)}>Remove</Button>
                      </div>
                    ))}
                  </>
                ) : (
                  <Button
                    onClick={() => push(generateTempelateRow(field.template))}
                  >
                    Add Field
                  </Button>
                )}
              </div>
            )}
          />
        );
      } else {
        return renderField(formikBag, index, field);
      }
    });
  }
  return undefined;
};

export default metaDataRendered;

const renderTemplate = (templateMetaData, formikBag, parent, index) => {
  if (Array.isArray(templateMetaData)) {
    return templateMetaData.map(field => {
      const { name } = field;
      const fieldCopy = { ...field, name: `${parent}[${index}].${name}` };
      return renderField(formikBag, undefined, fieldCopy);
    });
  }
};

const generateTempelateRow = templateMetaData => {
  let obj = {};
  if (Array.isArray(templateMetaData)) {
    for (let i = 0; i < templateMetaData.length; i++) {
      obj[templateMetaData[i].name] = "";
    }
  }
  return obj;
};
