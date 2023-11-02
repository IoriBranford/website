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
  id: string;
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

function extractIndexFromHash(hash:string, galleryId:string, numItems:number): number {
  hash = hash || ''
  if (hash == '') return;
  const [_, id, i] = hash.match(/#?([^:]+):(\d+)/)
  if (id != galleryId) return;
  if (!i) return;
  const itemi = parseInt(i)
  if (isNaN(itemi) || itemi < 0 || itemi >= numItems) return
  return itemi
}

export default function Gallery(props: GalleryProps) {
  const { id, items, columns = items.length, showActive = false } = props;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFullView, setFullView] = useState<boolean>(false);
  const fullView = useRef<HTMLDivElement>();
  const activeView = useRef<HTMLImageElement>();
  const activeItem = items[activeIndex];
  const { fullElement, info } = activeItem;

  const handleHash = (e?:HashChangeEvent) => {
    if (e) e.preventDefault()
    const itemi = extractIndexFromHash(location.hash, id, items.length)
    if (itemi != undefined) setActiveIndex(itemi)
    setFullView(itemi != undefined)
  }

  useEffect(() => {
    window.addEventListener('hashchange', handleHash)
    handleHash()
  }, [])

  useEffect(() => {
    if (isFullView) {
      fullView.current.focus();
    }
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
      <a tabIndex={0} href={`#${id}:${activeIndex}`}>
        <img
          ref={activeView}
          class="active"
          style={!showActive && { display: 'none' }}
          sizes="640px"
          {...activeItem}
        />
      </a>
      {rows.map((row, rowi) => (
        <div class='grid'>
         {row.map((item, itemi) => (
          <div>
            <a tabIndex={0} href={`#${id}:${rowi * columns + itemi}`}>
              <img
                class="thumbnail"
                // onKeyPress={(e) => {
                //   if (e.key == "Enter") {
                //     openFullView(itemi);
                //   }
                // }}
                onKeyUp={(e) => {
                  if (e.key == "Tab") {
                    activeView.current.scrollIntoView();
                    setActiveIndex(rowi * columns + itemi);
                  }
                }}
                onMouseOver={() => setActiveIndex(rowi * columns + itemi)}
                sizes="320px"
                {...item}
              />
            </a>
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
        onClick={() => history.back()}
        onKeyPress={() => history.back()}
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
