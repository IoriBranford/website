import About from "./about.mdx";
import "../gamepage.css";
import Gallery, { GalleryImage, GalleryItem } from "../../components/Gallery";

import CoverArt from './assets/cover-art.jpg?galleryimg'
import Shot1 from './assets/shot1.jpg?galleryimg'
import Shot2 from './assets/shot2.jpg?galleryimg'
import Shot3 from './assets/shot3.jpg?galleryimg'

export const documentProps = {
  title: "Honey Soldier",
  description: "Shoot invaders out of your hive in two minutes",
};

const GalleryItems: GalleryItem[] = [
  {
    element: (
      <GalleryImage
        srcset={CoverArt}
        alt="Honey Soldier key art"
      />
    ),
    thumbnail: CoverArt,
    caption: "",
  },
  {
    element: (
      <GalleryImage
        srcset={Shot1}
        alt="Honey Soldier screenshot 1"
      />
    ),
    thumbnail: Shot1,
    caption: "",
  },
  {
    element: (
      <GalleryImage
        srcset={Shot2}
        alt="Honey Soldier screenshot 2"
      />
    ),
    thumbnail: Shot2,
    caption: "",
  },
  {
    element: (
      <GalleryImage
        srcset={Shot3}
        alt="Honey Soldier screenshot 3"
      />
    ),
    thumbnail: Shot3,
    caption: "",
  },
];

export function Page() {
  return (
    <div>
      <h1>Honey Soldier</h1>
      <section>
        <Gallery items={GalleryItems} />
        <article style={{ textAlign: "left" }}>
          <About />
          <h2 style={{ textAlign: "center" }}>Play for Free</h2>
          <section style={{ textAlign: "center" }}>
            <div>
              <iframe
                frameborder="0"
                src="https://itch.io/embed/1579324?bg_color=f1e49d&amp;fg_color=000000&amp;link_color=fa5c5c&amp;border_color=a17c18"
                width="208"
                height="167"
                title="Honey Guardian on itch.io"
              >
                <a href="https://ioribranford.itch.io/honey-guardian">
                  Honey Guardian by IoriBranford
                </a>
              </iframe>
              <p>For Windows, LÖVE, Web, Android</p>
            </div>
            <div>
              <a href="https://play.google.com/store/apps/details?id=com.ioribranford.honeysoldier&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                <img
                  width="258"
                  height="100"
                  alt="Get it on Google Play"
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                />
              </a>
              <p>For Android</p>
            </div>
          </section>
        </article>
      </section>
    </div>
  );
}
