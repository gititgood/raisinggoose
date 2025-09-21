import groq from 'groq'

export const POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    mainImage,
    excerpt,
    publishedAt
  }
`
export const CAROUSEL_BY_KEY = `
*[_type == "carousel" && key == $key][0]{
  title, key,
  slides[] | order(coalesce(sort, 999999) asc){
    _key, heading, subheading, body, ctaLabel, ctaHref,
    "image": image, "alt": coalesce(image.alt, heading)
  }
}`
