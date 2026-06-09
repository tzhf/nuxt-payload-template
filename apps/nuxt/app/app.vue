<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

// Adds messages only in a dev environment
loadDevMessages()
loadErrorMessages()

const config = useRuntimeConfig()

// const { siteSettings } = await useSiteSettings()
// const { data: liveSettings } = useLivePreview({
//   initialData: siteSettings,
//   depth: 1,
// })

// const { activeSettings } = useActiveSettings()
// watchEffect(() => {
//   activeSettings.value = liveSettings.value?.typography
//     ? liveSettings.value
//     : siteSettings.value
// })
const { siteSettings } = await useSiteSettings()

const { data: liveData } = useLivePreview({
  initialData: siteSettings,
  depth: 1,
})

watchEffect(() => {
  if (liveData.value?.typography) {
    siteSettings.value = liveData.value
  }
})

const cssVariables = computed(() => {
  const font = siteSettings.value?.typography?.font || 'Inter'
  const fontSize = siteSettings.value?.typography?.fontSize || 14
  const primaryColor = siteSettings.value?.colors?.primaryColor || '#ff0000'
  const backgroundColor =
    siteSettings.value?.colors?.backgroundColor || '#ffffff'
  const navBackgroundColor =
    siteSettings.value?.navbar?.backgroundColor || '#000000'
  const navBackgroundColorScroll =
    siteSettings.value?.navbar?.backgroundColorScroll || '#000000'
  const navTextColor = siteSettings.value?.navbar?.textColor || '#ffffff'

  return `:root {
    --font-body: '${font}', sans-serif;
    --font-size: ${fontSize}px;
    --color-primary: ${primaryColor};
    --color-background: ${backgroundColor};
    --nav-background-color: ${navBackgroundColor};
    --nav-background-color-scroll: ${navBackgroundColorScroll};
    --nav-text-color: ${navTextColor};
  }`
})

useStyleTag(cssVariables)

const googleFontsUrl = computed(() => {
  const font = siteSettings.value?.typography?.font || 'Inter'
  const params = new URLSearchParams()
  params.append('family', `${font.trim()}:wght@400;500;600;700;800;900`)
  params.append('display', 'swap')
  return `https://fonts.googleapis.com/css2?${params}`
})

useHead(() => ({
  link:
    import.meta.dev && googleFontsUrl.value
      ? [
          { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
          {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: '',
          },
          { rel: 'stylesheet', href: googleFontsUrl.value },
        ]
      : [],
}))

/**
 * SEO / Meta
 */
const opengraphImage = useRelationshipField(
  computed(() => siteSettings.value?.meta?.image),
)

useSeoMeta({
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  titleTemplate: (title) =>
    title
      ? `${title} | ${siteSettings.value?.meta?.title || config.public.siteName}`
      : siteSettings.value?.meta?.title || config.public.siteName,
  ogTitle: siteSettings.value?.meta?.title,
  ogSiteName: siteSettings.value?.meta?.title || config.public.siteName,
  twitterTitle: siteSettings.value?.meta?.title,
  description: siteSettings.value?.meta?.description || '',
  ogDescription: siteSettings.value?.meta?.description || '',
  twitterDescription: siteSettings.value?.meta?.description || '',
  ogImage: opengraphImage.value?.sizes?.opengraph?.url || '',
})

/**
 * Head / Favicon
 */
const themeColor = '#000000'
useHead({
  bodyAttrs: {
    class: 'min-h-full antialiased',
  },
  htmlAttrs: {
    class: 'h-full',
    lang: 'en',
  },
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: siteSettings.value?.meta?.title || config.public.siteName,
    },
    { name: 'msapplication-TileColor', content: themeColor },
    { name: 'msapplication-config', content: '/browserconfig.xml' },
    { name: 'theme-color', content: themeColor },
  ],
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/favicon-16x16.png',
    },
    { rel: 'manifest', href: '/site.webmanifest' },
    {
      rel: 'mask-icon',
      href: '/favicon/safari-pinned-tab.svg',
      color: themeColor,
    },
    {
      rel: 'shortcut icon',
      href: '/favicon/favicon.ico',
    },
  ],
})
</script>
