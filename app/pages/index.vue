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
          <section class="section-featured" relative py-8>
            <div container>
              <div row>
                <div col-12 flex items-center justify-between>
                  <h2 fontbold f-36>
                    Featured Movie
                  </h2>
                  <NuxtLink to="/movies/featured" flex items-center text-rose-700 lh-18 f-18>
                    See More
                    <NuxtIcon name="heroicons-solid:chevron-right" text-red-700 />
                  </NuxtLink>
                </div>
              </div>
              <div row justify-center py-8>
                <div v-for="(listFeatured, id) in popularMovies.results.slice(12)" :key="id" sm="col-12" md="col-6" xl="col-3">
                  <BaseCard :items="listFeatured" />
                </div>
              </div>
            </div>
          </section>
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
