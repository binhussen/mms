import { Form } from 'src/app/mms-common/models/form';
const damagesItemForm: Form = {
  title: 'Update Damages Item',
  elements: [
    {
      name: 'weaponType',
      type: 'select',
      placeholder: 'Weapon Type',
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
      name: 'weaponName',
      type: 'text',
      placeholder: 'Weapon Name',
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
const damagesForm: Form = {
  title: 'Report Damaged Weapon',
  elements: [
    {
      name: 'damagesItems',
      type: 'formArray',
      placeholder: 'damages item',
      defaultValue: '',
      formArrayItems: [
        {
          name: 'weaponType',
          type: 'select',
          placeholder: 'Weapon Type',
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
          name: 'weaponName',
          type: 'text',
          placeholder: 'Weapon Name',
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
      name: 'reason',
      type: 'text',
      placeholder: 'reason ',
      defaultValue: '',
      size: 12,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'weaponDescription',
      type: 'text',
      placeholder: 'Weapon Description',
      defaultValue: '',
      size: 12,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'attachments',
      type: 'file',
      placeholder: 'Attachments',
      defaultValue: '',
    },
  ],
};

export default { damagesItemForm, damagesForm };
