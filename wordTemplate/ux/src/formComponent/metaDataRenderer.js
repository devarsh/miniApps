import React from "react";
import { FieldArray, setIn, getIn } from "formik";
import { remove as removeAsyncFn } from "./utils/formikArrayUtils";
import Button from "@material-ui/core/Button";
import renderField from "./fieldRenderer.js";
import Grid from "@material-ui/core/Grid";
import { RenderContext } from "./renderProvider";

const MetaDataRendered = ({ fieldMetaData, formikBag, asyncBag }) => {
  let renderMap = [];
  const renderConfig = React.useContext(RenderContext);
  if (Array.isArray(fieldMetaData)) {
    renderMap = fieldMetaData.map((field, index) => {
      if (field.type === "array") {
        return (
          <Grid
            container
            item
            xs={12}
            key={field.name}
            {...renderConfig.gridConfig.container}
          >
            <FieldArray
              key={field.name}
              name={field.name}
              render={({ push, remove }) => (
                <>
                  {formikBag.values[field.name] &&
                  formikBag.values[field.name].length > 0 ? (
                    <>
                      <Button
                        onClick={() =>
                          push(generateTempelateRow(field.template))
                        }
                      >
                        Add Field
                      </Button>
                      {formikBag.values[field.name].map((_, index) => (
                        <Grid
                          container
                          item
                          xs={12}
                          key={index}
                          {...renderConfig.gridConfig.container}
                        >
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
                                  removeAsyncFn(
                                    getIn(errors, field.name),
                                    index
                                  )
                                )
                              );
                              remove(index);
                            }}
                          >
                            Remove
                          </Button>
                        </Grid>
                      ))}
                    </>
                  ) : (
                    <Button
                      onClick={() => push(generateTempelateRow(field.template))}
                    >
                      Add Field
                    </Button>
                  )}
                </>
              )}
            />
          </Grid>
        );
      } else {
        return renderField(formikBag, asyncBag, index, field);
      }
    });
  } else {
    renderMap = null;
  }
  console.log(renderConfig);
  return (
    <Grid container {...renderConfig.gridConfig.container}>
      {renderMap}
    </Grid>
  );
};

export default MetaDataRendered;

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
