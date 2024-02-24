import { AspectRatio } from "../ui/aspect-ratio";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { SearchPlaylist } from "@/Interface";

function PlaylistSearchComp({
  playlistId,
  title,
  thumbnailUrl,
}: SearchPlaylist) {
  return (
    <div className="flex fade-in py-2 space-x-2 items-center">
      <Link to={`/library/${playlistId}`}>
        <div className="overflow-hidden h-12 w-12 space-y-2">
          <AspectRatio ratio={1 / 1}>
            <LazyLoadImage
              src={thumbnailUrl}
              width="100%"
              height="100%"
              effect="blur"
              alt="Image"
              loading="lazy"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                (e.currentTarget.src = "/demo3.jpeg")
              }
              className="rounded-sm object-cover h-[100%] w-[100%]"
            />
          </AspectRatio>
        </div>
      </Link>
      <Link to={`/library/${playlistId}`}>
        <div className="flex  flex-col pl-1 text-start w-[70dvw]">
          <p className="-mt-0.5 underline text-zinc-400 text-xs w-[40dvw]   truncate">
            {title}
          </p>
        </div>
      </Link>
      <Link to={`/library/${playlistId}`}>
        <GrNext />
      </Link>
    </div>
  );
}

export { PlaylistSearchComp };
