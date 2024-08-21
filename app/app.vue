<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import { appName } from '~/constants'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  titleTemplate: title => title !== appName ? `${title} | ${appName}` : title,
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <BaseIframe />
</template>
