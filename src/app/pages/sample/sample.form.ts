import { Form } from '../../mms-common/models/form';

const sampleForm: Form = {
  title: 'Element Registration',
  elements: [
    {
      name: 'position',
      type: 'number',
      placeholder: 'Position',
      defaultValue: '',
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      defaultValue: '',
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'weight',
      type: 'number',
      placeholder: 'Weight',
      defaultValue: '',
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'symbol',
      type: 'text',
      placeholder: 'Symbol',
      defaultValue: '',
      validations: [
        { type: 'required', value: true },
        { type: 'maxLength', value: 3 },
      ],
    },
  ],
};

export default sampleForm;
