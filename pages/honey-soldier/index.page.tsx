import About from "./about.mdx";
import "../gamepage.css";
import Gallery, { GalleryImage, GalleryItem } from "../../components/Gallery";
import LinkButtons, {
  StoreLinkButton,
} from "#root/components/LinkButtons";

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
          <LinkButtons>
            <StoreLinkButton
              store="itch.io"
              oses={["windows", "android", "linux", "apple", "html5"]}
              href="https://ioribranford.itch.io/honey-guardian"
            />
            <StoreLinkButton
              store="Google Play"
              oses={["android"]}
              href="https://play.google.com/store/apps/details?id=com.ioribranford.honeysoldier"
            />
          </LinkButtons>
        </article>
      </section>
    </div>
  );
}
