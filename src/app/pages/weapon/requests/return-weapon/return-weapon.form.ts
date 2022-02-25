import { Form } from 'src/app/mms-common/models/form';

const requestForReturningWeaponForm: Form = {
  title: 'Request For Returning Weapon',
  elements: [
    {
      name: 'returnWeaponsItems',
      type: 'formArray',
      placeholder: 'Return Items',
      defaultValue: '',
      formArrayItems: [
        {
          name: 'type',
          type: 'select',
          placeholder: 'Type',
          defaultValue: '',
          size: 4,
          options: [
            { value: 'Weapon', label: 'Weapon' },
            { value: 'Bullet', label: 'Bullet' },
            { value: 'Other', label: 'Other' },
          ],
          validations: [{ type: 'required', value: true }],
        },
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          defaultValue: '',
          size: 4,
          validations: [{ type: 'required', value: true }],
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          defaultValue: '',
          size: 4,
          validations: [{ type: 'required', value: true }],
        },
      ],
    },
    {
      name: 'returnStatus',
      type: 'hidden',
      placeholder: 'Request Status',
      defaultValue: 'PENDING',
    },
    {
      name: 'description',
      type: 'text',
      placeholder: 'Return Description',
      defaultValue: '',
      size: 12,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'attachments',
      type: 'file',
      placeholder: 'Return Attachments',
      defaultValue: '',
    },
  ],
};

const requestForReturningWeaponItemsForm: Form = {
  title: 'Request For Returning Weapon',
  elements: [
    {
      name: 'type',
      type: 'select',
      placeholder: 'Type',
      defaultValue: '',
      size: 4,
      options: [
        { value: 'Weapon', label: 'Weapon' },
        { value: 'Bullet', label: 'Bullet' },
        { value: 'Other', label: 'Other' },
      ],
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      defaultValue: '',
      size: 4,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'quantity',
      type: 'number',
      placeholder: 'Quantity',
      defaultValue: '',
      size: 4,
      validations: [{ type: 'required', value: true }],
    },
  ],
};

export default {
  requestForReturningWeaponForm,
  requestForReturningWeaponItemsForm,
};
