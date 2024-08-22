import type { QueryItem } from '../types'

export const appName = 'MovieBox'
export const appDescription = '"Explore movies, TV shows, ratings, and reviews with MovieBox. Dive into detailed information, cast lists, trailers, and user-generated ratings—your ultimate destination for all things film and TV'

export const navMenu = [
  {
    name: 'Popular Movies',
    path: '/movie/category/popular',
  },
  {
    name: 'Upcoming Movies',
    path: '/movie/category/upcoming',
  },
  {
    name: 'Person',
    path: '/Person',
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

export const LIST_GENRES = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10763, name: 'News' },
  { id: 10764, name: 'Reality' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War & Politics' },
  { id: 37, name: 'Western' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
]
