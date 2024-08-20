import type { QueryItem } from '../types'

export const appName = 'MovieBox'
export const appDescription = '"Explore movies, TV shows, ratings, and reviews with MovieBox. Dive into detailed information, cast lists, trailers, and user-generated ratings—your ultimate destination for all things film and TV'

export const navMenu = [
  {
    name: 'Movies',
    path: '/',
  },
  {
    name: 'TV Shows',
    path: '/',
  },
  {
    name: 'Watch',
    path: '/',
  },
]

export const YOUTUBE_THUMBNAIL_QUALITY_NAME = 'maxresdefault.jpg'
export const TMDB_IMAGE_BASE_THUMBNAIL = 'https://image.tmdb.org/t/p/original'
export const TMDB_IMAGE_BASE_ORIGINAL = 'https://image.tmdb.org/t/p/original'
export const QUERY_LIST = {
  movie: <QueryItem[]>([
    { type: 'movie', title: 'Popular Movies', query: 'popular' },
    { type: 'movie', title: 'Now Playing Movies', query: 'now_playing' },
    { type: 'movie', title: 'Upcoming Movies', query: 'upcoming' },
    { type: 'movie', title: 'Top Rated Movies', query: 'top_rated' },
  ]),
  tv: <QueryItem[]>([
    { type: 'tv', title: 'Popular TV Shows', query: 'popular' },
    { type: 'tv', title: 'Top Rated TV Shows', query: 'top_rated' },
    { type: 'tv', title: 'TV Shows Airing Today', query: 'airing_today' },
  ]),
}
