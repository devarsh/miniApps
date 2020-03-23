import * as yup from "yup";
import { validateWatcher, isFunctionNotRequired } from "./utils";

const componentTypes = [
  "text",
  "slider",
  "radio",
  "switch",
  "checkbox",
  "selectStatic",
  "selectDependent",
  "date",
  "time",
  "datetime",
  "array"
];

const fieldSchemaValidator = yup.object().shape({
  group: yup
    .string()
    .test("group", "groupname is not a subset of form.fieldGroup", function(
      fieldValue
    ) {
      let context = this?.options?.context ?? {};
      let path = this?.path;
      let renderType = context?.form?.renderType ?? "simple";
      let fieldGroups = context?.form?.fieldGroups ?? [];
      //array templates cannot create groups (nested groups is not supported)
      if (path.indexOf("template") >= 0) {
        return true;
      }
      if (renderType === "group") {
        if (fieldGroups.indexOf(fieldValue) >= 0) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    }),
  name: yup.string().required(),
  label: yup.string().when("type", {
    is: val => val !== "array",
    then: yup.string().required(),
    otherwise: yup.string().notRequired()
  }),
  type: yup
    .string()
    .required()
    .oneOf(componentTypes),
  validationType: yup.string(),
  validations: yup.array().when("validationType", {
    is: val => !!val === true && val !== "array",
    then: yup
      .array()
      .required(
        "validations array is required when validationType property is set"
      )
      .of(
        yup.object().shape({
          type: yup.string().required(),
          params: yup
            .array()
            .required()
            .of(yup.mixed())
        })
      ),
    otherwise: yup.array().notRequired()
  }),
  watch: yup
    .string()
    .test(
      "watch",
      "cannot watch a field not present in fields array",
      validateWatcher
    ),
  show: yup
    .array()
    .test(
      "show",
      "show field should be any array with first value function, second a valid watch field",
      function(fieldValue) {
        if (fieldValue === null || fieldValue === undefined) {
          return true;
        }
        if (Array.isArray(fieldValue)) {
          if (fieldValue.length !== 2) {
            return false;
          }
          const fn = fieldValue[0];
          const watcher = fieldValue[1];
          if (typeof fn !== "function") {
            return false;
          }
          return validateWatcher.call(this, watcher);
        }
        return false;
      }
    ),
  asyncValidationFn: yup
    .object()
    .test(
      "validationFn",
      "asyncValidationFn field should be a function",
      isFunctionNotRequired
    ),
  options: yup.array().when("type", {
    is: val =>
      ["radio", "checkbox", "selectStatic", "switch"].indexOf(val) >= 0,
    then: yup
      .array()
      .required()
      .of(
        yup.object().shape({
          value: yup.lazy(value => {
            switch (typeof value) {
              case "number":
                return yup.number().required();
              default:
                return yup.string().required();
            }
          }),
          label: yup.string().required()
        })
      ),
    otherwise: yup.array().notRequired()
  }),
  min: yup.number().when("type", {
    is: type => type === "slider",
    then: yup
      .number()
      .required()
      .max(yup.ref("max")),
    otherwise: yup.number().notRequired()
  }),
  max: yup.number().when("type", {
    is: type => type === "slider",
    then: yup
      .number()
      .required()
      .min(yup.ref("min")),
    otherwise: yup.number().notRequired()
  }),
  step: yup.number().when("type", {
    is: type => type === "slider",
    then: yup
      .number()
      .required()
      .max(yup.ref("max")),
    otherwise: yup.number().notRequired()
  }),
  callback: yup.object().when("type", {
    is: type => type === "selectDependent",
    then: yup
      .object()
      .required()
      .test("callback", "callback must be a function", isFunctionNotRequired),
    otherwise: yup.object().notRequired()
  })
});

const templateSchema = yup.object().shape({
  template: yup.array().when("type", {
    is: type => {
      return type === "array";
    },
    then: yup
      .array()
      .required()
      .of(fieldSchemaValidator),
    otherwise: yup.array().notRequired()
  })
});

const joined = fieldSchemaValidator.concat(templateSchema);

export const fieldsSchemaValidator = yup
  .array()
  .required("fields array must hold atleast one field object")
  .of(joined);
