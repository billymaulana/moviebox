<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'

const src = ref<string | null>(null)

function showModal(link: string) {
  src.value = link
}
const el = ref<HTMLIFrameElement>()

provideIframeModal(showModal)

onKeyDown('Escape', () => {
  if (src.value)
    src.value = null
})

onClickOutside(el, () => {
  src.value = null
})
</script>

<template>
  <div v-if="src" class="modal-wrapper fixed bottom-0 left-0 right-0 top-0 z-[9999] flex bg-black:90">
    <button
      class="fixed right-[20px] top-[20px] z-[9999] h-[2.25rem] w-[2.25rem] flex items-center justify-center"
      @click="src = null"
    >
      <NuxtIcon name="heroicons:x-mark" class="text-white" size="2rem" />
    </button>
    <iframe
      ref="el" allow="autoplay; encrypted-media" :src="src" allowfullscreen
      class="m5 w-full border-none lg:m20"
    />
  </div>
</template>
