import { useEffect, useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import "./Gallery.css";

export interface GalleryItemInfo {
  file: string;
  maker: string;
  makerLink: string;
  description: string;
}

export type GalleryItem = JSX.HTMLAttributes<HTMLImageElement> & {
  fullElement?: JSX.Element;
  info?: GalleryItemInfo;
};

export interface GalleryProps {
  items: GalleryItem[];
  columns?: number;
  showActive?: boolean;
}

function csvToArr<T = Object>(csv: string, sep: string|RegExp = /,|[\n\r]+/) {
  const [keys, ...rows] = csv
    .trim()
    .split("\n")
    .map((item) => item.split(sep).filter(s => s !== ''));

  return rows.map((item) =>
    keys.reduce((obj, key, i) => {
      obj[key] = item[i]
      return obj
    }, {} as T)
  );
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

function ItemInfo({maker, makerLink, description}:GalleryItemInfo) {
  return <>
    {description}
    {maker == '' ? <></> : <><br/>by {makerLink == '' ? maker : <a href={makerLink} target='__blank'>{maker}</a>}</>}
  </>
}

function FullViewInfo(info:GalleryItemInfo) {
  return <div class='fullviewinfo'>
    <ItemInfo {...info}/>
  </div>
}

export default function Gallery(props: GalleryProps) {
  const { items, columns = items.length, showActive = false } = props;
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

  const rows: GalleryItem[][] = []
  if (items.length > columns) {
    for (let i = 0; i < items.length; i += columns) {
      rows.push(items.slice(i, Math.min(i + columns, items.length)))
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
          <div>
            <img
              tabIndex={0}
              class="thumbnail"
              onClick={() => openFullView(rowi * columns + itemi)}
              // onKeyPress={(e) => {
              //   if (e.key == "Enter") {
              //     openFullView(itemi);
              //   }
              // }}
              onKeyUp={(e) => {
                if (e.key == "Tab") {
                  if (activeView.current)
                    activeView.current.scrollIntoView();
                  setActiveIndex(rowi * columns + itemi);
                }
              }}
              onMouseOver={() => setActiveIndex(rowi * columns + itemi)}
              sizes="320px"
              {...item}
            />
            {item.info && <section><ItemInfo {...item.info}/></section>}
          </div>
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
