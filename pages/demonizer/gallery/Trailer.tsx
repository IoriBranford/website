import { FullElementProps, GalleryItem } from "#root/components/Gallery";
import Thumbnail from '../assets/Trailer.jpg?responsive'
import './Trailer.css'

const e : GalleryItem = {
  fullElement: (props: FullElementProps) => {
    return (
      <iframe class='video'
        src="https://www.youtube-nocookie.com/embed/TGYRJMf5UbM?si=6wN1NIq0GRNjcPes"
        frameBorder="0"
        {...props}
      />
    )
  },
  img: {
    srcset: Thumbnail,
    alt: "Demonizer trailer",
  },
};

export default e