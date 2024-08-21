import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useSearchStore = defineStore('search', () => {
  const router = useRouter()
  const searchQuery = ref('')
  const currentSearch = ref('')
  const items = ref<any[]>([])
  const count = ref(0)
  const error = ref<any>(null)

  const hasSearchQuery = computed(() => searchQuery.value.trim() !== '')

  function setSearchQuery(query: string) {
    searchQuery.value = query
    currentSearch.value = query

    if (query.trim() === '') {
      items.value = []
      count.value = 0
      if (router.currentRoute.value.path !== '/search') {
        router.push('/')
      }
    }
    else {
      router.push({ path: '/search', query: { s: query } })
    }
  }

  function clearSearchQuery() {
    searchQuery.value = ''
    currentSearch.value = ''
    items.value = []
    count.value = 0
    router.push('/')
  }

  async function fetchSearch(page?: number) {
    if (!currentSearch.value)
      return
    try {
      const data = await searchShows(currentSearch.value, page ?? 1)
      count.value = data.total_results ?? count.value
      items.value.push(...data.results)
    }
    catch (e: any) {
      error.value = e
    }
  }

  return {
    searchQuery,
    currentSearch,
    items,
    count,
    error,
    hasSearchQuery,
    setSearchQuery,
    clearSearchQuery,
    fetchSearch,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
