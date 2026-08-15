import type {StructureResolver} from 'sanity/structure'
import {ImageIcon} from '@sanity/icons/Image'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Images')
        .icon(ImageIcon)
        .id('siteImages')
        .child(S.document().schemaType('siteImages').documentId('siteImages')),
    ])
