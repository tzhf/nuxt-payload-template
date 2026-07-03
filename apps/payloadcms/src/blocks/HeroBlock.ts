import type { Block } from 'payload'
import Button from '~/blocks/ui/Button'

const HeroBlock: Block = {
  slug: 'hero',

  labels: { singular: 'Hero', plural: 'Heroes' },
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'anchorId',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'images',
    },
    {
      name: 'buttons',
      type: 'blocks',
      blocks: [Button],
    },
    // {
    //   name: 'cta',
    //   type: 'group',
    //   fields: [
    //     { name: 'label', type: 'text' },
    //     { name: 'url', type: 'text' },
    //   ],
    // },
  ],
}

export default HeroBlock
