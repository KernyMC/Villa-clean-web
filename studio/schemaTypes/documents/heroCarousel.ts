import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'

export const heroCarousel = defineType({
  name: 'heroCarousel',
  title: 'Hero Carousel',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'slides',
      title: 'Hero carousel slides',
      description: 'Photos shown in the rotating hero carousel, in order.',
      type: 'array',
      of: [{type: 'heroSlide'}],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Hero Carousel'}),
  },
})
