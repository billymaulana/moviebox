<script setup lang="ts">
import type { Media, Video } from '~/types'

const props = defineProps({
  items: {
    type: Array as () => Media[],
  },
  trailer: {
    type: Array as () => { results: { key: string, type: string }[] }[],
  },
})

const { items, trailer } = props
const myCarousel = ref<any>(null)

function customPaginationCarousel(index: number) {
  myCarousel.value.slideTo(index)
}
const showModal = useIframeModal()
function playTrailer(index: number) {
  if (!trailer) {
    return
  }
  const trailerData = trailer[index]?.results?.find((video: { type: string }) => video.type === 'Trailer')
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
</script>

<template>
  <Carousel
    v-if="items" ref="myCarousel" class="hero-carousel" :items-to-show="1" :wrap-around="true"
    snap-align="center"
  >
    <Slide v-for="(movie, index) in items" :key="index" class="h-full w-full">
      <div class="section-hero">
        <div class="container">
          <div class="row px-0">
            <div class="col-12 flex">
              <div
                class="hero-bg"
                :style="`background-image:url(https://image.tmdb.org/t/p/original${movie.backdrop_path});`"
              />
              <div class="hero-content">
                <h1 class="hero-content-title">
                  {{ movie.title }}
                </h1>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2.5">
                    <img src="/assets/imdb.png" alt="imdb-icons">
                    <span>{{ Math.round(movie?.vote_average * 10).toFixed(1) }} / 100</span>
                  </div>
                  <div class="flex items-center gap-2.5">
                    <img src="/assets/tomatoes.svg" alt="tomatoes icons">
                    <span>{{ Math.floor(movie?.popularity / 100) }}%</span>
                  </div>
                </div>
                <div>
                  <p class="hero-content-desc leading-5">
                    {{ movie.overview }}
                  </p>
                </div>
                <button class="btn-primary" @click="playTrailer(index)">
                  <NuxtIcon name="heroicons:play-circle-16-solid" class="text-white" />
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
    <template #addons="{ slidesCount, currentSlide }">
      <div class="pagination-carousel">
        <button
          v-for="(pagination, index) in slidesCount" :key="index" class="btn-pagination-carousel"
          @click="customPaginationCarousel(index)"
        >
          <div class="flex items-center" :class="{ active: index === currentSlide }">
            <span class="separator" :class="{ 'separator-active': index === currentSlide }" />
            {{ index }}
          </div>
        </button>
      </div>
    </template>
  </Carousel>
</template>

<style scoped lang="postcss">
.section-hero {
  width: 100%;
  position: relative;
  color: white;
  height: 100%;
  min-height: 680px;
  padding-top: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .hero-bg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    left: 0;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgb(0 0 0 / 50%);
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(272deg, rgb(0 0 0 / 50%) 0%, rgba(0, 0, 0, 0) 17%);
    }
  }
  .hero-content {
    z-index: 9999;
    position: relative;
    height: 100%;
    width: 40%;
    display: flex;
    flex-flow: column;
    gap: 8px;
    align-items: flex-start;
    justify-content: flex-start;
    .hero-content-title {
      font-size: 48px;
      font-weight: bold;
    }
    .hero-content-desc {
      font-size: 14px;
      font-weight: 500;
      margin: 1rem 0;
      text-align: left;
    }
  }
}

.hero-carousel,
.carousel {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  touch-action: pan-y;
  overscroll-behavior: none;
  .pagination-carousel {
    position: absolute;
    right: 0px;
    top: 80px;
    display: flex;
    flex-flow: column;
    gap: 10px;
    align-items: end;
    justify-content: center;
    bottom: 0;
    padding-right: 21px;
    margin-top: -80px;
    .btn-pagination-carousel {
      font-size: 12px;
      font-weight: bold;
      line-height: 14px;
      gap: 10px;
      color: #9ca3af;
      display: flex;
      width: 30px;
      height: 20px;
      align-items: center;
      justify-content: center;
      text-align: center;
      transition: all 0.3s ease-in-out;
      .active {
        color: white;
        display: flex;

        transition: all 0.3s ease-in;
        font-size: 16px;
      }
    }
    .separator {
      width: 20px;
      height: 3px;
      display: flex;
      background: transparent;
      border-radius: 6px;
      transition: all 0.3s ease-in-out;
      margin-right: 6px;
    }
    .separator-active {
      width: 20px;
      height: 3px;
      transition: all 0.3s ease-in;
      display: flex;
      background: white !important;
      border-radius: 6px;
      margin-right: 6px;
    }
  }
}
</style>
