import About from "./about.mdx";
import "../gamepage.css";

export function Page() {
  return (
    <div>
      <h1>Honey Soldier</h1>
      <section>
        <img src="/honey-soldier/cover-art.jpg" />
        <div style={{ textAlign: "left" }}>
          <About />
        </div>
      </section>
    </div>
  );
}
