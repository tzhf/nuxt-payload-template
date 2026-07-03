<script lang="ts" setup>
import type { TextBlock } from '#payload-types'

defineProps<{
  block: TextBlock
}>()
</script>

<template>
  <section
    :id="block.anchorId ?? undefined"
    class="mx-auto max-w-3xl px-6 py-16"
  >
    <div class="prose prose-lg max-w-none">
      <PayloadRichText v-if="block.content" :content="block.content" />
    </div>
  </section>
</template>
