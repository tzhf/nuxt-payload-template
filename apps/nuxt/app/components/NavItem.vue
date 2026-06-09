<script setup lang="ts">
import type { SiteSettings } from '#payload-types'

// const { resolveLink, resolveTarget, resolveRel } = useResolveLink()

const props = defineProps<{
  item: NonNullable<NonNullable<SiteSettings['navbar']>['links']>[number]
}>()
</script>

<template>
  <NuxtLink
    :to="item.url"
    :target="item.openInNewTab ? '_blank' : undefined"
    :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
    class="relative flex h-full cursor-pointer items-center text-base font-medium"
  >
    {{ item.label }}
  </NuxtLink>
</template>
