import * as yup from "yup";

const renderStyle = ["simple", "group"];
const directions = ["row", "column", "row-reverse", "column-reverse"];

export const formSchemaValidator = yup.object().shape({
  name: yup.string().required("form name is a required value"),
  renderType: yup
    .string()
    .required("renderType is a required value")
    .oneOf(renderStyle),
  renderTabs: yup.boolean().when("renderType", {
    is: val => val === "group",
    then: yup
      .boolean()
      .required("renderTabs is required when renderTypes=group"),
    otherwise: yup.boolean().notRequired()
  }),
  fieldGroups: yup.array().when("renderType", {
    is: val => val === "group",
    then: yup
      .array()
      .required("fieldGroup is required when renderType=group")
      .of(yup.string()),
    otherwise: yup.array().notRequired()
  }),
  gridConfig: yup.object().shape({
    item: yup.object().shape({
      size: yup.object().shape({
        xs: yup
          .number()
          .min(1)
          .max(12),
        sm: yup
          .number()
          .min(1)
          .max(12),
        md: yup
          .number()
          .min(1)
          .max(12)
      })
    }),
    container: yup.object().shape({
      direction: yup
        .string()
        .notRequired()
        .oneOf(directions),
      spacing: yup.number().notRequired()
    })
  })
});
