<script setup lang="ts">
import type { Media } from '~~/types'

const props = defineProps<{
  items: Media
}>()
const { items } = props
</script>

<template>
  <div v-if="items" class="card">
    <div class="card-header">
      <img class="card-img" :src="`https://image.tmdb.org/t/p/w500/${items?.poster_path}`" loading="lazy">
    </div>
    <div class="card-body">
      <p text-gray-400 font-bold f-12>
        USA, 2016 - Current
      </p>
      <p text-gray-900 font-bold f-18>
        {{ items?.title }}
      </p>
      <div class="flex-column w-full flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <img src="/assets/imdb.png" alt="imdb-icons">
          <span text-gray-900 f-12>{{ Math.round(items?.vote_average * 10).toFixed(1) }} / 100</span>
        </div>
        <div class="flex items-center gap-2.5">
          <img src="/assets/tomatoes.svg" alt="tomatoes icons">
          <span text-gray-900 f-12>{{ Math.floor(items?.popularity / 100) }}%</span>
        </div>
      </div>
      <span ext-gray-400 f-12>{{ items?.genre_ids }}</span>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
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
</style>
