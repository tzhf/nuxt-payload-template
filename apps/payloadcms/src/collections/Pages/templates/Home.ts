import type { Field } from 'payload'
import { HeroBlock, TextBlock } from '../../../blocks'

const Home: Field = {
  name: 'homeTemplateFields',
  type: 'group',
  admin: {
    condition: (data) => data.template === 'Home',
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, TextBlock],
    },
  ],
}

export default Home
