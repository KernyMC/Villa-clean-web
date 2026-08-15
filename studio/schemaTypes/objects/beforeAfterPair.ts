import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'
import {imageWithAlt} from './imageWithAlt'

export const beforeAfterPair = defineType({
  name: 'beforeAfterPair',
  title: 'Before / After Pair',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Room label',
      description: 'e.g. "Kitchen", "Primary Bathroom", "Living Room"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    imageWithAlt('beforeImage', 'Before image'),
    imageWithAlt('afterImage', 'After image'),
  ],
  preview: {
    select: {title: 'label', media: 'afterImage'},
  },
})
