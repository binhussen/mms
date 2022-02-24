import { Form } from 'src/app/mms-common/models/form';
import inventoryForm from '../inventory.form';

const distributeFormElements = inventoryForm.inventoryForm.elements.filter(
  (formElement) => {
    if (formElement.name === 'weaponItems' && formElement.formArrayItems) {
      formElement.formArrayItems = formElement.formArrayItems
        .filter((weaponItem) => {
          return (
            weaponItem.name !== 'weaponAvailability' &&
            weaponItem.name !== 'weaponTotalPrice' &&
            weaponItem.name !== 'weaponUnitPrice' &&
            weaponItem.name !== 'storeNo' &&
            weaponItem.name !== 'shelfNo'
          );
        })
        .map((element) => ({ ...element, size: 2 }));
      formElement.formArrayItems.push({
        name: 'id',
        type: 'hidden',
        placeholder: 'Weapon Items Id',
        defaultValue: '',
      });
    }
    return true;
  }
);
const distributeForm: Form = {
  title: 'Form for weapon issued',
  elements: distributeFormElements,
};

// userForm needs to filled
// weapon request should approved
// approval id is required to distribute the weapon

const userForm: Form = {
  title: 'A form for individuals who are permitted to carry a firearm',
  elements: [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      defaultValue: '',
      size: 4,
      // validations: [{ type: 'required', value: true }],
    },
    {
      name: 'fatherName',
      type: 'text',
      placeholder: 'Father Name',
      defaultValue: '',
      size: 4,
      // validations: [{ type: 'required', value: true }],
    },
    {
      name: 'grandFatherName',
      type: 'text',
      placeholder: 'Grandfather Name',
      defaultValue: '',
      size: 4,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'gender',
      type: 'select',
      placeholder: 'Gender',
      defaultValue: '',
      size: 12,
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
    {
      name: 'region',
      type: 'text',
      placeholder: 'Region',
      defaultValue: '',
      size: 3,
    },
    {
      name: 'sub-city',
      type: 'text',
      placeholder: 'Sub-City',
      defaultValue: '',
      size: 3,
    },
    {
      name: 'woreda',
      type: 'text',
      placeholder: 'Woreda',
      defaultValue: '',
      size: 3,
    },
    {
      name: 'house-number',
      type: 'text',
      placeholder: 'House Number',
      defaultValue: '',
      size: 3,
    },
    {
      name: 'phone-number',
      type: 'text',
      placeholder: 'Phone Number',
      defaultValue: '',
      size: 4,
    },
    {
      name: 'birth-place',
      type: 'text',
      placeholder: 'Birth Place',
      defaultValue: '',
      size: 4,
    },
    {
      name: 'birth-date',
      type: 'date',
      placeholder: 'Birth Date',
      defaultValue: '',
      size: 4,
    },
    {
      name: 'occupation',
      type: 'text',
      placeholder: 'Occupation',
      defaultValue: '',
      size: 6,
    },
    {
      name: 'emergence-contact-name',
      type: 'text',
      placeholder: 'Emergence Contact Name',
      defaultValue: '',
      size: 6,
    },
    {
      name: 'emergence-contact-phone-number',
      type: 'text',
      placeholder: 'Emergence Contact Phone Number',
      defaultValue: '',
      size: 3,
    },
    {
      name: 'emergence-contact-sub-city',
      type: 'text',
      placeholder: 'Emergence Contact Sub-City',
      defaultValue: '',
      size: 3,
    },
    {
      name: 'emergence-contact-woreda',
      type: 'text',
      placeholder: 'Emergence Contact Woreda',
      defaultValue: '',
      size: 3,
    },
    {
      name: 'emergence-contact-house-number',
      type: 'text',
      placeholder: 'Emergence Contact House Number',
      defaultValue: '',
      size: 3,
    },
  ],
};

export default { userForm, distributeForm };

// const distributeItemsForm: Form = {};
