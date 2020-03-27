import * as yup from "yup";
import { formSchemaValidator } from "./formValidator";
import { fieldsSchemaValidator } from "./fieldValidator";
import { MetaDataSchemaValidatorType } from "formComponent/types";

let validationConfig = {
  abortEarly: false,
  strict: true
};

let schema = yup.object().shape({
  form: formSchemaValidator,
  fields: fieldsSchemaValidator
});
export const metaDataSchemaValidator = metaData => {
  try {
    validationConfig.context = metaData;
    let res = schema.validateSync(metaData, validationConfig);
    return new MetaDataSchemaValidatorType(res);
  } catch (e) {
    return new MetaDataSchemaValidatorType(e);
  }
};

/*let result = metaDataSchemaValidator({
  form: {
    name: "homerun",
    renderType: "group",
    renderTabs: true,
    fieldGroups: ["fsdfdf", "45", "sdfdsff"],
    gridConfig: {
      item: {
        size: {
          xs: 3
        }
      },
      container: {
        direction: "row",
        spacing: 2
      }
    }
  },
  fields: [
    {
      group: "45",

      label: "wow",
      type: "slider",
      watch: "devarsh",
      validationType: "string",
      validations: [{ type: "min", params: ["min should be 20"] }],
      options: [
        {
          value: 1,
          label: "wqedsf"
        }
      ],
      min: 10,
      max: 100,
      step: 100,
      show: [() => {}, "devarsh"],
      asyncValidationFn: () => {}
    }
  ]
});

console.log(result.isError());
console.log(result.getValue());
*/
