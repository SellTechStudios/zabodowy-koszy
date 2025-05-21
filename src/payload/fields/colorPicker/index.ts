import type { Field } from 'payload'
export const colorPickerField: Field = {
  name: 'colorPicker',
  type: 'text',
  index: false,
  required: false,
  label: 'Color',
  admin: {
    components: {
      Field: {
        path: '@/fields/colorPicker/ColorPickerComponent#ColorPickerComponent',
      },
      Cell: '@/fields/colorPicker/ColorPickerCell#ColorPickerCell',
    },
  },
}
