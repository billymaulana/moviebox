<script setup lang="ts">
const route = useRoute()
const id = route.params.id
const person = await getPerson(id)
</script>

<template>
  <div>
    <div grid="~ md:cols-[max-content_1fr]" ma max-w-300 items-center gap-8 p4>
      <img
        v-if="person.profile_path" width="400" height="600"
        :src="`https://image.tmdb.org/t/p/original/${person.profile_path}`" :alt="person.name" border="4 gray4/10" md:90
        mx-auto mt-5 block w-70 self-start object-cover transition duration-400 aspect="3/4"
      >
      <div gap8 p4>
        <div>
          <h2 mb4 text-3xl>
            {{ person.name }}
          </h2>

          <div v-if="person.biography" ws-pre-wrap leading-relaxed font-sans op80 v-text="person.biography" />
          <div v-else italic op50>
            (no biography)
          </div>
        </div>

        <div mt-5 text-sm op80>
          <ul grid="~ cols-[max-content_1fr] gap3" items-center>
            <template v-if="person.known_for_department">
              <div op60>
                Known for
              </div>
              <div>
                {{ person.known_for_department }}
              </div>
            </template>
            <template v-if="person.place_of_birth">
              <div op60>
                Place of birth
              </div>
              <div>
                {{ person.place_of_birth }}
              </div>
            </template>

            <template v-if="person.birthday">
              <div op60>
                Birthday
              </div>
              <div>
                {{ formatDate(person.birthday) }}
              </div>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
