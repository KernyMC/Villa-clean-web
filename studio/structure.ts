import type {StructureResolver} from 'sanity/structure'
import {ImageIcon} from '@sanity/icons/Image'
import {ImagesIcon} from '@sanity/icons/Images'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Hero Carousel')
        .icon(ImagesIcon)
        .id('heroCarousel')
        .child(S.document().schemaType('heroCarousel').documentId('heroCarousel')),
      S.listItem()
        .title('Before & After Carousel')
        .icon(ImagesIcon)
        .id('beforeAfterCarousel')
        .child(S.document().schemaType('beforeAfterCarousel').documentId('beforeAfterCarousel')),
      S.listItem()
        .title('Site Images')
        .icon(ImageIcon)
        .id('siteImages')
        .child(S.document().schemaType('siteImages').documentId('siteImages')),
    ])
