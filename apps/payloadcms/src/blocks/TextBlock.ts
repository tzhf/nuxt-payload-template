import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const TextBlock: Block = {
  slug: 'text',
  labels: { singular: 'Text', plural: 'Text' },
  interfaceName: 'TextBlock',
  fields: [
    {
      name: 'anchorId',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
    },
  ],
}

export default TextBlock
