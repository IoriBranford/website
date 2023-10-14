import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import "./Gallery.css";

export function GalleryImage({ src = "", srcset = "", alt = "" }) {
  return (
    <a href={src} target='__blank'>
      <img class="active" sizes="640px" src={src} srcset={srcset} alt={alt} />
    </a>
  );
}

export function GalleryIFrame(props: {
  src: string;
  allow: string;
  allowFullScreen: boolean;
}) {
  return <iframe class="active" frameBorder="0" {...props} />;
}

export interface GalleryItem {
  element: JSX.Element;
  thumbnail: string;
  caption: string;
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div class="gallery">
      {items[activeIndex].element}
      <section class="thumbnailgrid">
        {items.map((item, itemi) => (
          <img
            class={itemi == activeIndex ? "thumbnail-selected" : "thumbnail"}
            onClick={() => setActiveIndex(itemi)}
            sizes="160px"
            srcset={item.thumbnail}
            alt={item.caption}
          />
        ))}
      </section>
    </div>
  );
}
