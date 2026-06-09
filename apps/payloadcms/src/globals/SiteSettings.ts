import type { GlobalConfig } from 'payload'
import { livePreviewBreakpoints } from '~/utils'

import { colorField, buttonField } from '~/fields'

const colorPresets = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#FFA07A',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E2',
]

const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  graphQL: {
    name: 'SiteSettings',
  },
  typescript: {
    interface: 'SiteSettings',
  },
  admin: {
    group: '🌏 Globals',
    livePreview: {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}?preview=true`,
      breakpoints: livePreviewBreakpoints,
    },
  },
  access: {
    read: (_) => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Theme',
          fields: [
            {
              name: 'typography',
              type: 'group',
              fields: [
                {
                  name: 'font',
                  type: 'text',
                  required: true,
                  defaultValue: 'Inter',
                  admin: {
                    description:
                      'Enter a Google Font name (e.g. Inter, Roboto, etc.) from https://fonts.google.com',
                  },
                },
                {
                  name: 'fontSize',
                  type: 'number',
                  required: true,
                  defaultValue: 14,
                },
              ],
            },
            {
              name: 'colors',
              type: 'group',
              fields: [
                colorField({
                  name: 'backgroundColor',
                  overrides: (field) => ({
                    ...field,
                    defaultValue: '#FFFFFF',
                  }),
                }),
                colorField({
                  name: 'primaryColor',
                  colorPresets: colorPresets,
                  overrides: (field) => ({
                    ...field,
                    defaultValue: '#FF6B6B',
                  }),
                }),
              ],
            },
          ],
        },
        {
          label: 'Navbar',
          fields: [
            {
              name: 'navbar',
              type: 'group',
              fields: [
                colorField({
                  name: 'textColor',
                  overrides: (field) => ({
                    ...field,
                    defaultValue: '#ffffff',
                  }),
                }),
                colorField({
                  name: 'backgroundColor',
                  overrides: (field) => ({
                    ...field,
                    defaultValue: '#000000',
                  }),
                }),
                colorField({
                  name: 'backgroundColorScroll',
                  overrides: (field) => ({
                    ...field,
                    defaultValue: '#000000',
                  }),
                }),
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'svgs',
                },
                {
                  name: 'links',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'url', type: 'text', required: true },
                    {
                      name: 'openInNewTab',
                      type: 'checkbox',
                      defaultValue: false,
                    },
                  ],
                },
                {
                  name: 'buttons',
                  type: 'array',
                  fields: [buttonField('button').fields].flat(), // spread the fields
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footer',
              type: 'group',
              fields: [
                {
                  name: 'links',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'url', type: 'text', required: true },
                    {
                      name: 'openInNewTab',
                      type: 'checkbox',
                      defaultValue: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default SiteSettings
