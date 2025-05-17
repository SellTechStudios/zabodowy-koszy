import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            {
              name: 'addressLine1',
              type: 'text',
              label: 'Address Line 1',
            },
            {
              name: 'addressLine2',
              type: 'text',
              label: 'Address Line 2',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Phone No',
            },
            {
              name: 'email',
              type: 'text',
              label: 'Email',
            },
          ],
        },
      ],
    },
  ],
}
