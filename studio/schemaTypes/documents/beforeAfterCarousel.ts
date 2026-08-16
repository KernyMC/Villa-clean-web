import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'

export const beforeAfterCarousel = defineType({
  name: 'beforeAfterCarousel',
  title: 'Before & After Carousel',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'pairs',
      title: 'Before & after pairs',
      description:
        'Room comparison sliders shown in the "Before and after" section. One entry per room (label, before photo, after photo) — recommended 3 to 6 pairs, up to 8.',
      type: 'array',
      of: [{type: 'beforeAfterPair'}],
      validation: (Rule) => Rule.max(8),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Before & After Carousel'}),
  },
})
