import About from "./about.mdx";
import './style.css'

export function Page() {
  return (
    <section>
      <img src="/demonizer/cover-art.png" />
      <div style={{ textAlign: "left" }}>
        <About />
      </div>
    </section>
  );
}
