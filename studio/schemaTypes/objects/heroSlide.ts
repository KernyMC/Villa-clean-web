import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'
import {imageWithAlt} from './imageWithAlt'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Internal label',
      description: 'Used only in the Studio to tell slides apart, e.g. "Kitchen deep clean"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    imageWithAlt('image', 'Image'),
  ],
  preview: {
    select: {title: 'label', media: 'image'},
  },
})
