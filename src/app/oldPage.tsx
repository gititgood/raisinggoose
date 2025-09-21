import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'
import type { Post } from '@/types'
export default async function HomePage() {
  const posts = await client.fetch<Post[]>(
    `*[_type == "post"] | order(_createdAt desc)[0...20]{
      _id, title, "slug": slug.current, mainImage, excerpt, _createdAt
    }`
  )

  return (
    <main>
      <h1>Raising Goose</h1>
      <ul className="space-y-6">
        {(posts ?? []).map((post) => (
          <li key={post._id} className="border rounded-xl p-4">
            {post.mainImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={urlFor(post.mainImage).width(600).height(400).url()}
                alt={post.title ?? 'Untitled'}
                className="rounded-lg"
              />
            )}
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
