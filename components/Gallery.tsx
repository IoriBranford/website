import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import "./Gallery.css";

export function GalleryImage({src = "", srcset = "", alt = ""}) {
  return <img class='active' src={src} srcset={srcset} alt={alt} />
}

export interface GalleryItem {
  element: JSX.Element;
  thumbnail: string;
  caption: string;
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div>
      {items[activeIndex].element}
      <section class="thumbnailgrid">
        {items.map((item, itemi) => (
          <img class={itemi == activeIndex ? 'thumbnail-selected' : 'thumbnail'}
            onClick={() => setActiveIndex(itemi)}
            srcset={item.thumbnail}
            alt={item.caption}
          />
        ))}
      </section>
    </div>
  );
}
