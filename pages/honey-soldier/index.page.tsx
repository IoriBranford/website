import About from "./about.mdx";
import "../gamepage.css";

export const documentProps = {
	title: 'Honey Soldier',
	description: "Shoot invaders out of your hive in two minutes"
}

export function Page() {
  return (
    <div>
      <h1>Honey Soldier</h1>
      <section>
        <img src="/honey-soldier/cover-art.jpg" alt='Honey Soldier key art' width={756} height={600}/>
        <div style={{ textAlign: "left" }}>
          <About />
        </div>
      </section>
    </div>
  );
}
