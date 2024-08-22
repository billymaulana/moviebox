import type { ComputedRef } from 'vue'

export function formatMoney(n: any) {
  const val = n
  return `$${val?.toFixed(0).replace(/./g, (c: any, i: any, a: any) => {
    return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? `.${c}` : c
  })}`
}

export function formatTime(minutes: number) {
  const seconds = minutes * 60
  let secondsLeft = seconds

  const hours = Math.floor(secondsLeft / 3600)
  secondsLeft = secondsLeft % 3600

  const mins = Math.floor(secondsLeft / 60)
  secondsLeft = secondsLeft % 60

  return `${hours ? `${hours}h` : ''} ${mins}min`
}

export function formatDate(string: string) {
  const date = new Date(string).toLocaleDateString('id-ID')
  return date
}

export function useSingleton<T>() {
  const key = Symbol('singleton')
  return [
    function provide(v: T) {
      const vm = getCurrentInstance()
      vm?.appContext.app.provide(key, v)
    },
    function use(fallback?: T) {
      return inject(key, fallback) as T
    },
  ] as const
}

export function useRouteParam<T>(name: string, init?: T): ComputedRef<T> {
  const route = useRoute()
  return computed(() => route.params[name] as any ?? init)
}
