export interface Post {
  _id: string;
  title?: string;
  slug?: string; // you selected: "slug": slug.current → string
  mainImage?: { asset?: { _ref?: string } } | null;
  excerpt?: string | null;
  _createdAt: string;
}