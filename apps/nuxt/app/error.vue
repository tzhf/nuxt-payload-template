<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <h1 class="mb-4 text-6xl font-bold">
        {{ errorData.code }}
      </h1>

      <p class="mb-8 text-xl">
        {{ errorData.message }}
      </p>

      <button
        class="bg-primary text-primary-foreground inline-flex w-full cursor-pointer items-center justify-center rounded-md px-8 py-3 text-base font-semibold tracking-wider transition-all duration-300 hover:opacity-90 sm:w-auto"
        @click="handleError"
      >
        Go back home
      </button>
    </div>
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
        message: 'Page not found',
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
  title: `${errorData.value.code} — Error`,
})

const handleError = () => clearError({ redirect: '/' })
</script>
