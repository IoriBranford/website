import About from "./about.mdx";
import './style.css'

export function Page() {
  return (
    <section>
      <img src="/honey-soldier/cover-art.jpg" />
      <div style={{ textAlign: "left" }}>
        <About />
      </div>
    </section>
  );
}
