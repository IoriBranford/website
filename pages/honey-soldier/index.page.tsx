import About from "./about.mdx";
import "../gamepage.css";
import Gallery from "../../components/Gallery";

export const documentProps = {
  title: "Honey Soldier",
  description: "Shoot invaders out of your hive in two minutes",
};

const Media = [
  <img
    src="/honey-soldier/cover-art.jpg"
    alt="Honey Soldier key art"
    width='auto'
    height='100%'
  />,
  <img
    src="/honey-soldier/shot1.jpg"
    alt="Honey Soldier screenshot 1"
    width={640}
    height={360}
  />,
  <img
    src="/honey-soldier/shot2.jpg"
    alt="Honey Soldier screenshot 2"
    width={640}
    height={360}
  />,
  <img
    src="/honey-soldier/shot3.jpg"
    alt="Honey Soldier screenshot 3"
    width={640}
    height={360}
  />,
];

export function Page() {
  return (
    <div>
      <h1>Honey Soldier</h1>
      <section>
        <Gallery media={Media} />
        <div style={{ textAlign: "left" }}>
          <About />
          <h2 style={{ textAlign: "center" }}>Play for Free</h2>
          <section>
            <iframe
              frameborder="0"
              src="https://itch.io/embed/1579324?bg_color=f1e49d&amp;fg_color=000000&amp;link_color=fa5c5c&amp;border_color=a17c18"
              width="208"
              height="167"
            >
              <a href="https://ioribranford.itch.io/honey-guardian">
                Honey Guardian by IoriBranford
              </a>
            </iframe>
            <a href="https://play.google.com/store/apps/details?id=com.ioribranford.honeysoldier&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
              <img
                width="258"
                height="100"
                alt="Get it on Google Play"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              />
            </a>
          </section>
        </div>
      </section>
    </div>
  );
}
