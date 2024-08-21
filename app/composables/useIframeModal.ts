import { useSingleton } from './useUtils'
import type { Image, Media, Video } from '~/types'

const [
  provideIframeModal,
  useIframeModal,
] = useSingleton<(url: string) => void>()

const [
  provideImageModal,
  useImageModal,
] = useSingleton<(photos: Image[], index: number) => void>()

export {
  useIframeModal,
  provideIframeModal,
  useImageModal,
  provideImageModal,
}
