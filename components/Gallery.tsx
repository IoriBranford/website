import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import "./Gallery.css";

export function GalleryIFrame(props: {
  src: string;
  allow: string;
  allowFullScreen: boolean;
}) {
  return <iframe class="active" frameBorder="0" {...props} />;
}

export type GalleryItem = JSX.HTMLAttributes<HTMLImageElement>;

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [fullView, setFullView] = useState<boolean>(false);
  const activeItem = items[activeIndex];
  return (
    <div class="gallery">
      <img
        class="active"
        sizes="640px"
        onClick={() => setFullView(true)}
        {...activeItem}
      />
      <section class="thumbnailgrid">
        {items.map((item, itemi) => (
          <img
            class={itemi == activeIndex ? "thumbnail-selected" : "thumbnail"}
            onClick={() => setActiveIndex(itemi)}
            sizes="160px"
            {...item}
          />
        ))}
      </section>
      {fullView ? (
        <div class="fullview" onClick={() => setFullView(false)}>
          <img sizes="1280px" {...activeItem} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
