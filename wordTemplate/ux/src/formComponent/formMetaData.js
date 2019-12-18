const MakeAsyncRequest = value => {
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

const formData = [
  {
    name: "firstName",
    label: "First Name",
    type: "text"
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text"
  },
  {
    name: "middleName",
    label: "Middle Name",
    type: "text"
  },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    options: [
      { value: 1, label: "Male" },
      { value: 2, label: "Female" }
    ]
  },
  {
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
    name: "dob",
    label: "Date of Birth",
    type: "date"
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
  },
  {
    name: "city",
    label: "City",
    type: "selectDependent",
    watch: "state",
    callback: MakeAsyncRequest
  },
  {
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
    name: "address",
    type: "array",
    template: [
      {
        name: "street1",
        label: "Street-1",
        type: "text"
      },
      {
        name: "street2",
        label: "Street-2",
        type: "text"
      }
    ]
  }
];

export default formData;
