import Gallery, { GalleryItem, GalleryImage } from "#root/components/Gallery";

const ImageItems: Record<string, string> = import.meta.glob(
  ["./gallery/*.png", "./gallery/*.jpg"],
  {
    eager: true,
    import: "default",
    query: {
      galleryimg: true,
    },
  }
);

const OriginalImages: Record<string, string> = import.meta.glob(
  ["./gallery/*.png", "./gallery/*.jpg"],
  {
    eager: true,
    import: "default",
  }
);

const GalleryComponentItems: Record<string, GalleryItem> = import.meta.glob(
  ["./gallery/*.tsx"],
  {
    eager: true,
    import: "default",
  }
);

const GalleryItems: GalleryItem[] = [
  ...Object.entries(ImageItems).map((item) => {
    return {
      element: (
        <GalleryImage
          src={OriginalImages[item[0]]}
          srcset={item[1]}
          alt={item[0]}
        />
      ),
      thumbnail: item[1],
      caption: "",
    };
  }),
  ...Object.values(GalleryComponentItems),
];

export default function() {
  return <Gallery items={GalleryItems}/>
}

