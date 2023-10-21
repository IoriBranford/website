import { GalleryItem } from "#root/components/Gallery";

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

// const GalleryComponentItems: Record<string, GalleryItem> = import.meta.glob(
//   ["./gallery/*.tsx"],
//   {
//     eager: true,
//     import: "default",
//   }
// );

export default [
  ...Object.entries(ImageItems).map<GalleryItem>((item) => {
    return {
      src: OriginalImages[item[0]],
      srcset: item[1],
      description: "",
    };
  }),
  // ...Object.values(GalleryComponentItems),
];