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
