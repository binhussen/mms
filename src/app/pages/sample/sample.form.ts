import {Form} from "../../mms-common/models/form";

const sampleForm: Form = {
  title: "User Registration",
  elements: [
    {
      name: "lastName",
      type: "text",
      size: 6,
      placeholder: "Last Name",
      defaultValue: ""
    },
    {
      name: "dob",
      type: "date",
      placeholder: "Birthdate",
      defaultValue: ""
    },
    {
      name: "addresses",
      type: "formArray",
      placeholder: "Addresses",
      defaultValue: "",
      formArrayItems: [
        {
          name: "country",
          type: "select",
          placeholder: "Country",
          defaultValue: "",
          size: 6,
          options: [
            {value: "Ethiopia", label: "Ethiopian"},
            {value: "Sudan", label: "Sundanese"}
          ]
        },
        {
          name: 'city',
          type: "select",
          placeholder: "City",
          defaultValue: "",
          size: 6,
          refer: "country",
          options: [
            {value: "Addis Ababa", label: "Addis Ababa", referredValue: "Ethiopia"},
            {value: "Jimma", label: "Jimma", referredValue: "Ethiopia"},
            {value: "Khartum", label: "Khartum", referredValue: "Sudan"},
          ]
        }
      ]
    },
    {
      name: "gender",
      type: "radio",
      placeholder: "Gender",
      defaultValue: "",
      options: [
        {value: "male", label: "Male"},
        {value: "female", label: "Female"}
      ]
    },
    {
      name: 'document_attachment',
      type: "file",
      placeholder: "Document Attachment",
      defaultValue: "",
    }
  ]
}

export default sampleForm;
