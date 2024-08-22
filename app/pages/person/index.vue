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
      <div class="row justify-center py-8">
        <div v-for="(itemCast, id) in items" :key="id" sm="col-12" md="col-6" xl="col-3">
          <NuxtLink :to="`/person/${itemCast.id}`" class="w-full">
            <BaseCardCast :item="itemCast" />
          </NuxtLink>
        </div>
        <div v-if="isLoading" class="col-12">
          <div class="flex-flow h-[75vh] flex flex-col items-center justify-center bg-white">
            <BaseSpinner />
          </div>
        </div>
        <div ref="tailEl" mx-auto col-12 flex items-center justify-center>
          <NuxtIcon v-if="isLoading" name="mynaui:spinner-one" ma flex animate-spin text-4xl />
        </div>
      </div>
    </div>
  </section>
</template>
