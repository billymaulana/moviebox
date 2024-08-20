<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  charset: 'utf-8',
  titleTemplate: title => title !== appName ? `${title} | ${appName}` : title,
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
