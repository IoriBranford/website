import { GalleryItem } from "#root/components/Gallery";
import Thumbnail from '../assets/Trailer.jpg?responsive'
import './Trailer.css'

const e : GalleryItem = {
  fullElement: (
    <iframe class='video'
      src="https://www.youtube-nocookie.com/embed/TGYRJMf5UbM?si=6wN1NIq0GRNjcPes"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ),
  srcset: Thumbnail,
  alt: "Demonizer trailer",
};

export default e