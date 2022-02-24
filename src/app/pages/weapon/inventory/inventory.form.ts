import { Form } from 'src/app/mms-common/models/form';

const inventoryForm: Form = {
  title: 'Inventory',
  elements: [
    {
      name: 'itemNoInExpenditureRegister',
      type: 'text',
      placeholder: 'Item No. in Expenditure Register',
      defaultValue: '',
      size: 4,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'noOfEntryInTheRegisterOfIncomingGoods',
      type: 'text',
      placeholder: 'No. of Entry in the Register of Incoming Goods',
      defaultValue: '',
      size: 4,
      validations: [{ type: 'required', value: true }],
    },

    // {
    //   name: 'date',
    //   type: 'date',
    //   placeholder: 'Date',
    //   defaultValue: '',
    //   size: 4,
    //   validations: [{ type: 'required', value: true }],
    // },
    {
      name: 'donor',
      type: 'text',
      placeholder: 'Donor',
      defaultValue: '',
      size: 4,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'weaponItems',
      type: 'formArray',
      placeholder: 'Weapon Items',
      defaultValue: '',
      formArrayItems: [
        {
          name: 'weaponType',
          type: 'select',
          placeholder: 'Weapon Type',
          defaultValue: 'Weapon',
          size: 6,
          options: [
            { value: 'Weapon', label: 'Weapon' },
            { value: 'Bullet', label: 'Bullet' },
            { value: 'Other', label: 'Other' },
          ],
        },
        {
          name: 'weaponItemDescription',
          type: 'text',
          placeholder: 'Weapon Item Description',
          defaultValue: '',
          size: 6,
        },
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
          name: 'weaponModel',
          type: 'text',
          placeholder: 'Weapon Model',
          defaultValue: '',
          size: 6,
        },
        {
          name: 'weaponSerialNo',
          type: 'text',
          placeholder: 'Weapon Serial No.',
          defaultValue: '',
          size: 6,
        },
        {
          name: 'weaponQuantity',
          type: 'number',
          placeholder: 'Weapon Quantity',
          defaultValue: '',
          size: 4,
        },
        {
          name: 'weaponUnitPrice',
          type: 'number',
          placeholder: 'Weapon Unit Price',
          defaultValue: '',
          size: 4,
        },
        {
          name: 'weaponTotalPrice',
          type: 'number',
          placeholder: 'Weapon Total Price',
          defaultValue: '',
          computeValueFrom: {
            elements: ['weaponQuantity', 'weaponUnitPrice'],
            operator: '*',
          },
          size: 4,
        },
        {
          name: 'weaponAvailability',
          type: 'hidden',
          placeholder: 'Weapon Availability',
          defaultValue: '1',
          size: 0,
        },
        {
          name: 'storeNo',
          type: 'text',
          placeholder: 'Store No.',
          defaultValue: '',
          size: 6,
          validations: [{ type: 'required', value: true }],
        },
        {
          name: 'shelfNo',
          type: 'text',
          placeholder: 'Shelf No.',
          defaultValue: '',
          size: 6,
          validations: [{ type: 'required', value: true }],
        },
      ],
    },
  ],
};

const distributeForm: Form = {
  title: 'Distribute Weapon',
  elements: [],
};

const inventoryItemForm: Form = {
  title: 'Inventory Item',
  elements: [
    {
      name: 'weaponItemDescription',
      type: 'text',
      placeholder: 'Weapon Item Description',
      defaultValue: '',
      size: 3,
    },
    {
      name: 'weaponModel',
      type: 'text',
      placeholder: 'Weapon Model',
      defaultValue: '',
      size: 3,
    },
    {
      name: 'weaponSerialNo',
      type: 'text',
      placeholder: 'Weapon Serial No.',
      defaultValue: '',
      size: 3,
    },
    {
      name: 'weaponQuantity',
      type: 'number',
      placeholder: 'Weapon Quantity',
      defaultValue: '',
      size: 3,
    },
    {
      name: 'weaponUnitPrice',
      type: 'number',
      placeholder: 'Weapon Unit Price',
      defaultValue: '',
      size: 3,
    },
    {
      name: 'weaponTotalPrice',
      type: 'text',
      placeholder: 'Weapon Total Price',
      defaultValue: '',
      computeValueFrom: {
        elements: ['weaponQuantity', 'weaponUnitPrice'],
        operator: '*',
      },
      size: 3,
    },
    {
      name: 'storeNo',
      type: 'text',
      placeholder: 'Store No.',
      defaultValue: '',
      size: 3,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'shelfNo',
      type: 'text',
      placeholder: 'Shelf No.',
      defaultValue: '',
      size: 3,
      validations: [{ type: 'required', value: true }],
    },
  ],
};
export default { inventoryForm, inventoryItemForm, distributeForm };
