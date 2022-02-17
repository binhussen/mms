import { Form } from 'src/app/mms-common/models/form';

const inventoryForm: Form = {
  title: 'Inventory',
  elements: [
    {
      name: 'itemNoInExpenditureRegister',
      type: 'text',
      placeholder: 'Item No. in Expenditure Register',
      defaultValue: '',
      size: 1,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'noOfEntryInTheRegisterOfIncomingGoods',
      type: 'text',
      placeholder: 'No. of Entry in the Register of Incoming Goods',
      defaultValue: '',
      size: 1,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'storeNo',
      type: 'text',
      placeholder: 'Store No.',
      defaultValue: '',
      size: 1,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'shelfNo',
      type: 'text',
      placeholder: 'Shelf No.',
      defaultValue: '',
      size: 1,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'date',
      type: 'date',
      placeholder: 'Date',
      defaultValue: '',
      size: 1,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'donor',
      type: 'text',
      placeholder: 'Donor',
      defaultValue: '',
      size: 1,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'weaponItems',
      type: 'formArray',
      placeholder: 'Weapon Items',
      defaultValue: '',
      formArrayItems: [
        {
          name: 'weaponItemDescription',
          type: 'text',
          placeholder: 'Weapon Item Description',
          defaultValue: '',
          size: 2,
        },
        {
          name: 'weaponModel',
          type: 'text',
          placeholder: 'Weapon Model',
          defaultValue: '',
          size: 2,
        },
        {
          name: 'weaponSerialNo',
          type: 'text',
          placeholder: 'Weapon Serial No.',
          defaultValue: '',
          size: 2,
        },
        {
          name: 'weaponQuantity',
          type: 'text',
          placeholder: 'Weapon Quantity',
          defaultValue: '',
          size: 2,
        },
        {
          name: 'weaponUnitPrice',
          type: 'text',
          placeholder: 'Weapon Unit Price',
          defaultValue: '',
          size: 2,
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
          size: 2,
        },
      ],
    },
  ],
};

export default inventoryForm;
