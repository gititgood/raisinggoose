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
import { client } from "../lib/sanity.client";
import { getCarouselByKey } from '../lib/getCarousel'


export const revalidate = 60; // ISR in App Router

export default async function HomePage() {
  const posts = await client.fetch(
    `*[_type == "post"] | order(_createdAt desc)[0...20]{
      _id, title, "slug": slug.current, mainImage, excerpt, _createdAt
    }`
  );

  const heroCarousel = await getCarouselByKey('homepage');

  return (
  <main className="rg-container">
    <header className="rg-header">
      <h1 className="rg-logo">Raising Goose</h1>
      <nav className="rg-nav">
        <a href="#">Daily Posts</a>
        <a href="#">Training</a>
        <a href="#">Behaviors</a>
        <a href="#">Scorecard</a>
        <a href="#tools">Tools</a>
      </nav>
    </header>

      {/* Choose one hero approach (or keep both while you decide) */}
      <HeroCarousel slides={heroCarousel.slides} />
      <HeroWithMemorial />

      {/* Sanity-powered feed */}
      <Feed posts={posts} />

      <LevelUp />
      <Categories />
      <Tools />

      <footer className="rg-footer">© Raising Goose — Homepage Template</footer>
    </main>
  );
}
