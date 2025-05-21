import type { Field } from 'payload'
export const iconPickerField: Field = {
  name: 'iconPicker',
  type: 'text',
  index: false,
  required: false,
  label: 'Icon',
  admin: {
    components: {
      Field: {
        path: '@/fields/iconPicker/IconPickerComponent#IconPickerComponent',
      },
      Cell: '@/fields/iconPicker/IconPickerCell#IconPickerCell',
    },
  },
}
