<script setup lang="ts">
import type { MediaType } from '~/types'
import { LIST_GENRES } from '~/constants'

definePageMeta({
  key: route => route.fullPath,
  validate: ({ params }) => {
    return ['movie', 'tv'].includes(params.type as MediaType)
  },
  layout: 'home',
})

const route = useRoute()
const type = computed(() => route.params.type as MediaType || 'movie')
const id = computed(() => route.params.id as string)

const [item, recommendations] = await Promise.all([
  getMedia(type.value, id.value),
  getRecommendations(type.value, id.value),
])

function findDirector(data: object) {
  return data.filter(person => person.job === 'Director')
}

function mergerArrayByValue(data: Array) {
  return data.map(item => item.name).join(', ')
}

const showModal = useIframeModal()
function playTrailer(data) {
  if (!data)
    return
  const trailerData = data.videos.results?.find((video: { type: string }) => video.type === 'Trailer')
  if (trailerData) {
    const trailerKey = trailerData.key
    if (trailerKey) {
      const videoUrl: string = `https://www.youtube.com/embed/${trailerKey}`
      showModal(videoUrl)
    }
  }
  else {
    console.warn('No trailer found for the specified index or type.')
  }
}

const breakpoints = ref({
  320: {
    itemsToShow: 1.2,
    snapAlign: 'center',
  },
  768: {
    itemsToShow: 2,
    snapAlign: 'center',
  },
  1024: {
    itemsToShow: 3,
    snapAlign: 'center',
  },
  1280: {
    itemsToShow: 5,
    snapAlign: 'center',
  },
})
useHead({
  title: item.name || item.title,
})
</script>

<template>
  <div>
    <section v-if="item" class="page-detail-section page-details bg-white">
      <div class="container-fluid">
        <div
          v-if="item" class="hero-section"
          :style="{ 'background-image': `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})` }"
        >
          <div class="z-4 h-[250px] flex gap-[30px] container" sm="justify-center ">
            <img class="poster" alt="poster" :src="`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`">
            <div class="movie-detail" sm="hidden" md="flex">
              <div class="movie-title h-full flex flex-col justify-start">
                <div class="text-3xl text-gray-200 font-medium">
                  {{ item.release_date.slice(0, 4) }}
                </div>
                <h1 class="text-gray-200 font-semibold f-36 lh-44">
                  {{ item.title }}
                </h1>
                <div>
                  <span class="mt-2 block text-gray-200 font-medium leading-2 f-14 lh-16">
                    {{ mergerArrayByValue(item.genres) }}
                  </span>
                </div>
                <div class="my-[20px]">
                  <button class="btn-primary" @click="playTrailer(item)">
                    <NuxtIcon name="heroicons:play-circle" class="text-white" size="20px" /> Watch Trailer
                  </button>
                </div>
              </div>
              <div class="movie-info m-0 flex row items-start justify-between gap-[10px] p-0">
                <div class="h-full flex items-center justify-start uppercase">
                  <div class="h-full flex flex-row items-center pb-[10px]">
                    <NuxtIcon name="heroicons:star-16-solid" size="32" class="mr-[5px] text-yellow" />
                    <span class="text-gray-200 font-semibold lh-[36px] f-36">{{ Math.ceil(item.vote_average).toFixed(1)
                    }}</span>
                  </div>
                </div>
                <div class="v-separator-l h-full flex flex-col items-start justify-center uppercase">
                  <div>Status</div>
                  <div class="text-gray-200">
                    {{ item.status }}
                  </div>
                </div>
                <div class="v-separator-l h-full flex flex-col items-start justify-center uppercase">
                  <div>Language</div>
                  <div class="text-gray-200">
                    {{ item.original_language }}
                  </div>
                </div>
                <div class="v-separator-l h-full flex flex-col items-start justify-center uppercase">
                  <div>
                    <div>Duration</div>
                    <div class="text-gray-200">
                      {{ formatTime(item.runtime) }}
                    </div>
                  </div>
                </div>

                <div class="v-separator-l h-full flex flex-col items-start justify-center uppercase">
                  <div>Director</div>
                  <div class="text-gray-200">
                    {{ findDirector(item.credits?.crew)[0].name }}
                  </div>
                </div>
                <div class="v-separator-l h-full flex flex-col items-start justify-center uppercase">
                  <div>
                    <div>Reviews</div>
                    <div class="text-gray-200">
                      {{ item.vote_count }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container" sm="pt-[7rem]" xl="pt-5">
        <div class="movie-detail mobile" sm="block" md="hidden">
          <div class="movie-title h-full flex flex-col justify-center" sm="text-center" lg="text-start">
            <h1 class="font-semibold f-36 lh-44">
              {{ item.title }}
            </h1>
            <div class="text-3xl font-medium">
              {{ item.release_date.slice(0, 4) }}
            </div>
            <div>
              <span class="mt-2 block font-medium leading-2 f-14 lh-16">
                {{ mergerArrayByValue(item.genres) }}
              </span>
            </div>
            <div class="my-[20px] flex justify-center">
              <button class="btn-primary">
                <NuxtIcon name="heroicons:play-circle" class="text-white" size="20px" /> Watch Trailer
              </button>
            </div>
          </div>
          <div class="movie-info m-0 flex row flex-col content-center items-start justify-between gap-[10px] p-0">
            <div class="h-full flex items-center justify-start uppercase">
              <div class="h-full flex flex-row items-center pb-[10px]">
                <NuxtIcon name="heroicons:star-16-solid" size="32" class="mr-[5px] text-yellow" />
                <span class="text-black font-semibold lh-[36px] f-36">{{ Math.ceil(item.vote_average).toFixed(1)
                }}</span>
              </div>
            </div>

            <div class="h-full flex flex-col items-start justify-center uppercase">
              <div>
                <div>Reviews</div>
                <div class="text-black">
                  {{ item.vote_count }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-center" sm="pt-5" md="pt-0">
          <div class="flex-0-auto" sm="w-full">
            <div class="mx-auto justify-center" sm="text-center" lg="text-start max-w-[50%]">
              <h2 class="text-3xl text-gray-900 font-semibold">
                Overview
              </h2>

              <div class="relative pt-3">
                <p class="flex">
                  {{ item?.overview }}
                </p>
              </div>

              <div class="grid-container py-5">
                <div class="grid-item">
                  Released
                </div>
                <div class="grid-item">
                  {{ formatDate(item.release_date) }}
                </div>
                <div class="grid-item">
                  Director
                </div>
                <div class="grid-item">
                  <NuxtLink :to="`/person/${findDirector(item.credits?.crew)[0].id}`">
                    {{ findDirector(item.credits?.crew)[0].name }}
                  </NuxtLink>
                </div>
                <div class="grid-item">
                  Revenue
                </div>
                <div class="grid-item">
                  {{ formatMoney(item.revenue) }}
                </div>
                <div class="grid-item">
                  Status
                </div>
                <div class="grid-item">
                  {{ item.status }}
                </div>
                <div class="grid-item">
                  Production
                </div>
                <div class="grid-item">
                  {{ mergerArrayByValue(item.production_companies) }}
                </div>
                <div class="grid-item">
                  Runtime
                </div>
                <div class="grid-item">
                  {{ formatTime(item.runtime) }}
                </div>
                <div class="grid-item">
                  Budget
                </div>
                <div class="grid-item">
                  {{ formatMoney(item.budget) }}
                </div>
                <div class="grid-item">
                  Genre
                </div>
                <div class="grid-item">
                  {{ mergerArrayByValue(item.genres) }}
                </div>
                <div class="grid-item">
                  Language
                </div>
                <div class="grid-item uppercase">
                  {{ item.original_language }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-center py-8">
          <div class="col-12">
            <h3 class="text-3xl text-gray-900 font-semibold">
              Cast
            </h3>
          </div>
          <carousel :items-to-show="3" :breakpoints="breakpoints" :wrap-around="true" class="my-slider mt-4 w-full">
            <slide v-for="(itemCast, id) in item.credits?.cast" :key="id" sm="col-12" md="col-6" xl="col-3">
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

    <section v-if="recommendations" class="recommendation-section py-2">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h4 class="text-3xl text-gray-900 font-semibold">
              Recommendation Movies
            </h4>
          </div>
        </div>

        <div class="row pt-8">
          <div
            v-for="(listRecommendation, id) in recommendations.results.slice(0, 4)" :key="id" class="col-6"
            md="col-4" lg="col-3"
          >
            <NuxtLink
              :key="`/movies/${listRecommendation.id}`" class="mb-[40px] block cursor-pointer"
              :to="{ path: `/movie/${listRecommendation.id}` }"
            >
              <BaseCard :items="listRecommendation" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.page-details {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 670px;
  padding-bottom: 20px;
  overflow: hidden;
  .hero-section {
    position: relative;
    width: 100%;
    height: 500px;
    flex-shrink: 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    background-size: cover;
    z-index: 3;
    &::before {
      content: '';
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      height: 500px;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 1;
    }

    &::after {
      content: '';
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      height: 70px;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 2;
    }
    .poster {
      width: 230px;
      height: 330px;
      object-fit: cover;
      z-index: 4;
      margin-bottom: -6rem;
      filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.25));
    }
    .movie-detail {
      z-index: 4;
      width: 100%;
      flex-flow: column;
      height: 100%;
      justify-content: space-between;

      .movie-title {
        height: 100%;
        display: flex;
        justify-content: space-between;
      }

      .movie-info {
        height: 100%;
        max-height: 70px;
        display: flex;
        flex-flow: row;
        align-items: center;
        padding: 20px 0;
      }
    }
  }
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.grid-item {
  border: 1px solid white;
  padding: 8px;
}
</style>
