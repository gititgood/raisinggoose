// /lib/getCarousel.js
import { client } from './sanity.client'
import { CAROUSEL_BY_KEY } from './queries'

export async function getCarouselByKey(key) {
  if (!key) throw new Error('getCarouselByKey: key is required')
  const data = await client.fetch(CAROUSEL_BY_KEY, { key })
console.log('getCarouselByKey:', { key, data })
  return data || { title: '', key, slides: [] }
}
