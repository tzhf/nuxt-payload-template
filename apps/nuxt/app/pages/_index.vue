<template>
  <!-- <div v-if="fields"> -->
  <template v-for="block in fields?.layout" :key="block.id">
    <PayloadHeroBlock v-if="block.blockType === 'hero'" :block="block" />
    <PayloadTextBlock v-if="block.blockType === 'text'" :block="block" />
  </template>
  <!-- </div> -->
</template>

<script lang="ts" setup>
const initialData = await usePayloadTemplatePage('Home').catch(() => null)
const { data: doc } = useLivePreview({ initialData, depth: 1 })
const fields = computed(() => {
  // Guard against globals live preview overwriting page data
  if (!doc.value?.homeTemplateFields)
    return initialData?.value?.homeTemplateFields
  return doc.value?.homeTemplateFields
})
</script>
