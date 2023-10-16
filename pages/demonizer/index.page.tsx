import About from "./about.mdx";
import "../gamepage.css";
import Gallery, {
  GalleryImage,
  GalleryItem,
} from "../../components/Gallery";

import Logo from "./assets/logo.png?logo";
import LinkButtons, { StoreLinkButton } from "#root/components/LinkButtons";

const ImageItems : Record<string, string> = import.meta.glob([
  './gallery/*.png', './gallery/*.jpg',
], {
  eager: true,
  import: 'default',
  query: {
    galleryimg: true
  }
})

const OriginalImages : Record<string, string> = import.meta.glob([
  './gallery/*.png', './gallery/*.jpg',
], {
  eager: true,
  import: 'default',
})

const GalleryComponentItems : Record<string, GalleryItem> = import.meta.glob([
  './gallery/*.tsx'
], {
  eager: true,
  import: 'default'
})

export const documentProps = {
  title: "Demonizer",
  description: "The fantasy bullet battle to end monstergirl genocide!",
};

const GalleryItems: GalleryItem[] = [
  ...Object.entries(ImageItems).map((item) => {return {
    element: <GalleryImage src={OriginalImages[item[0]]} srcset={item[1]} alt={item[0]}/>,
    thumbnail: item[1],
    caption: ""
  }}),
  ...Object.values(GalleryComponentItems)
]

export function Page() {
  return (
    <div>
      <img
        class="logo"
        srcset={Logo}
        alt="Demonizer logo"
        width="640"
        height="160"
      />
      <section>
        <Gallery items={GalleryItems} />
        <article style={{ textAlign: "left" }}>
          <About />
          <h2 style={{ textAlign: "center" }}>Buy</h2>
          <LinkButtons>
            <StoreLinkButton
              store="itch.io"
              oses={["windows", "linux", "apple", "android",]}
              href="https://ioribranford.itch.io/demonizer"
            />
            <StoreLinkButton
              store="Steam"
              oses={["windows", "linux"]}
              href="https://store.steampowered.com/app/1091390/Demonizer"
            />
          </LinkButtons>
        </article>
      </section>
    </div>
  );
}
