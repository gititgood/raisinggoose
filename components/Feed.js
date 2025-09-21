// components/Feed.js
import { urlFor } from "../src/lib/sanity.image";
// import type { Post } from "../types";

export default function Feed({ posts = [] }) {
  return (
    <section className="rg-feed-wrap">
      <section className="rg-feed" aria-labelledby="recent">
        <h2 id="recent">Recent Articles</h2>
        {(posts ?? []).map((post) => {
          const thumb = post?.mainImage
            ? urlFor(post.mainImage).width(180).height(140).fit("crop").url()
            : "/placeholder-thumb.jpg";

          return (
            <article key={post._id} className="rg-article">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="rg-article-thumb" src={thumb} alt={post.title ?? "Untitled"} />
              <div className="rg-article-body">
                <h3>{post.title ?? "Untitled"}</h3>
                {post.excerpt && <p>{post.excerpt}</p>}
                <a className="rg-link" href={`/posts/${post.slug || "#"}`}>Read more →</a>
              </div>
            </article>
          );
        })}
      </section>
    </section>
  );
}