import { useEffect, useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import "./Gallery.css";
import { CSSProperties } from "preact/compat";

export type GalleryItem = JSX.HTMLAttributes<HTMLImageElement> & {
  fullElement: JSX.Element | undefined;
};

export interface GalleryProps {
  items: GalleryItem[];
  columns: number | "auto";
  showActive: boolean
}

export default function Gallery({ items, columns = "auto", showActive = false }: GalleryProps) {
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

  let thumbGridStyle: CSSProperties = {};
  if (columns !== "auto")
    thumbGridStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  return (
    <div class="gallery">
      {showActive ? <img
        ref={activeView}
        class="active"
        sizes="640px"
        onClick={() => setFullView(true)}
        {...activeItem}
      /> : <></>}
      <section class="thumbnailgrid" style={thumbGridStyle}>
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
            onKeyUp={(e) => {
              if (e.key == "Tab") {
                activeView.current.scrollIntoView();
                setActiveIndex(itemi);
              }
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
