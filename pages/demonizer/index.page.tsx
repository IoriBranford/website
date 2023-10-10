import About from "./about.mdx";
import "../gamepage.css";

export function Page() {
  return (
    <div>
      <img src="/demonizer/logo.png" />
      <section>
        <img src="/demonizer/cover-art.png" />
        <div style={{ textAlign: "left" }}>
          <About />
        </div>
      </section>
    </div>
  );
}
