import {Form} from "../../mms-common/models/form";

const loginForm: Form = {
  title: 'Login',
  elements: [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      defaultValue: '',
      validations: [
        {type: 'required', value: true}
      ]
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      defaultValue: '',
      validations: [
        {type: 'required', value: true}
      ]
    },
  ]
}

export default loginForm;
