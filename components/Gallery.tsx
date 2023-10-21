import { useEffect, useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import "./Gallery.css";

export type GalleryItem = JSX.HTMLAttributes<HTMLImageElement> & {
  fullElement: JSX.Element | undefined;
};

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFullView, setFullView] = useState<boolean>(false);
  const fullView = useRef<HTMLDivElement>();
  const activeView = useRef<HTMLImageElement>();
  const activeItem = items[activeIndex];
  const { fullElement } = activeItem;

  const openFullView = (itemi: number) => {
    setActiveIndex(itemi);
    setFullView(true);
  };

  useEffect(() => {
    if (isFullView) fullView.current.focus();
  }, [isFullView]);

  return (
    <div class="gallery">
      <img
        ref={activeView}
        class="active"
        sizes="640px"
        onClick={() => setFullView(true)}
        {...activeItem}
      />
      <section class="thumbnailgrid">
        {items.map((item, itemi) => (
          <img
            tabIndex={0}
            class={"thumbnail"}
            onClick={() => openFullView(itemi)}
            // onKeyPress={(e) => {
            //   if (e.key == "Enter") {
            //     openFullView(itemi);
            //   }
            // }}
            onFocus={() => {
              activeView.current.scrollIntoView()
              setActiveIndex(itemi)
            }}
            onMouseOver={() => setActiveIndex(itemi)}
            sizes="320px"
            {...item}
          />
        ))}
      </section>
      <div
        tabindex={-1}
        ref={fullView}
        style={{ display: isFullView ? "flex" : "none" }}
        class="fullview"
        onClick={() => setFullView(false)}
        onKeyPress={() => setFullView(false)}
      >
        {fullElement ? (
          fullElement
        ) : (
          <img class="fullview" sizes="1280px" {...activeItem} />
        )}
      </div>
    </div>
  );
}
