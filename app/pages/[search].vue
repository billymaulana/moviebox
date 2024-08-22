<script setup lang="ts">
import { LIST_GENRES } from '~/constants'

const searchStore = useSearchStore()
const items = computed(() => searchStore.items)
const currentSearch = computed(() => searchStore.currentSearch)
const isLoading = computed(() => searchStore.isLoading)
const count = computed(() => searchStore.count)
const { loadingNext } = searchStore
const tailEl = ref<HTMLDivElement>()

if (import.meta.client) {
  loadingNext()
  useIntervalFn(() => {
    if (!tailEl.value || isLoading.value)
      return
    if (count.value != null && items.value.length >= count.value)
      return
    const { top } = tailEl.value.getBoundingClientRect()
    const delta = top - window.innerHeight
    if (delta < 400)
      loadingNext()
  }, 500)
}
else {
  await loadingNext()
}

useHead({
  title: computed(() => `Search: ${currentSearch.value}`),
})
</script>

<template>
  <section class="search-page py-8">
    <div class="container">
      <div class="row justify-center">
        <div v-if="currentSearch" md="col-12">
          <h1 class="fontbold f-36">
            Search Result for: {{ currentSearch }}
          </h1>
        </div>
      </div>
      <div class="row justify-center">
        <div v-if="isLoading" class="col-12">
          <div class="flex-flow h-[75vh] flex flex-col items-center justify-center bg-white">
            <BaseSpinner />
          </div>
        </div>
        <div v-if="!isLoading && items.length === 0" class="col-12">
          <div class="relative min-h-[80vh] flex items-center justify-center">
            <h1 class="fontbold f-36">
              Data Not Found
            </h1>
          </div>
        </div>
      </div>
      <div v-if="!isLoading && items.length > 0" class="row justify-center py-8">
        <div v-for="(listSearch, id) in items" :key="id" sm="col-12" md="col-6" xl="col-3">
          <BaseCard :items="listSearch" :genre="LIST_GENRES" />
        </div>
        <div ref="tailEl" item-center w-full flex justify-center text-center>
          <NuxtIcon v-if="isLoading" name="mynaui:spinner-one" ma animate-spin text-4xl />
        </div>
      </div>
    </div>
  </section>
</template>
