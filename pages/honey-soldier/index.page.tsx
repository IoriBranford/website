import About from "./about.mdx";
import "../gamepage.css";
import Gallery, { GalleryImage, GalleryItem } from "../../components/Gallery";
import LinkButtons from "#root/components/LinkButtons";
import OsIcons from "#root/components/OsIcons";

const ImageItems: Record<string, string> = import.meta.glob(
  ["./gallery/*.png", "./gallery/*.jpg"],
  {
    eager: true,
    import: "default",
    query: {
      galleryimg: true,
    },
  }
);

const OriginalImages: Record<string, string> = import.meta.glob(
  ["./gallery/*.png", "./gallery/*.jpg"],
  {
    eager: true,
    import: "default",
  }
);

export const documentProps = {
  title: "Honey Soldier",
  description: "Shoot invaders out of your hive in two minutes",
};

const GalleryItems: GalleryItem[] = Object.entries(ImageItems).map((item) => {
  return {
    element: (
      <GalleryImage
        src={OriginalImages[item[0]]}
        srcset={item[1]}
        alt={item[0]}
      />
    ),
    thumbnail: item[1],
    caption: "",
  };
});

export function Page() {
  return (
    <div>
      <h1>Honey Soldier</h1>
      <section>
        <Gallery items={GalleryItems} />
        <article style={{ textAlign: "left" }}>
          <About />
          <h2 style={{ textAlign: "center" }}>Play for Free</h2>
          <LinkButtons
            buttonsProps={[
              {
                link: "https://ioribranford.itch.io/honey-guardian",
                element: (
                  <>
                    <p>
                      <i class="fa-brands fa-itch-io" /> itch.io
                    </p>
                    <p>
                      <OsIcons
                        oses={["windows", "android", "linux", "apple", "html5"]}
                      />
                    </p>
                  </>
                ),
                backgroundColor: "#fa5c5c",
              },
              {
                link: "https://play.google.com/store/apps/details?id=com.ioribranford.honeysoldier",
                element: (
                  <>
                    <p>
                      <i class="fa-brands fa-google-play" /> Google Play
                    </p>
                    <p>
                      <OsIcons oses={["android"]} />
                    </p>
                  </>
                ),
                backgroundColor: "#0F9D58",
              },
              // 'Google Play Store (Android only)': 'https://play.google.com/store/apps/details?id=com.ioribranford.honeysoldier'
            ]}
          />
          {/* <section style={{ textAlign: "center" }}>
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
          </section> */}
        </article>
      </section>
    </div>
  );
}
