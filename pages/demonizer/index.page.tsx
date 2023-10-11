import About from "./about.mdx";
import "../gamepage.css";

export const documentProps = {
	title: 'Demonizer',
	description: "The fantasy bullet battle to end monstergirl genocide!"
}

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
