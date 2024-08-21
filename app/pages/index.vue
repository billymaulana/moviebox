<script setup lang="ts">
definePageMeta({
  title: 'Home',
})

const AsyncWrapper = defineComponent(async (_, ctx) => {
  try {
    const [listPopular, listGenre, listUpcoming, listCast] = await Promise.all([
      listMedia('movie', 'popular', 1),
      getGenreList('movie'),
      listMedia('movie', 'upcoming', 1),
      getListPerson(),
    ])
    const listFivePopular = listPopular?.results?.slice(0, 5)
    const fivePopularId = listFivePopular.map((result: { id: number }) => result.id)
    const videosResults = await Promise.all(
      fivePopularId.slice(0, 5).map(async (id: number) => {
        const movie = await getMedia('movie', id)
        return movie.videos || []
      }),
    )
    const list5PopularTrailer = videosResults.flat()

    return () => ctx.slots?.default?.({ listPopular, listGenre, listUpcoming, list5PopularTrailer, listCast })
  }
  catch (error) {
    console.error('Failed to fetch data:', error)
    return () => ctx.slots?.default?.({ listPopular: [], listGenre: [], listUpcoming: [], list5PopularTrailer: [], listCast: null })
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
        <template #default="{ listPopular, listGenre, listUpcoming, list5PopularTrailer, listCast }">
          <ClientOnly>
            <HomeHero :items="listPopular.results.slice(0, 5)" :trailer="list5PopularTrailer" />

            <section class="section-featured relative py-6">
              <div container>
                <div row>
                  <div col-12 flex items-center justify-between>
                    <h2 fontbold f-36>
                      Featured Movie
                    </h2>
                    <NuxtLink to="/movies/featured" flex items-center text-rose-700 f-18 lh-18>
                      See More
                      <NuxtIcon name="heroicons-solid:chevron-right" text-red-700 />
                    </NuxtLink>
                  </div>
                </div>
              </div>
              <div class="px-[75px]" container-fluid>
                <div row py-8 class="mx-[-20px]">
                  <carousel :items-to-show="4" :wrap-around="false" snap-align="start" class="feature-slider w-full">
                    <slide
                      v-for="(listFeatured, id) in listPopular.results.slice(0, 12)" :key="id" sm="col-12" md="col-6"
                      xl="col-3"
                    >
                      <BaseCard :items="listFeatured" :genre="listGenre" />
                    </slide>
                    <template #addons>
                      <navigation />
                    </template>
                  </carousel>
                </div>
              </div>
            </section>

            <section class="section-arrival relative py-6">
              <div container>
                <div row>
                  <div col-12 flex items-center justify-between>
                    <h2 fontbold f-36>
                      New Arrival
                    </h2>
                    <NuxtLink to="/movies/featured" flex items-center text-rose-700 f-18 lh-18>
                      See More
                      <NuxtIcon name="heroicons-solid:chevron-right" text-red-700 />
                    </NuxtLink>
                  </div>
                </div>
              </div>
              <div class="px-[75px]" container-fluid>
                <div row py-8 class="mx-[-20px]">
                  <carousel :items-to-show="4" :wrap-around="true" snap-align="start" class="feature-slider w-full">
                    <slide
                      v-for="(upcoming, id) in listUpcoming.results.slice(12)" :key="id" sm="col-12" md="col-6"
                      xl="col-3"
                    >
                      <BaseCard :items="upcoming" :genre="listGenre" />
                    </slide>
                    <template #addons>
                      <navigation />
                    </template>
                  </carousel>
                </div>
              </div>
            </section>

            <section class="section-video relative py-6">
              <div container>
                <div row>
                  <div col-12 flex items-center justify-between>
                    <h2 fontbold f-36>
                      Exclusive Video
                    </h2>
                    <NuxtLink to="/movies/featured" flex items-center text-rose-700 f-18 lh-18>
                      See More
                      <NuxtIcon name="heroicons-solid:chevron-right" text-red-700 />
                    </NuxtLink>
                  </div>
                </div>
              </div>
              <div container>
                <div row py-8 class="mx-[-10px]">
                  <carousel
                    :items-to-show="2.3" :wrap-around="true" snap-align="start"
                    class="video-slider h-full w-full"
                  >
                    <slide v-for="(itemVideo, id) in list5PopularTrailer" :key="id" sm="col-12" md="col-6" xl="col-6">
                      <div class="card-video mx-3 w-full">
                        <button class="card-video-btn" @click="playVideo(itemVideo.results[1].key)">
                          <div class="card-video-group aspect-16/9">
                            <img
                              :src="`http://img.youtube.com/vi/${itemVideo.results[1].key}/maxresdefault.jpg`"
                              width="400" height="600" :alt="itemVideo.results[1].name" class="img-youtube"
                            >
                            <div class="icon-play">
                              <NuxtIcon name="heroicons:play-circle" size="50px" class="text-white" />
                            </div>
                          </div>
                          <div mt-2 text-left text-gray-900 font-bold f-18>
                            {{ itemVideo.results[1].name }}
                          </div>
                          <div text-gray-400 f-12>
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
              <div container>
                <div row>
                  <div col-12 flex items-center justify-between>
                    <h2 fontbold f-36>
                      Featured Cast
                    </h2>
                    <NuxtLink to="/movies/featured" flex items-center text-rose-700 f-18 lh-18>
                      See More
                      <NuxtIcon name="heroicons-solid:chevron-right" text-red-700 />
                    </NuxtLink>
                  </div>
                </div>
              </div>
              <div class="px-[75px]" container-fluid>
                <div row py-8 class="mx-[-20px]">
                  <carousel :items-to-show="4" :wrap-around="true" snap-align="start" class="feature-slider w-full">
                    <slide
                      v-for="(ItemCast, id) in listCast.results.slice(0, 12)" :key="id" sm="col-12" md="col-6"
                      xl="col-3"
                    >
                      <div class="card">
                        <div class="card-header">
                          <img
                            class="card-img" :src="`https://image.tmdb.org/t/p/w500/${ItemCast?.profile_path}`"
                          >
                        </div>
                        <div class="card-body">
                          <p text-left text-gray-900 font-bold f-18>
                            {{ ItemCast?.name }}
                          </p>
                        </div>
                      </div>
                    </slide>
                    <template #addons>
                      <navigation />
                    </template>
                  </carousel>
                </div>
              </div>
            </section>
            <ClientOnly />
          </clientonly>
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
.carousel__icon {
  width: 60px;
  height: 60px;
}
.card {
  display: flex;
  flex-flow: column;
  justify-content: stretch;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 250px;
  margin-bottom: 40px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  top: 0;

  &:hover {
    @apply ease-in-out duration-[.3s] group-hover: top-[-10px] group-hover:shadow-md;
    cursor: pointer;
  }

  .card-header {
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 350px;

    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-body {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 120px;
  }
}

.feature-slider {
  .carousel__prev,
  .carousel__next {
    margin: 0 0px;
    top: 30%;
    transform: translateY(-30%);
    width: 60px;
    height: 60px;
  }

  .carousel__prev {
    left: -10px;
  }

  .carousel__next {
    right: -10px;
  }
}
.video-slider {
  .carousel__prev,
  .carousel__next {
    margin: 0 0px;
    top: 43%;
    transform: translateY(-43%);
    width: 60px;
    height: 60px;
  }

  .carousel__prev {
    left: -50px;
  }

  .carousel__next {
    right: -50px;
  }
}

.card-video {
  .card-video-btn {
    @apply relative pb2 text-left w-full h-full;
    .card-video-group {
      @apply relative block w-full h-full flex transition duration-400;
      .img-youtube {
        @apply h-full w-full object-cover;
        filter: brightness(0.8);
      }
    }
    .icon-play {
      @apply absolute flex justify-center right-0 left-0;
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
</style>
