import { Form, FormElement } from 'src/app/mms-common/models/form';

const requestForWeaponForm: Form = {
  title: 'Request For Weapon',
  elements: [
    {
      name: 'requestWeaponItems',
      type: 'formArray',
      placeholder: 'Request Items',
      defaultValue: '',
      formArrayItems: [
        {
          name: 'weaponType',
          type: 'select',
          placeholder: 'Weapon Type',
          defaultValue: '',
          size: 3,
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
          size: 3,
          validations: [{ type: 'required', value: true }],
        },
        {
          name: 'weaponModel',
          type: 'text',
          placeholder: 'Weapon Model',
          defaultValue: '',
          size: 3,
          validations: [{ type: 'required', value: true }],
        },
        {
          name: 'weaponQuantity',
          type: 'number',
          placeholder: 'Quantity',
          defaultValue: '',
          size: 3,
          validations: [{ type: 'required', value: true }],
        },
      ],
    },
    {
      name: 'requestStatus',
      type: 'hidden',
      placeholder: 'Request Status',
      defaultValue: 'PENDING',
    },
    {
      name: 'description',
      type: 'text',
      placeholder: 'Request Description',
      defaultValue: '',
      size: 12,
      validations: [{ type: 'required', value: true }],
    },
    {
      name: 'attachments',
      type: 'file',
      placeholder: 'Request Attachments',
      defaultValue: '',
    },
  ],
};

const requestItemForWeaponForm: Form = {
  title: 'Request Item For Weapon',
  elements:
    (
      requestForWeaponForm.elements.find(
        (element) => element.name === 'requestWeaponItems'
      ) ?? { formArrayItems: [] }
    ).formArrayItems ?? [],
};
const requestApprovalElements = requestForWeaponForm.elements.map(
  (element: FormElement) => {
    if (element.name === 'requestStatus') {
      return { ...element, defaultValue: 'APPROVED' };
    }
    if (element.name === 'requestWeaponItems') {
      return {
        ...element,
        placeholder: 'Requested Items',
        name: 'requestApprovedWeaponItems',
      };
    }
    if (element.name === 'attachments') {
      return { ...element, placeholder: 'Request Approval Attachments' };
    }
    if (element.name === 'description') {
      return {
        ...element,
        placeholder: 'Request Approval Description',
        name: 'requestApprovalDescription',
      };
    }
    return element;
  }
);
requestApprovalElements.push({
  name: 'requestWeaponsId',
  type: 'hidden',
  placeholder: 'Request Weapons Id',
  defaultValue: '',
});
const requestApprovalForm = {
  title: 'Request Approval Form',
  elements: requestApprovalElements,
};

export default {
  requestForWeaponForm,
  requestItemForWeaponForm,
  requestApprovalForm,
};
