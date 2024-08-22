import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useSearchStore = defineStore('search', () => {
  const router = useRouter()
  const searchQuery = ref(router.currentRoute.value.query.s || '')
  const currentSearch = ref('')
  const items = ref<any[]>([])
  const count = ref(0)
  const page = ref(0)
  const error = ref<any>(null)
  const isLoading = ref(false)
  const hasSearchQuery = computed(() => {
    const query = searchQuery.value
    return typeof query === 'string' && query.trim() !== ''
  })

  function setSearchQuery(query: string) {
    searchQuery.value = query.toString()
    currentSearch.value = query.toString()

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
      isLoading.value = true
      const data = await searchMovie(currentSearch.value, page)
      count.value = data.total_results ?? count.value
      items.value.push(...data.results)
      isLoading.value = false
    }
    catch (e: any) {
      error.value = e
      items.value = []
      isLoading.value = false
    }
  }
  async function loadingNext() {
    if (isLoading.value)
      return
    isLoading.value = true
    try {
      page.value += 1
      await fetchSearch(page.value)
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    searchQuery,
    currentSearch,
    items,
    count,
    error,
    hasSearchQuery,
    isLoading,
    setSearchQuery,
    clearSearchQuery,
    fetchSearch,
    loadingNext,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
