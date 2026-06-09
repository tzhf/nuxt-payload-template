import type { GroupField } from 'payload'

const buttonField = (name: string = 'button'): GroupField => ({
  name,
  type: 'group',
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'url', type: 'text', required: true },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'Outline', value: 'outline' },
      ],
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
})

export default buttonField
