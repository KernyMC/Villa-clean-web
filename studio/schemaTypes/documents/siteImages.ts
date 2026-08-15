import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'
import {imageWithAlt} from '../objects/imageWithAlt'

export const siteImages = defineType({
  name: 'siteImages',
  title: 'Site Images',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Hero carousel slides',
      description: 'Photos shown in the rotating hero carousel, in order.',
      type: 'array',
      of: [{type: 'heroSlide'}],
      validation: (Rule) => Rule.min(1),
    }),
    imageWithAlt('aboutImage', 'About / founder photo'),
    defineField({
      name: 'beforeAfterPairs',
      title: 'Before & after pairs',
      description: 'Room comparison sliders shown in the "Before and after" section.',
      type: 'array',
      of: [{type: 'beforeAfterPair'}],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Images'}),
  },
})
