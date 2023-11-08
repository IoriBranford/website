import { FullElementProps, GalleryItem } from "#root/components/Gallery";
import Thumbnail from '../assets/GameplayClip.jpg?responsive'
import './GameplayClip.css'

const e : GalleryItem = {
  fullElement: (props: FullElementProps) => {
    return (
      <iframe class='video'
        src="https://www.youtube-nocookie.com/embed/zYUc3_lTGm0?si=ukhaCmoOZ2qlIQc5"
        frameBorder="0"
        {...props}
      />
    )
  },
  img: {
    srcset: Thumbnail,
    alt: "Gameplay clip",
  },
  info: {
    file: 'GameplayClip.tsx',
    maker: 'ArcadeBitesMedia',
    makerLink: 'https://linktr.ee/ArcadeBites',
    description: "Gameplay clip"
  }
};

export default e