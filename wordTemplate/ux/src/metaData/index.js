import { BoolType } from "formComponent/types";
import {
  asyncValidationHandler,
  makeAsyncRequest,
  fetchAutoCompleteData
} from "./fns.js";

const formData = {
  form: {
    name: "Orders",
    fieldGroups: ["groupA", "groupB", "groupC", "groupD"],
    renderType: "group",
    renderTabs: true,
    gridConfig: {
      item: {
        size: {
          xs: 12,
          sm: 6,
          md: 3
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
      name: "person",
      label: "Person",
      type: "autocompleteStatic",
      multiple: true,
      getOptionLabel: option => option.label,
      options: [
        { value: 1, label: "devarsh" },
        { vale: 2, label: "dvija" },
        { value: 3, label: "muktesh" },
        { value: 4, label: "ashini" },
        { value: 5, label: "ayush" },
        { value: 6, label: "urja" },
        { value: 7, label: "nimisha" },
        { value: 8, label: "nilesh" },
        { value: 23, label: "rutvi" },
        { value: 9, label: "harsh" },
        { value: 10, label: "nirali" },
        { value: 11, label: "mona" },
        { value: 12, label: "trilok" },
        { value: 13, label: "jay" },
        { value: 14, label: "kaveer" },
        { value: 15, label: "rimoni" },
        { value: 16, label: "shimoli" },
        { value: 17, label: "sangita" },
        { value: 18, label: "kandarp" },
        { value: 19, label: "prashant" },
        { value: 20, label: "alok" },
        { value: 21, label: "saanvi" },
        { value: 22, label: "bijal" },
        { value: 24, label: "anal" },
        { value: 25, label: "aryaman" },
        { value: 26, label: "hriman" }
      ]
    },
    {
      group: "groupA",
      name: "person2",
      label: "Person2",
      type: "autocompleteDynamic",
      multiple: true,
      getOptionLabel: option => option.name,
      callback: fetchAutoCompleteData
    },
    {
      group: "groupA",
      name: "person3",
      label: "Person3",
      type: "rating"
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
      type: "text",
      asyncValidationFn: asyncValidationHandler
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
      ],
      /*eslint-disable eqeqeq */
      show: [val => new BoolType(val == 1), "gender"]
    },
    {
      group: "groupB",
      name: "age",
      label: "Age",
      type: "selectStatic",
      multiple: true,
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
      group: "groupD",
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
        },
        {
          name: "dob",
          label: "Date of Birth",
          type: "date"
        }
      ]
    }
  ]
};

export default formData;
