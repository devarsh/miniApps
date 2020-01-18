import React from "react";
import { FieldArray, setIn, getIn } from "formik";
import { remove as removeAsyncFn } from "./utils/formikArrayUtils";
import Button from "@material-ui/core/Button";
import renderField from "./fieldRenderer.js";

const metaDataRendered = (formMetaData, formikBag, asyncBag) => {
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
                          asyncBag,
                          field.name,
                          index
                        )}
                        <Button
                          onClick={() => {
                            asyncBag.setErrors(errors =>
                              setIn(
                                errors,
                                field.name,
                                removeAsyncFn(getIn(errors, field.name), index)
                              )
                            );
                            remove(index);
                          }}
                        >
                          Remove
                        </Button>
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
        return renderField(formikBag, asyncBag, index, field);
      }
    });
  }
  return undefined;
};

export default metaDataRendered;

const renderTemplate = (
  templateMetaData,
  formikBag,
  asyncBag,
  parent,
  index
) => {
  if (Array.isArray(templateMetaData)) {
    return templateMetaData.map(field => {
      const { name } = field;
      //DONT try to act smart and remove this line, its required to copy this object and manipulate,
      //its there to prevent actual object manuipulation. I know what I am doing.
      const fieldCopy = { ...field, name: `${parent}[${index}].${name}` };
      return renderField(formikBag, asyncBag, undefined, fieldCopy);
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

export const generateFieldGroupDepedency = fields => {
  const groupFieldDepedency = {};
  const groupWiseFields = {};
  if (Array.isArray(fields)) {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const { group, name, watch } = field;
      if (groupFieldDepedency[group] instanceof Set) {
        groupFieldDepedency[group].add(name);
      } else {
        groupFieldDepedency[group] = new Set([name]);
      }
      if (!!watch) {
        groupFieldDepedency[group].add(watch);
      }
      if (Array.isArray(groupWiseFields[group])) {
        groupWiseFields[group].push(field);
      } else {
        groupWiseFields[group] = [field];
      }
    }
  }
  const keys = Object.keys(groupFieldDepedency);
  for (let i = 0; i < keys.length; i++) {
    groupFieldDepedency[keys[i]] = Array.from(groupFieldDepedency[keys[i]]);
  }
  return { groupFieldDepedency, groupWiseFields };
};
