<script setup lang="ts">
import type { Person } from '~/types'

const props = defineProps < {
  item: Person
} > ()

const { item } = props
function imageLoadOnError(e) {
  e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuoiVnnWu_QbtFist_W7Hbz2V4drhwXDVyiw&s'
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <img
        class="card-img" :src="`https://image.tmdb.org/t/p/original/${item?.profile_path}`"
        @error="imageLoadOnError"
      >
    </div>
    <div class="card-body">
      <p text-left text-gray-900 font-bold f-18>
        {{ item?.name }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
