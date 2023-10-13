import About from "./about.mdx";
import "../gamepage.css";
import Gallery, {
  GalleryIFrame,
  GalleryImage,
  GalleryItem,
} from "../../components/Gallery";

import Logo from "./assets/logo.png?logo";
import CoverArt from "./assets/cover-art.png?galleryimg";
import Shot1 from "./assets/shot1.jpg?galleryimg";
import Shot2 from "./assets/shot2.jpg?galleryimg";
import Shot3 from "./assets/shot3.jpg?galleryimg";
import Shot4 from "./assets/shot4.jpg?galleryimg";
import Shot5 from "./assets/shot5.jpg?galleryimg";
import Shot6 from "./assets/shot6.jpg?galleryimg";
import Shot7 from "./assets/shot7.jpg?galleryimg";

export const documentProps = {
  title: "Demonizer",
  description: "The fantasy bullet battle to end monstergirl genocide!",
};

const GalleryItems: GalleryItem[] = [
  {
    element: <GalleryImage srcset={CoverArt} alt="Demonizer key art" />,
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
  {
    element: <GalleryImage srcset={Shot1} alt="Demonizer screenshot 1" />,
    thumbnail: Shot1,
    caption: "",
  },
  {
    element: <GalleryImage srcset={Shot2} alt="Demonizer screenshot 2" />,
    thumbnail: Shot2,
    caption: "",
  },
  {
    element: <GalleryImage srcset={Shot3} alt="Demonizer screenshot 3" />,
    thumbnail: Shot3,
    caption: "",
  },
  {
    element: <GalleryImage srcset={Shot4} alt="Demonizer screenshot 4" />,
    thumbnail: Shot4,
    caption: "",
  },
  {
    element: <GalleryImage srcset={Shot5} alt="Demonizer screenshot 5" />,
    thumbnail: Shot5,
    caption: "",
  },
  {
    element: <GalleryImage srcset={Shot6} alt="Demonizer screenshot 6" />,
    thumbnail: Shot6,
    caption: "",
  },
  {
    element: <GalleryImage srcset={Shot7} alt="Demonizer screenshot 7" />,
    thumbnail: Shot7,
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
