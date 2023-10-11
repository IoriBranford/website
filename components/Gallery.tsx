import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import './Gallery.css'

export default function Gallery({ media }: { media: JSX.Element[] }) {
  const [i, setI] = useState<number>(0);
  return (
    <div>
      <div height='auto' width='100%'>
        {media[i]}
      </div>
      <section class="thumbnailgrid">
        {media.map((c, ci) => (
          <div onClick={() => setI(ci)}>{c}</div>
        ))}
      </section>
    </div>
  );
}
