import About from "./about.mdx";
import "../gamepage.css";

export const documentProps = {
	title: 'Demonizer',
	description: "The fantasy bullet battle to end monstergirl genocide!"
}

export function Page() {
  return (
    <div>
      <img src="/demonizer/logo.png" alt='Demonizer logo' width={960} height={240} />
      <section>
        <img src="/demonizer/cover-art.png" alt='Demonizer key art' width={696} height={900} />
        <div style={{ textAlign: "left" }}>
          <About />
        </div>
      </section>
    </div>
  );
}
