import { Form } from "src/app/mms-common/models/form";

const damagesItemForm: Form = {
    title: 'Update item detail',
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
    title: 'Report damaged material',
    elements: [
      {
        name: 'demagedItems',
        type: 'formArray',
        placeholder: 'detail of item',
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
            type: 'select',
            placeholder: 'Weapon Name',
            defaultValue: '',
            size: 4,
            options: [
                {value: "ክላሽ ጠብመንጃ", label: "ክላሽ ጠብመንጃ", referredValue: "Weapon"},
                {value: "ቶካሮቭ", label: "ቶካሮቭ", referredValue: "Weapon"},
                {value: "ማካሮቭ ሽጉጥ ካርታ", label: "ማካሮቭ ሽጉጥ ካርታ", referredValue: "Bullet"},
                {value: "የውሃ ኮዳ", label: "የውሃ ኮዳ", referredValue: "Other"}
              ],
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
        placeholder: 'Reason of report damages',//e.g expried date, crushed, unmaintainable...
        defaultValue: '',
        size: 12,
        validations: [{ type: 'required', value: true }],
      },
      {
        name: 'description',
        type: 'text',
        placeholder: 'description',
        defaultValue: '',
        size: 12,
        validations: [{ type: 'required', value: true }],
      },
      {
        name: 'attachments',
        type: 'file',
        placeholder: 'Attachments',
        defaultValue: '',
        validations: [{ type: 'required', value: true }],
      },
    ],
  };
  export default {damagesForm, damagesItemForm}