<script setup lang="ts">
import type { Genre, Media } from '~/types'
import { LIST_GENRES } from '~/constants'

const props = defineProps<{
  items: Media
}>()
const { items } = props

function mapGenreNames(genreIds: number[]): string[] {
  if (!genreIds)
    return []
  return genreIds.map((id) => {
    const genre = LIST_GENRES.find(g => g.id === id)
    return genre ? genre.name : ''
  })
}

function formatGenreNames(genreNames: string[]): string {
  return genreNames.join(', ')
}
</script>

<template>
  <div v-if="items" class="card">
    <div class="card-header">
      <img class="card-img" :src="`https://image.tmdb.org/t/p/w500/${items?.poster_path}`" loading="lazy">
    </div>
    <div class="card-body">
      <p pt-2 text-gray-400 font-bold f-12>
        <span uppercase>{{ items?.original_language }},</span> {{ items?.release_date }}
      </p>
      <p py-2 text-left text-gray-900 font-bold f-18>
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
      <span mt-2 text-gray-400 f-12>
        {{ formatGenreNames(mapGenreNames(items?.genre_ids)) }}

      </span>
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
</style>
