import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import "./Gallery.css";

export type GalleryItem = JSX.HTMLAttributes<HTMLImageElement> & {
  fullElement: JSX.Element | undefined;
};

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [fullView, setFullView] = useState<boolean>(false);
  const activeItem = items[activeIndex];
  const {fullElement} = activeItem;

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
            class={"thumbnail"}
            onClick={() => {
              setActiveIndex(itemi)
              setFullView(true)
            }}
            onMouseOver={() => setActiveIndex(itemi)}
            sizes="320px"
            {...item}
          />
        ))}
      </section>
      {fullView ? (
        <div class="fullview" onClick={() => setFullView(false)}>
          {fullElement ? fullElement : <img class='fullview' sizes="1280px" {...activeItem} />}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
