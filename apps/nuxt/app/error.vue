<template>
  <div class="flex flex-col items-center justify-between gap-12 px-20 pt-24">
    <div class="flex flex-col items-center gap-6">
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-8xl font-extrabold">Uh-oh!</h1>
        <h2 class="text-2xl leading-10 font-bold">
          {{ errorData.code }}
        </h2>
        <p class="text-center text-lg leading-7 font-normal text-stone-700">
          {{ errorData.message }}
        </p>
      </div>

      <Button @click="handleError">Go back home</Button>
    </div>

    <img
      src="/404.png"
      alt="A confused dog with a glasses and a knitted sweater."
      class="max-w-none -translate-x-15 object-cover"
      :width="504"
      :height="288"
    />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{
  error: NuxtError
}>()

const isDev = import.meta.dev

const errorData = computed(() => {
  switch (error.status) {
    case 404:
      return {
        code: 404,
        message: 'We couldn’t find the page you’re looking for.',
      }

    case 500:
      return {
        code: 500,
        message: isDev
          ? error.message
          : "Something went wrong — we're working on it",
      }

    case 503:
      return {
        code: 503,
        message: isDev ? error.message : 'Service temporarily unavailable',
      }

    default:
      return {
        code: error.status || 'Error',
        message: isDev ? error.message : 'An unexpected error occurred',
      }
  }
})

useSeoMeta({
  title: `${errorData.value.code} — ${errorData.value.message}`,
})

const handleError = () => clearError({ redirect: '/' })
</script>
