import type { Field } from 'payload'
import { HeroBlock, TextBlock } from '../../../blocks'

const Page: Field = {
  name: 'pageFields',
  type: 'group',
  admin: {
    condition: (data) => data.template === 'Page',
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, TextBlock],
    },
  ],
}

export default Page
