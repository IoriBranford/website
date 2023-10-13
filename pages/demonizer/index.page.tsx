import About from "./about.mdx";
import "../gamepage.css";
import Gallery, {
  GalleryImage,
  GalleryItem,
} from "../../components/Gallery";

import Logo from "./assets/logo.png?logo";

const GalleryImageItems : Record<string, string> = import.meta.glob([
  './gallery/*.png', './gallery/*.jpg',
], {
  eager: true,
  import: 'default',
  query: {
    galleryimg: true
  }
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
  ...Object.entries(GalleryImageItems).map((item) => {return {
    element: <GalleryImage srcset={item[1]} alt={item[0]}/>,
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
        </article>
      </section>
    </div>
  );
}
