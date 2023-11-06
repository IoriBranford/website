import { GalleryItem, GalleryItems } from "#root/components/Gallery";

const ImageItems: Record<string, string> = import.meta.glob(
  ["./*.png", "./*.jpg"],
  {
    eager: true,
    import: "default",
    query: {
      responsive: true,
    },
  }
);

const OriginalImages: Record<string, string> = import.meta.glob(
  ["./*.png", "./*.jpg"],
  {
    eager: true,
    import: "default",
  }
);

const ElementItems: Record<string, GalleryItem> = import.meta.glob(
  ["./*.tsx"],
  {
    eager: true,
    import: "default",
  }
);

import ItemsCsv from './_items.csv?raw'

export default GalleryItems(ImageItems, OriginalImages, ElementItems, ItemsCsv)