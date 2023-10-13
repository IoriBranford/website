import About from "./about.mdx";
import "../gamepage.css";
import Gallery, {
  GalleryIFrame,
  GalleryImage,
  GalleryItem,
} from "../../components/Gallery";

import Logo from "./assets/logo.png?logo";
import CoverArt from "./assets/cover-art.png?galleryimg";

export const documentProps = {
  title: "Demonizer",
  description: "The fantasy bullet battle to end monstergirl genocide!",
};

const GalleryItems: GalleryItem[] = [
  {
    element: <GalleryImage srcset={CoverArt} alt="Honey Soldier key art" />,
    thumbnail: CoverArt,
    caption: "",
  },
  {
    element: (
      <GalleryIFrame
        src="https://www.youtube.com/embed/TGYRJMf5UbM?si=6wN1NIq0GRNjcPes"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    ),
    thumbnail: "https://img.youtube.com/vi/TGYRJMf5UbM/mqdefault.jpg",
    caption: "",
  },
];

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
