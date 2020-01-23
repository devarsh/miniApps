const makeAsyncRequest = value => {
  return new Promise(async (res, rej) => {
    try {
      let response = await fetch(`http://localhost:8081/values?name=${value}`);
      let json = await response.json();
      let data = Object.values(json.result);
      res(data);
    } catch (e) {
      rej(e);
    }
  });
};

const asyncValidationHandler = async (fieldName, value, timeout) => {
  try {
    const res = await fetch(
      `http://localhost:8081/error?sleep=${timeout}&name=${value}`,
      { mode: "cors" }
    );
    let data = await res.json();
    if (data && data.error) {
      return Promise.resolve(data.error);
    } else {
      return Promise.resolve("");
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

const formData = {
  render: {
    gridConfig: {
      item: {
        size: {
          xs: 12,
          sm: 3,
          md: 3
        }
      },
      container: {
        direction: "row",
        spacing: 2
      }
    },
    renderType: "groups",
    renderTabs: true
  },
  form: {
    name: "Orders",
    fieldGroups: ["groupA", "groupB", "groupC", "groupD"]
  },
  fields: [
    {
      group: "groupA",
      name: "firstName",
      label: "First Name",
      type: "text",
      validationType: "string",
      validations: [
        { type: "required", params: ["First Name is a required field"] },
        {
          type: "min",
          params: [5, "First Name should be minimum 5 characters long"]
        },
        {
          type: "max",
          params: [30, "First Name should not be more than 30 characters long"]
        }
      ],
      asyncValidationFn: asyncValidationHandler
    },
    {
      group: "groupA",
      name: "sunil",
      label: "Sunil",
      type: "date"
    },
    {
      group: "groupA",
      name: "surname",
      label: "My Surname",
      type: "text",
      validationType: "string",
      validations: [
        { type: "required", params: ["Surname is required. by mahendra"] },
        { type: "email", params: ["it should be a valid email"] }
      ]
    },
    {
      group: "groupA",
      name: "middleName",
      label: "Middle Name",
      type: "text"
    },
    {
      group: "groupB",
      name: "contactNumber",
      label: "Contact Number",
      type: "text",
      validationType: "number",
      validations: [
        { type: "min", params: [50, "Number should be 50 or more"] }
      ]
    },
    {
      group: "groupB",
      name: "gender",
      label: "Gender",
      type: "radio",
      options: [
        { value: 1, label: "Male" },
        { value: 2, label: "Female" }
      ]
    },
    {
      group: "groupB",
      name: "gender2",
      label: "Gender 2",
      type: "radio",
      options: [
        { value: 1, label: "Boy" },
        { value: 2, label: "Girl" }
      ]
    },
    {
      group: "groupB",
      name: "age",
      label: "Age",
      type: "selectStatic",
      options: [
        { value: 1, label: "1-10" },
        { value: 2, label: "11-20" },
        { value: 3, label: "21-30" },
        { value: 4, label: "31-40" },
        { value: 5, label: "41-50" },
        { value: 6, label: "51-60" },
        { value: 7, label: "61-70" },
        { value: 8, label: "71-80" },
        { value: 9, label: "81-90" },
        { value: 10, label: "91 and Above" }
      ]
    },
    {
      group: "groupB",
      name: "dob",
      label: "Date of Birth",
      type: "date"
    },
    {
      group: "groupC",
      name: "state",
      label: "State",
      type: "selectStatic",
      options: [
        { value: "gujarat", label: "Gujarat" },
        { value: "rajasthan", label: "Rajasthan" },
        { value: "maharashtra", label: "Maharashtra" }
      ]
    },
    {
      group: "groupC",
      name: "SlideMe",
      label: "Rank",
      type: "slider",
      min: 0,
      max: 100,
      step: 1
    },
    {
      group: "groupC",
      name: "notification",
      label: "Notification",
      type: "checkbox",
      options: [
        { value: "email", label: "Email" },
        { value: "sms", label: "SMS" },
        { value: "mobile", label: "Mobile" }
      ]
    },
    {
      group: "groupC",
      name: "Switchers",
      label: "Switches",
      type: "switch",
      options: [
        { value: "email", label: "Email" },
        { value: "sms", label: "SMS" },
        { value: "mobile", label: "Mobile" }
      ]
    },
    {
      group: "switch",
      name: "SlideMe",
      label: "Rank",
      type: "slider",
      min: 0,
      max: 100,
      step: 1
    },
    {
      group: "groupD",
      name: "cityz",
      label: "City",
      type: "selectDependent",
      watch: "state",
      callback: makeAsyncRequest
    },
    {
      group: "groupD",
      name: "address",
      type: "array",
      validationType: "array",
      template: [
        {
          name: "street1",
          label: "Street-1",
          type: "text",
          validationType: "string",
          validations: [
            { type: "required", params: ["Street1 is a required field"] },
            {
              type: "min",
              params: [5, "Street1 should be minimum 5 characters long"]
            },
            {
              type: "max",
              params: [30, "Street1 should not be more than 30 characters long"]
            }
          ]
        },
        {
          name: "street2",
          label: "Street-2",
          type: "text",
          asyncValidationFn: asyncValidationHandler
        },
        {
          name: "state",
          label: "State",
          type: "selectStatic",
          options: [
            { value: "gujarat", label: "Gujarat" },
            { value: "rajasthan", label: "Rajasthan" },
            { value: "maharashtra", label: "Maharashtra" }
          ]
        }
      ]
    }
  ]
};

export default formData;
