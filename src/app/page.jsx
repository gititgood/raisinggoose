// pages/index.js
import Header from "../../components/Header";
import HeroCarousel from "../../components/HeroCarousel";
import HeroWithMemorial from "../../components/HeroWithMemorial";
import Feed from "../../components/Feed";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.css";
import { client, getHero } from "../lib/sanity.client";
import HeroImage from "../../components/HeroImage";
import { getCarouselByKey } from '../lib/getCarousel'
import { homePageQuery, MEMORIAL_CARD_QUERY } from '@/lib/queries'
import HeroSection from '../../components/HeroSection'
import { ImageOverlaySection } from '../../components/ImageOverlaySection'
import TimelineServer from '../../components/TimelineServer';
import { Permanent_Marker } from 'next/font/google'
import MemorialCard from '../../components/MemorialCard'
import { PortableText } from '@portabletext/react';

export const revalidate = 60; // ISR in App Router
const permanentMarker = Permanent_Marker({
    subsets: ["latin"],
    weight: "400", // Permanent Marker only comes in one weight
  });
export default async function HomePage() {
  const posts = await client.fetch(
    `*[_type == "post"] | order(_createdAt desc)[0...20]{
      _id, title, "slug": slug.current, mainImage, excerpt, _createdAt
    }`
  );
  const data = await client.fetch(homePageQuery)
  const dataMemorial = await client.fetch(MEMORIAL_CARD_QUERY)
  const sections = data?.sections || []
  const heroCarousel = await getCarouselByKey('homepage');
  const hero = await getHero();
  console.log('memorial data', dataMemorial)

  return (
  <main className="rg-container">
    <header className="rg-header">
      <h1 className={`rg-logo ${permanentMarker.className}`}>Raising Goose</h1>
      <nav className="rg-nav">
        <a href="#">Daily Posts</a>
        <a href="#">Training</a>
        <a href="#">Behaviors</a>
        <a href="#">Scorecard</a>
        <a href="#tools">Tools</a>
      </nav>
    </header>
     {sections.map((s) => {
        switch (s._type) {
          case 'heroSection':
            return <HeroSection key={s._key} {...s} />
          /*case 'imageOverlaySection':
            return <ImageOverlaySection key={s._key} {...s} />*/ // Currently not used on homepage this is the side by side image with overlay text
          default:
            return null
        }
      })}
      {/* Choose one hero approach (or keep both while you decide) */}
      {/*<HeroImage
        title={hero?.title}
        description={hero?.description}
        imageUrl={hero?.imageUrl}
      /> */}
      {/*<HeroCarousel slides={heroCarousel.slides} /> */}
       <section className="border-y border-neutral-200/60 dark:border-zinc-800">
        <div className="mx-auto max-w-[72rem] px-4 sm:px-6">
          <MemorialCard
              images={dataMemorial.images}
              title={dataMemorial.title}
              body={dataMemorial.body}
              cardBg={dataMemorial.cardBg}
              mode={dataMemorial.mode}
              accentColor={dataMemorial.accentColor}
              __layout={dataMemorial.layout}
                useSingleImage={dataMemorial.useSingleImage}
              singleImage={dataMemorial.singleImage}
          />
        </div>
      </section>
      {/* Timeline of growth */}

      <TimelineServer />
      <HeroWithMemorial />
      {/* Sanity-powered feed */}
      <Feed posts={posts} />

      <footer className="rg-footer">© Raising Goose — Homepage Template</footer>
    </main>
  );
}
