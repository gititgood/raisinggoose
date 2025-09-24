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

export const heroQuery = `
  *[_type == "heroImage"][0]{
    title,
    description,
    "imageUrl": image.asset->url
  }
`
export const homePageQuery = `
*[_type == "homePage"][0]{
  sections[]{
    _key,
    _type,
    title,
    copy,
    image{ asset->{url, metadata{dimensions}}, crop, hotspot },
    imagePosition,

    overlayMode,
    "images": images[]{
      ...select(
        _type == "image" => { "url": asset->url },
        _type == "imageTile" => {
          "url": image.asset->url,
          perOverlay,
          perOverlayColor,
          perOverlayBg,
          perOverlayAlign,
          perLink
        }
      )
    },

    overlay,
    overlayColor,
    overlayBg,
    overlayAlign,
    overlayLink
  }
}`;


export const heroSectionsQuery = `
*[_type == "homePage"][0]{
  sections[_type == "heroSection"]{
    _key,
    title,
    copy,
    image{ asset->{url, metadata{dimensions}}, crop, hotspot },
    imagePosition
  }
}`

// /lib/queries.ts
export const TimelineQuery = `
*[_type == "gooseTimelineEntry"] | order(takenAt asc) {
  _id,
  ageLabel,
  linkHref,
  "image": image{
    alt,
    asset->{
      url,
      metadata { dimensions }
    },
    crop,
    hotspot
  }
}
`