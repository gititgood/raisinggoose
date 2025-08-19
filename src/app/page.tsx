import { client } from '@/lib/sanity.client'
import { POSTS_QUERY } from '@/lib/queries'
import { urlFor } from '@/lib/sanity.image'

export default async function Home() {
  const posts = await client.fetch(POSTS_QUERY)

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Raising Goose</h1>

      {!posts?.length && <p>No posts yet.</p>}

      <ul className="space-y-6">
        {posts?.map((post:any) => (
          <li key={post._id} className="border rounded-xl p-4">
            {post.mainImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={post.title}
                src={urlFor(post.mainImage).width(1200).height(630).fit('crop').url()}
                className="w-full h-auto rounded-lg mb-3"
              />
            )}
            <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
            {post.excerpt && <p className="text-sm opacity-80">{post.excerpt}</p>}
          </li>
        ))}
      </ul>
    </main>
  )
}
