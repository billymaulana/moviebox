<script setup lang="ts">
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
  <div>
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <BaseIframe />
  </div>
</template>
