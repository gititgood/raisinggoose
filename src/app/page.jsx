// pages/index.js
import Header from "../../components/Header";
import HeroCarousel from "../../components/HeroCarousel";
import HeroWithMemorial from "../../components/HeroWithMemorial";
import Feed from "../../components/Feed";
import LevelUp from "../../components/LevelUp";
import Categories from "../../components/Categories";
import Tools from "../../components/Tools";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.css";
import { client, getHero } from "../lib/sanity.client";
import HeroImage from "../../components/HeroImage";
import { getCarouselByKey } from '../lib/getCarousel'
import { homePageQuery } from '@/lib/queries'
import HeroSection from '../../components/HeroSection'
import { ImageOverlaySection } from '../../components/ImageOverlaySection'
import TimelineServer from '../../components/TimelineServer';
import { Permanent_Marker } from 'next/font/google'

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
  const sections = data?.sections || []
  const heroCarousel = await getCarouselByKey('homepage');
  const hero = await getHero();
  
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
       <TimelineServer />
      <HeroWithMemorial />
      {/* Sanity-powered feed */}
      <Feed posts={posts} />

      <footer className="rg-footer">© Raising Goose — Homepage Template</footer>
    </main>
  );
}
