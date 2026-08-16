import {defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'
import {imageWithAlt} from '../objects/imageWithAlt'

export const siteImages = defineType({
  name: 'siteImages',
  title: 'Site Images',
  type: 'document',
  icon: ImageIcon,
  fields: [imageWithAlt('aboutImage', 'About / founder photo')],
  preview: {
    prepare: () => ({title: 'Site Images'}),
  },
})
