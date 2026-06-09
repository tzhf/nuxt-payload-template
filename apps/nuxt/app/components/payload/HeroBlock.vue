<template>
  <section class="relative flex min-h-[70vh] items-center overflow-hidden">
    <!-- Background image -->
    <div v-if="block.image" class="absolute inset-0 z-0">
      <img
        :src="block.image.sizes?.xl?.url || ''"
        :width="block.image.sizes?.xl?.width"
        class="h-full w-full object-cover"
        alt=""
      />
      <div class="absolute inset-0 bg-black/40" />
    </div>

    <div class="relative z-10 mx-auto max-w-5xl px-6 py-24">
      <h1
        v-if="block.title"
        class="mb-6 text-5xl leading-tight font-bold md:text-7xl"
        v-text="block.title"
      />
      <p
        v-if="block.subtitle"
        class="/80 mb-10 max-w-2xl text-xl"
        v-text="block.subtitle"
      />

      <button
        v-if="block.cta?.label && block.cta?.url"
        :href="block.cta.url"
        class="inline-block bg-white px-8 py-4 font-semibold text-black transition-colors hover:bg-white/90"
        v-text="block.cta.label"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { HeroBlock } from '#payload-types'

defineProps<{
  block: HeroBlock
}>()
</script>
