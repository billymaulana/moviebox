<script setup lang="ts">
import { LIST_GENRES } from '~/constants'

const searchStore = useSearchStore()
const items = computed(() => searchStore.items)
const currentSearch = computed(() => searchStore.currentSearch)
const isLoading = computed(() => searchStore.isLoading)
const count = computed(() => searchStore.count)

function loadMore() {
  const nextPage = Math.ceil(searchStore.items.length / 20) + 1
  searchStore.fetchSearch(nextPage)
}

watch(items, () => {
})

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
        <div sm="col-12">
          {{ count }}
          <button class="mx-auto btn-primary flex items-center justify-center text-center" @click="loadMore">
            Load More
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
