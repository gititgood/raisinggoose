// /components/RichText.js — Portable Text renderer with only bold/italic/bullets
import { PortableText } from '@portabletext/react'

const components = {
  block: {
    normal: ({ children }) => <p className="text-lg text-gray-700 leading-relaxed mb-4">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 mb-4">{children}</ul>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
}

export default function RichText({ value }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
