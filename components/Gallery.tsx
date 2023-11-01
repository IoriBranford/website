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
  maxColumns?: number;
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
    {maker == '' ? <></> : <><br/>By: {makerLink == '' ? maker : <a href={makerLink} target='__blank'>{maker}</a>}</>}
  </div>
}

export default function Gallery(props: GalleryProps) {
  const { items, maxColumns, showActive = false } = props;
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

  const rows = []
  if (maxColumns) {
    if (items.length > maxColumns) {
      rows.pop()
      let i: number
      for (i = 0; i < items.length; i += maxColumns) {
        rows.push(items.slice(i, Math.min(i + maxColumns, items.length)))
      }
    }
  } else {
    rows.push(items)
  }

  return (
    <>
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
      {rows.map((row, rowi) => (
        <div class='grid'>
         {row.map((item, itemi) => (
          <img
            tabIndex={0}
            class="thumbnail"
            onClick={() => openFullView(rowi * maxColumns + itemi)}
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
            onMouseOver={() => setActiveIndex(rowi * maxColumns + itemi)}
            sizes="320px"
            {...item}
          />
        ))}
        </div>
      ))}
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
    </>
  )
}
