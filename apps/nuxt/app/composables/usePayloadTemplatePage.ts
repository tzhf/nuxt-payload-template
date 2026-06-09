import { GetHomePageDocument } from '#graphql-exports'

import type { UseSeoMetaInput } from '@unhead/vue'
import type { DocumentNode } from 'graphql'
import type { PaginatedDocs } from 'payload'
import type { TemplatePage } from '#payload-types'

interface TemplatePageQueryResult {
  TemplatePages: PaginatedDocs<TemplatePage>
}

const pageTemplateQueries: Record<TemplatePage['template'], DocumentNode> = {
  Home: GetHomePageDocument,
}

export const usePayloadTemplatePage = async (
  template: TemplatePage['template'],
) => {
  const nuxtApp = useNuxtApp()

  const doc = ref<TemplatePage | null>(null)

  const { data } = await useAsyncQuery<TemplatePageQueryResult>(
    pageTemplateQueries[template],
  )

  doc.value = data.value?.TemplatePages.docs[0] || null

  if (doc.value) {
    const docMeta = doc.value.meta
    const seoMeta: UseSeoMetaInput = {}
    seoMeta.title =
      seoMeta.ogTitle =
      seoMeta.twitterTitle =
        docMeta?.title || doc.value.template

    if (docMeta?.description) {
      seoMeta.description =
        seoMeta.ogDescription =
        seoMeta.twitterDescription =
          docMeta.description
    }

    if (docMeta?.image) {
      const opengraphImage = useRelationshipField(docMeta?.image)
      seoMeta.ogImage = opengraphImage.value?.sizes?.opengraph?.url || ''
    }

    nuxtApp.runWithContext(() => useSeoMeta(seoMeta))
  } else {
    throw createError({
      statusCode: 404,
      message: 'Page data missing.',
    })
  }

  return doc
}
