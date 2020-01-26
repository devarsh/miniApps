import React from "react";
import { FieldArray, setIn, getIn } from "formik";
import { FormikContext, getIn } from "formik";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { AsyncContext } from "./contexts/useAsync";
import { RenderContext } from "./contexts/renderProvider";
import renderField from "./fieldRenderer.js";

const generateTempelateRow = template => {
  let obj = {};
  if (Array.isArray(template)) {
    for (let i = 0; i < template.length; i++) {
      obj[template[i].name] = "";
    }
  }
  return obj;
};

const TemplateRow = ({ template, parent, index }) => {
  if (!Array.isArray(template)) {
    return null;
  }
  const fieldRow = template.map(field => {
    const { name } = field;
    const fieldCopy = { ...field, name: `${parent}[${index}].${name}` };
    return renderField(fieldCopy);
  });
  return <>{fieldRow}</>;
};

const Template = ({ template, name }) => {
  const asyncBag = React.useContext(AsyncContext);
  const formikBag = React.useContext(FormikContext);
  const renderBag = React.useContext(RenderContext);
  const templateObject = React.useRef(generateTempelateRow(template));
  const templateFieldValue = formikBag.values[name];
  return (
    <Grid container item xs={12} key={name} {...renderBag.gridConfig.container}>
      <FieldArray
        name={name}
        render={({ push, remove }) => {
          if (templateFieldValue && templateFieldValue.length <= 0) {
            return (
              <Button onClick={() => push(templateObject)}>Add Field</Button>
            );
          }
          const result = templateFieldValue.map((_, index) => {
            return (
              <Grid
                container
                item
                xs={12}
                key={index}
                {...renderBag.gridConfig.container}
              >
                <TemplateRow template={template} parent={name} index={index} />
                <Button
                  onClick={() => {
                    asyncBag.setErrors(errors =>
                      setIn(
                        errors,
                        name,
                        removeAsyncFn(getIn(errors, name), index)
                      )
                    );
                    remove(index);
                  }}
                ></Button>
              </Grid>
            );
          });
          return (
            <>
              <Button onClick={() => push(templateObject)}>Add Field</Button>
              {result}
            </>
          );
        }}
      />
    </Grid>
  );
};
