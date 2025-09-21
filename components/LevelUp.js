// components/LevelUp.js
export default function LevelUp() {
  return (
    <section className="rg-level-up">
      <h2>Goose Level Up</h2>
      <div className="rg-age">Current Age: 11 months</div>
      <div className="rg-xp-bar" aria-label="XP to next level">
        <span style={{ width: "60%" }} />
      </div>
      <div className="rg-scorecard">
        <div className="rg-stat">Recall<div className="rg-bar"><span style={{ width: "72%" }} /></div></div>
        <div className="rg-stat">Calm Greeting<div className="rg-bar"><span style={{ width: "58%" }} /></div></div>
        <div className="rg-stat">Muzzle Tolerance<div className="rg-bar"><span style={{ width: "64%" }} /></div></div>
      </div>
    </section>
  );
}