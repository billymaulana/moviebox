<script setup lang="ts">
definePageMeta({
  title: 'Home',
})

const AsyncWrapper = defineComponent(async (_, ctx) => {
  const popularMovies = await listMedia('movie', 'popular', 1)
  return () => ctx.slots?.default?.({ popularMovies })
})
</script>

<template>
  <div>
    <Suspense>
      <AsyncWrapper>
        <template #default="{ popularMovies }">
          <HomeHero :items="popularMovies.results.slice(0, 5)" />
        </template>
      </AsyncWrapper>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
