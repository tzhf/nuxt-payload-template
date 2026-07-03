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
  const c = siteSettings.value?.colors
  const font = siteSettings.value?.typography?.font || 'Inter'
  const fontSize = siteSettings.value?.typography?.fontSize || 14

  return `:root {
    --font-body: '${font}', sans-serif;
    --font-size: ${fontSize}px;
    --color-background: ${c?.background || '#ffffff'};
    --color-foreground: ${c?.foreground || '#111111'};
    --color-primary: ${c?.primary || '#000000'};
    --color-primary-foreground: ${c?.primaryForeground || '#ffffff'};
    --color-secondary: ${c?.secondary || '#f4f4f5'};
    --color-secondary-foreground: ${c?.secondaryForeground || '#111111'};
    --color-muted: ${c?.muted || '#f4f4f5'};
    --color-muted-foreground: ${c?.mutedForeground || '#71717a'};
    --color-border: ${c?.border || '#e4e4e7'};
    --color-accent: ${c?.accent || '#f4f4f5'};
    --color-accent-foreground: ${c?.accentForeground || '#111111'};
    --nav-background-color: ${siteSettings.value?.navbar?.backgroundColor || '#000000'};
    --nav-background-color-scroll: ${siteSettings.value?.navbar?.backgroundColorScroll || '#000000'};
    --nav-text-color: ${siteSettings.value?.navbar?.textColor || '#ffffff'};
  }`
})

// useStyleTag(cssVariables)

const googleFontsUrl = computed(() => {
  const font = siteSettings.value?.typography?.font || 'Inter'
  const params = new URLSearchParams()
  params.append('family', `${font.trim()}:wght@400;500;600;700;800;900`)
  params.append('display', 'swap')
  return `https://fonts.googleapis.com/css2?${params}`
})

useHead(() => ({
  style: [
    {
      innerHTML: cssVariables,
      type: 'text/css',
    },
  ],
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
const ogImageUrl = computed(
  () =>
    useRelationshipField(siteSettings.value?.meta?.image)?.value?.sizes
      ?.opengraph?.url,
)

useSeoMeta({
  titleTemplate: (title?: string) =>
    title
      ? `${title} | ${siteSettings.value?.meta?.title || config.public.siteName}`
      : siteSettings.value?.meta?.title || config.public.siteName,
  description: siteSettings.value?.meta?.description || undefined,
  ogSiteName: siteSettings.value?.meta?.title || config.public.siteName,
  ogDescription: siteSettings.value?.meta?.description || undefined,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImage: ogImageUrl.value || undefined,
  twitterDescription: siteSettings.value?.meta?.description || undefined,
  twitterImage: ogImageUrl.value || undefined,
  twitterCard: 'summary_large_image',
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
