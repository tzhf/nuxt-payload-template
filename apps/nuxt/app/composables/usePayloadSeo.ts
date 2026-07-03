import type { Page } from '#payload-types'

export const usePayloadSeo = (page: Ref<Page | null>) => {
  watchEffect(() => {
    if (!page.value) return

    const meta = page.value.meta ?? {}

    const imageUrl = useRelationshipField(meta.image)?.value?.sizes?.opengraph
      ?.url

    useSeoMeta({
      title: meta.title || page.value.title || undefined,
      description: meta.description || undefined,
      ogDescription: meta.description || undefined,
      ogImage: imageUrl || undefined,
      twitterDescription: meta.description || undefined,
      twitterImage: imageUrl || undefined,
    })
  })
}
