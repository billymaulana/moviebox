<script setup lang="ts">
definePageMeta({
  layout: 'home',
})

const breakpoints = ref({
  320: {
    itemsToShow: 1,
    snapAlign: 'center',
  },
  768: {
    itemsToShow: 1,
    snapAlign: 'center',
  },
  1024: {
    itemsToShow: 3,
    snapAlign: 'center',
  },
  1280: {
    itemsToShow: 4,
    snapAlign: 'center',
  },
})

const AsyncWrapper = defineComponent(async (_, ctx) => {
  try {
    const [listPopular, listUpcoming, listCast] = await Promise.all([
      listMedia('movie', 'popular', 1),
      listMedia('movie', 'upcoming', 1),
      getListPerson(),
    ])
    const listFivePopular = listPopular?.results?.slice(0, 5)
    const fivePopularId = listFivePopular.map((result: { id: string }) => result.id)
    const videosResults = await Promise.all(
      fivePopularId.slice(0, 5).map(async (id: string) => {
        const movie = await getMedia('movie', id)
        return movie.videos || []
      }),
    )
    const list5PopularTrailer = videosResults.flat()

    return () => ctx.slots?.default?.({ listPopular, listUpcoming, list5PopularTrailer, listCast })
  }
  catch (error) {
    console.error('Failed to fetch data:', error)
    return () => ctx.slots?.default?.({ listPopular: [], listUpcoming: [], list5PopularTrailer: [], listCast: null })
  }
})

const showModal = useIframeModal()

function playVideo(url: string) {
  const videoUrl = `https://www.youtube.com/embed/${url}`
  showModal(videoUrl)
}
</script>

<template>
  <div>
    <Suspense>
      <AsyncWrapper>
        <template #default="{ listPopular, listUpcoming, list5PopularTrailer, listCast }">
          <HomeHero :items="listPopular.results.slice(0, 5)" :trailer="list5PopularTrailer" />

          <section class="section-featured relative py-6">
            <div class="container">
              <div class="row">
                <div class="col-12 flex items-center justify-between">
                  <h2 class="fontbold f-36">
                    Featured Movie
                  </h2>
                  <NuxtLink to="/movie/category/popular" class="flex items-center text-rose-700 f-18 lh-18">
                    See More
                    <NuxtIcon name="heroicons:chevron-right-solid" class="text-red-700" />
                  </NuxtLink>
                </div>
              </div>
              <div class="row py-8">
                <carousel :breakpoints="breakpoints" :wrap-around="false" snap-align="start" class="my-slider w-full">
                  <slide
                    v-for="(listFeatured, id) in listPopular.results.slice(0, 12)" :key="id" sm="col-12" md="col-6"
                    xl="col-3"
                  >
                    <NuxtLink :to="`/movie/${listFeatured.id}`" class="w-full">
                      <BaseCard :items="listFeatured" />
                    </NuxtLink>
                  </slide>
                  <template #addons>
                    <navigation />
                  </template>
                </carousel>
              </div>
            </div>
          </section>

          <section class="section-arrival relative py-6">
            <div class="container">
              <div class="row">
                <div class="col-12 flex items-center justify-between">
                  <h2 class="fontbold f-36">
                    New Arrival
                  </h2>
                  <NuxtLink to="/movie/category/upcoming" class="flex items-center text-rose-700 f-18 lh-18">
                    See More
                    <NuxtIcon name="heroicons:chevron-right-solid" class="text-red-700" />
                  </NuxtLink>
                </div>
              </div>
              <div class="row py-8">
                <carousel :breakpoints="breakpoints" :wrap-around="true" snap-align="start" class="my-slider w-full">
                  <slide
                    v-for="(upcoming, id) in listUpcoming.results.slice(0, 12)" :key="id" sm="col-12" md="col-6"
                    xl="col-3"
                  >
                    <NuxtLink :to="`/movie/${upcoming.id}`" class="w-full">
                      <BaseCard :items="upcoming" />
                    </NuxtLink>
                  </slide>
                  <template #addons>
                    <navigation />
                  </template>
                </carousel>
              </div>
            </div>
          </section>

          <section class="section-video relative py-6">
            <div class="container">
              <div class="row">
                <div class="col-12 flex items-center justify-between">
                  <h2 class="fontbold f-36">
                    Exclusive Video
                  </h2>
                  <NuxtLink to="/" class="flex items-center text-rose-700 f-18 lh-18">
                    See More
                    <NuxtIcon name="heroicons:chevron-right-solid" class="text-red-700" />
                  </NuxtLink>
                </div>
              </div>
              <div class="row py-8">
                <carousel :items-to-show="3" :wrap-around="true" snap-align="start" class="video-slider h-full w-full">
                  <slide v-for="(itemVideo, id) in list5PopularTrailer" :key="id" sm="col-12" md="col-6" xl="col-6">
                    <div class="card-video mx-3 w-full">
                      <button
                        class="card-video-btn relative h-full w-full pb2 text-left"
                        @click="playVideo(itemVideo.results[1].key)"
                      >
                        <div class="card-video-group aspect-16/9 overflow-hidden">
                          <img
                            :src="`http://img.youtube.com/vi/${itemVideo.results[1].key}/maxresdefault.jpg`"
                            width="400" height="600" :alt="itemVideo.results[1].name" class="img-youtube"
                          >
                          <div class="icon-play">
                            <NuxtIcon name="heroicons:play-circle" size="50px" class="text-white" />
                          </div>
                        </div>
                        <div class="mt-2 text-left text-gray-900 font-bold f-18">
                          {{ itemVideo.results[1].name }}
                        </div>
                        <div class="text-gray-400 f-12">
                          {{ itemVideo.results[1].type }}
                        </div>
                      </button>
                    </div>
                  </slide>
                  <template #addons>
                    <navigation />
                  </template>
                </carousel>
              </div>
            </div>
          </section>

          <section class="section-cast relative py-6">
            <div class="container">
              <div class="row">
                <div class="col-12 flex items-center justify-between">
                  <h2 class="fontbold f-36">
                    Featured Cast
                  </h2>
                  <NuxtLink to="/person" flex items-center text-rose-700 f-18 lh-18>
                    See More
                    <NuxtIcon name="heroicons:chevron-right-solid" text-red-700 />
                  </NuxtLink>
                </div>
              </div>
              <div class="row py-8">
                <carousel :breakpoints="breakpoints" :wrap-around="true" snap-align="start" class="my-slider w-full">
                  <slide
                    v-for="(itemCast, id) in listCast.results.slice(0, 12)" :key="id" sm="col-12" md="col-6"
                    xl="col-3"
                  >
                    <NuxtLink :to="`/person/${itemCast.id}`" class="w-full">
                      <BaseCardCast :item="itemCast" />
                    </NuxtLink>
                  </slide>
                  <template #addons>
                    <navigation />
                  </template>
                </carousel>
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

<style lang="scss">
.card-video {
  .card-video-btn {
    @apply relative pb2 text-left w-full h-full;

    .card-video-group {
      @apply relative block w-full h-full flex transition duration-400;

      .img-youtube {
        height: 100%;
        width: 100%;
        object-fit: cover;
        filter: brightness(0.8);
      }
    }

    .icon-play {
      position: absolute;
      right: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 43%;
      opacity: 0.8;
      transition: opacity 0.3s ease-in-out;

      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
}
.video-slider {
  .carousel__prev,
  .carousel__next {
    box-sizing: content-box;
    height: 60px;
    width: 60px;
    font-size: 60px;
    text-align: center;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: 0;
    cursor: pointer;
    margin: 0 10px;
    top: 43%;
    transform: translateY(-43%);
  }

  .carousel__icon {
    width: 60px;
    height: 60px;
  }

  .carousel__next {
    right: -60px;
  }

  .carousel__prev {
    left: -60px;
  }
}
</style>
