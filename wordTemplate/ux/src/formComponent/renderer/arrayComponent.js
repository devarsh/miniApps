import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FormikContext, FieldArray, setIn, getIn } from "formik";
import { AsyncContext } from "../contexts/useAsync";
import { RenderContext } from "../contexts/renderProvider";
import { renderField } from "./fieldRenderer.js";
import { remove as removeAsyncFn } from "../utils/formikArrayUtils";

const generateTemplateRow = template => {
  let obj = {};
  if (Array.isArray(template)) {
    for (let i = 0; i < template.length; i++) {
      obj[template[i].name] = "";
    }
  }
  return obj;
};

const TemplateRow = ({
  template,
  parent,
  index,
  setAsyncErrors,
  remove,
  renderBag
}) => {
  if (!Array.isArray(template)) {
    return null;
  }
  const fieldRow = template.map(field => {
    const { name } = field;
    //DONT try to act smart and remove this line, its required to copy this object and manipulate,
    //its there to prevent actual object manuipulation. I know what I am doing.
    const fieldCopy = { ...field, name: `${parent}[${index}].${name}` };
    return renderField(fieldCopy);
  });
  const btn = (
    <Grid
      key={`${parent}[${index}].removeBtn`}
      item
      {...renderBag.gridConfig.item.size}
    >
      <Button
        onClick={() => {
          setAsyncErrors(errors =>
            setIn(errors, parent, removeAsyncFn(getIn(errors, parent), index))
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

const Template = ({ template, name }) => {
  const asyncBag = React.useContext(AsyncContext);
  const formikBag = React.useContext(FormikContext);
  const renderBag = React.useContext(RenderContext);
  const templateObject = React.useRef(generateTemplateRow(template));
  const templateFieldValue = formikBag.values[name];
  return (
    <Grid container item xs={12} {...renderBag.gridConfig.container}>
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
                  {...renderBag.gridConfig.container}
                >
                  <TemplateRow
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

export default Template;
