// components/HeroWithMemorial.js
export default function HeroMemorial() {
  return (
    <>
      <section className="rg-hero-fixed" style={{ backgroundImage: "url('/goose-hero.jpg')" }}>
        <div className="rg-hero-overlay">
          <h2>Follow Goose&apos;s Journey</h2>
          <p>Training, play, and the path to calm confidence.</p>
        </div>
      </section>
      <section className="rg-memorial">
        <h3>In Loving Memory of Sami</h3>
        <p>This journey with Goose is an ode to the dog who taught me how to patience through love</p>
        <a className="rg-link" href="#">Read my ode to Sam →</a>
      </section>
    </>
  );
}
