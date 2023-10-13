import { GalleryIFrame } from "#root/components/Gallery";
import Shot1 from '../assets/shot1.jpg?galleryimg'

export default {
  element: (
    <GalleryIFrame
      src="https://www.youtube-nocookie.com/embed/TGYRJMf5UbM?si=6wN1NIq0GRNjcPes"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ),
  thumbnail: Shot1,
  caption: "",
};
