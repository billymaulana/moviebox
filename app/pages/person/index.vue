<script setup lang="ts">
const route = useRoute()
const id = route.params.id
const items: Media[] = reactive([])
const page = ref(0)
const isLoading = ref(false)
const tailEl = ref<HTMLDivElement>()

async function fetch(page: number) {
  items.push(...(await getListPerson(page.value)).results)
}

async function loadingNext() {
  if (isLoading.value)
    return
  isLoading.value = true
  try {
    page.value += 1
    await fetch(page)
  }
  finally {
    isLoading.value = false
  }
}

if (import.meta.client) {
  loadingNext()
  useIntervalFn(() => {
    if (!tailEl.value || isLoading.value)
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
</script>

<template>
  <section class="section-cast relative py-6">
    <div class="container">
      <div class="row">
        <div class="col-12 flex items-center justify-between">
          <h1 class="fontbold f-36">
            Person
          </h1>
        </div>
      </div>
      <div class="row py-8">
        <div v-for="(itemCast, id) in items" :key="id" sm="col-12" md="col-6" xl="col-3">
          <NuxtLink :to="`/person/${itemCast.id}`" class="w-full">
            <BaseCardCast :item="itemCast" />
          </NuxtLink>
        </div>
        <div ref="tailEl" w-full>
          Load More ...
        </div>
        <div v-if="isLoading" animate-pulse p10>
          <div i-carbon:circle-dash ma animate-spin text-4xl />
        </div>
      </div>
    </div>
  </section>
</template>
