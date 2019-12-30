import * as yup from "yup";

const makeSchemaFromTemplate = formMetaData => {
  if (Array.isArray(formMetaData)) {
    const yupSchema = formMetaData.reduce(createYupSchema, {});
    const validateSchema = yup.object().shape(yupSchema);
    return validateSchema;
  } else {
    return yup.object().shape({});
  }
};

const createYupSchema = (schema, config) => {
  const { name, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  if (validationType === "array") {
    const { template = [] } = config;
    const nestedschema = makeSchemaFromTemplate(template);
    const array = yup[validationType]()["of"](nestedschema);
    schema[name] = array;
    return schema;
  } else {
    let validator = yup[validationType]();
    validations.forEach(validation => {
      const { params, type } = validation;
      if (!validator[type]) {
        return;
      }
      validator = validator[type](...params);
    });
    schema[name] = validator;
    return schema;
  }
};

export default makeSchemaFromTemplate;
