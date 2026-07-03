import type { GlobalConfig } from 'payload'
import { livePreviewBreakpoints } from '~/utils'

import { colorField } from '~/fields'
import Button from '~/blocks/ui/Button'

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
  slug: 'site-settings',
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
    read: () => true,
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
                  name: 'background',
                  overrides: (f) => ({ ...f, defaultValue: '#ffffff' }),
                }),
                colorField({
                  name: 'foreground',
                  overrides: (f) => ({ ...f, defaultValue: '#111111' }),
                }),
                colorField({
                  name: 'primary',
                  overrides: (f) => ({ ...f, defaultValue: '#000000' }),
                }),
                colorField({
                  name: 'primaryForeground',
                  overrides: (f) => ({ ...f, defaultValue: '#ffffff' }),
                }),
                colorField({
                  name: 'secondary',
                  overrides: (f) => ({ ...f, defaultValue: '#f4f4f5' }),
                }),
                colorField({
                  name: 'secondaryForeground',
                  overrides: (f) => ({ ...f, defaultValue: '#111111' }),
                }),
                colorField({
                  name: 'muted',
                  overrides: (f) => ({ ...f, defaultValue: '#f4f4f5' }),
                }),
                colorField({
                  name: 'mutedForeground',
                  overrides: (f) => ({ ...f, defaultValue: '#71717a' }),
                }),
                colorField({
                  name: 'border',
                  overrides: (f) => ({ ...f, defaultValue: '#e4e4e7' }),
                }),
                colorField({
                  name: 'accent',
                  overrides: (f) => ({ ...f, defaultValue: '#f4f4f5' }),
                }),
                colorField({
                  name: 'accentForeground',
                  overrides: (f) => ({ ...f, defaultValue: '#111111' }),
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
                  type: 'blocks',
                  blocks: [Button],
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
