export const useSeoResolver = (page: Ref<any>) => {
  const config = useRuntimeConfig()
  const siteSettings = useState<any>('siteSettings')

  watchEffect(() => {
    const pageMeta = page.value?.meta ?? {}
    const siteMeta = siteSettings.value?.meta ?? {}

    const image =
      useRelationshipField(pageMeta.image)?.value?.sizes?.opengraph?.url ||
      useRelationshipField(siteMeta.image)?.value?.sizes?.opengraph?.url

    useSeoMeta({
      title: pageMeta.title || page.value?.title,

      titleTemplate: (t?: string) =>
        t
          ? `${t} | ${siteMeta.title || config.public.siteName}`
          : siteMeta.title || config.public.siteName,

      description: pageMeta.description || siteMeta.description,

      ogDescription: pageMeta.description || siteMeta.description,
      twitterDescription: pageMeta.description || siteMeta.description,

      ogImage: image,
      twitterImage: image,

      ogSiteName: siteMeta.title || config.public.siteName,
      twitterCard: 'summary_large_image',
    })
  })
}
