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

export interface GalleryItem {
  img: JSX.HTMLAttributes<HTMLImageElement>
  fullElement?: JSX.Element;
  info?: GalleryItemInfo;
};

export interface GalleryProps {
  id: string;
  items: GalleryItem[];
  columns?: number;
  showActive?: boolean;
  aspectRatio?: string;
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
        img: {
          src: OriginalImages[item[0]],
          srcset: `${item[1]}, ${OriginalImages[item[0]]}`,
          alt: info ? info.description : item[0],
        },
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
  return <article class='fullviewinfo'>
    <ItemInfo {...info}/>
  </article>
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

function Thumbnail({ galleryId, img, itemi, onKeyUp, onMouseOver, imgStyle }) {
  return (
    <a tabIndex={0} role='button' class='secondary thumbnail' href={`#${galleryId}:${itemi}`}>
      <img
        class="thumbnail"
        onKeyUp={onKeyUp}
        onMouseOver={onMouseOver}
        sizes="320px"
        style={imgStyle}
        {...img}
      />
    </a>
  );
}

export default function Gallery(props: GalleryProps) {
  const { id, items, columns = items.length, showActive = false, aspectRatio = '1' } = props;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFullView, setFullView] = useState<boolean>(false);
  const [isFullViewLoading, setFullViewLoading] = useState<boolean>(false)
  const fullView = useRef<HTMLDialogElement>();
  const fullViewImg = useRef<HTMLImageElement>();
  const activeView = useRef<HTMLAnchorElement>();
  const activeItem = items[activeIndex];
  const { fullElement, info, img } = activeItem;

  const imgStyle: CSSProperties = {aspectRatio}

  const handleHash = (e?:HashChangeEvent) => {
    if (e) e.preventDefault()
    const itemi = extractIndexFromHash(location.hash, id, items.length)
    if (itemi != undefined) setActiveIndex(itemi)
    setFullView(itemi != undefined)
  }

  useEffect(() => {
    const hash = location.hash
    const itemi = extractIndexFromHash(hash, id, items.length)
    if (itemi != undefined) {
      if (history.state != hash) {
        history.replaceState('', '', location.pathname)
        history.pushState(hash, '', hash)
      }
      setActiveIndex(itemi)
      setFullView(true)
    }
    window.addEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    if (isFullView) {
      fullView.current.focus();
      document.documentElement.classList.add("modal-is-open")
      setFullViewLoading(!fullElement && fullViewImg.current && !fullViewImg.current.complete)
    } else {
      document.documentElement.classList.remove("modal-is-open")
      setFullViewLoading(true)
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
      <a tabIndex={0} role='button' class='secondary active'
          style={!showActive && { display: 'none' }}
          href={`#${id}:${activeIndex}`}
          ref={activeView}>
        <img
          class="active"
          sizes="640px"
          style={imgStyle}
          {...img}
        />
      </a>
      {rows.map((row, rowi) => (
        <div class='grid' style={{justifyItems: 'center'}}>
          {row.map((item, rowitemi) => {
            const itemi = rowi * columns + rowitemi
            return (
              <div>
                <Thumbnail galleryId={id} img={item.img} itemi={itemi} imgStyle={imgStyle}
                  onKeyUp={(e: KeyboardEvent) => {
                    if (e.key == "Tab") {
                      if (showActive)
                        activeView.current.scrollIntoView();
                      setActiveIndex(itemi);
                    }
                  }}
                  onMouseOver={() => setActiveIndex(itemi)}/>
                {info && <section><ItemInfo {...item.info}/></section>}
              </div>
            )
          })}
        </div>
      ))}
      <dialog open={isFullView}
        tabindex={-1}
        ref={fullView}
        class="fullview"
        onClick={() => history.back()}
        onKeyPress={() => history.back()}
        aria-busy={isFullViewLoading}
      >
        {fullElement}
        <img class="fullview" sizes="1280px" ref={fullViewImg}
          style={{display: (fullElement || isFullViewLoading) ? 'none' : null}}
          onLoad={() => setFullViewLoading(false)}
          {...(isFullView ? img : {})} />
        {(info && isFullView && !isFullViewLoading) ? <FullViewInfo {...info}/> : <></>}
      </dialog>
    </>
  )
}
