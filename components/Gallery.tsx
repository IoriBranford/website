import { useEffect, useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import "./Gallery.css";
import { CSSProperties } from "preact/compat";

export interface GalleryItemInfo {
  file: string;
  maker: string;
  makerLink: string;
  description: string;
}

export type GalleryItem = JSX.HTMLAttributes<HTMLImageElement> & {
  fullElement?: JSX.Element;
  info: GalleryItemInfo;
};

export interface GalleryProps {
  items: GalleryItem[];
  columns?: number | "auto";
  showActive?: boolean;
}

function csvToArr<T = Object>(stringVal: string, splitter: string = ',') {
  const [keys, ...rest] = stringVal
    .trim()
    .split("\n")
    .map((item) => item.split(splitter));

  const formedArr = rest.map((item) => {
    const object = {} as T;
    keys.forEach((key, index) => (object[key] = item[index]));
    return object;
  });
  return formedArr;
}

export const GalleryItems = (
  ImageItems: Record<string, string>,
  OriginalImages: Record<string, string>,
  ElementItems: Record<string, GalleryItem> = {},
  ItemsCsv: string = ""
) => {
  const ItemsInfo = (
    csvToArr<GalleryItemInfo>(ItemsCsv)
  ).reduce<Record<string, GalleryItemInfo>>((allInfo, info) => {
    allInfo[info.file] = info;
    return allInfo;
  }, {});

  return [
    ...Object.entries(ImageItems).map<GalleryItem>((item) => {
      const info = ItemsInfo[item[0]];
      return {
        src: OriginalImages[item[0]],
        srcset: item[1],
        alt: info ? info.description : item[0],
        info,
      };
    }),
    ...Object.values(ElementItems),
  ];
};

function FullViewInfo({maker, makerLink, description}:GalleryItemInfo) {
  return <div class='fullviewinfo'>
    {description}
    {maker == '' ? <></> : <p>By: {makerLink == '' ? maker : <a href={makerLink} target='__blank'>{maker}</a>}</p>}
  </div>
}

export default function Gallery(props: GalleryProps) {
  const { items, columns = "auto", showActive = false } = props;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFullView, setFullView] = useState<boolean>(false);
  const fullView = useRef<HTMLDivElement>();
  const activeView = useRef<HTMLImageElement>();
  const activeItem = items[activeIndex];
  const { fullElement, info } = activeItem;

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
      {showActive ? (
        <img
          ref={activeView}
          class="active"
          sizes="640px"
          onClick={() => setFullView(true)}
          {...activeItem}
        />
      ) : (
        <></>
      )}
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
        {info ? <FullViewInfo {...info}/> : <></>}
      </div>
    </div>
  );
}
