import { useContext, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import "./Gallery.css";
import { createContext } from "preact";

const GalleryContext = createContext({
  setFullView: (_:boolean)=>{}
});

export function GalleryImage({ src = "", srcset = "", alt = "" }) {
  const { setFullView } = useContext(GalleryContext);
  return (
    <img
      class="active"
      sizes="(max-width: 640px) 640px, 1280px"
      src={src}
      srcset={srcset}
      alt={alt}
      onClick={() => setFullView(true)}
    />
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
  const [fullView, setFullView] = useState<boolean>(false);
  return (
    <GalleryContext.Provider value={{ setFullView }}>
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
        {fullView ? (
          <div class="fullview" onClick={() => setFullView(false)}>
            {items[activeIndex].element}
          </div>
        ) : (
          <></>
        )}
      </div>
    </GalleryContext.Provider>
  );
}
