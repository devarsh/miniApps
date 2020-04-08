import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FormikContext, FieldArray, setIn, getIn } from "formik";
import { AsyncContext } from "formComponent/context/useAsync";
import { RenderContext } from "formComponent/context/renderProvider";
import { renderField } from "formComponent/renderer/fieldsRenderer";
import { remove as removeArrayItemAtIndex } from "formComponent/utils/formikArrayUtils";

const generateArrayItemTemplateObject = (template) => {
  let obj = {};
  for (let i = 0; i < template.length; i++) {
    obj[template[i].name] = "";
  }
  return obj;
};

const ArrayItem = ({
  template,
  parent,
  index,
  setAsyncErrors,
  remove,
  renderBag,
}) => {
  if (!Array.isArray(template)) {
    return null;
  }
  const fieldRow = template.map((field) => {
    const { name } = field;
    //DONT try to act smart and remove this line, its required to copy this object and manipulate,
    //its there to prevent actual object manuipulation. I know what I am doing.
    const fieldCopy = { ...field, name: `${parent}[${index}].${name}` };
    return renderField(fieldCopy);
  });
  const btn = (
    <Grid key={`${parent}[${index}].removeBtn`} item {...renderBag.item.size}>
      <Button
        onClick={() => {
          setAsyncErrors((errors) =>
            setIn(
              errors,
              parent,
              removeArrayItemAtIndex(getIn(errors, parent), index)
            )
          );
          remove(index);
        }}
      >
        Remove
      </Button>
    </Grid>
  );
  fieldRow.push(btn);
  return <>{fieldRow}</>;
};

export const ArrayComponent = ({ template, name }) => {
  const asyncBag = React.useContext(AsyncContext);
  const formikBag = React.useContext(FormikContext);
  const renderBag = React.useContext(RenderContext);
  const templateObject = React.useRef(
    generateArrayItemTemplateObject(template)
  );
  const templateFieldValue = formikBag.values[name];
  return (
    <Grid container item xs={12} {...renderBag.container}>
      <FieldArray
        name={name}
        render={({ push, remove }) => {
          if (templateFieldValue && templateFieldValue.length > 0) {
            const result = templateFieldValue.map((_, index) => {
              return (
                <Grid
                  container
                  item
                  xs={12}
                  key={index}
                  {...renderBag.container}
                >
                  <ArrayItem
                    template={template}
                    parent={name}
                    index={index}
                    setAsyncErrors={asyncBag.setErrors}
                    remove={remove}
                    renderBag={renderBag}
                  />
                </Grid>
              );
            });
            return (
              <>
                <Button onClick={() => push(templateObject.current)}>
                  Add Field
                </Button>
                {result}
              </>
            );
          } else {
            return (
              <Button onClick={() => push(templateObject.current)}>
                Add Field
              </Button>
            );
          }
        }}
      />
    </Grid>
  );
};
