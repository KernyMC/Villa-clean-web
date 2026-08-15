import {defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

export const imageWithAlt = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    icon: ImageIcon,
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternative text',
        type: 'string',
        validation: (Rule) => Rule.required().warning('Alt text is important for SEO and accessibility'),
      }),
    ],
  })
