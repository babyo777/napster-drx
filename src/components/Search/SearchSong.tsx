import { IoIosMore } from "react-icons/io";
import { AspectRatio } from "../ui/aspect-ratio";
import { useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import { isLoop, play, setCurrentIndex, setPlaylist } from "@/Store/Player";
function SearchSong({
  title,
  artist,
  cover,
  id,
  audio,
}: {
  audio: string;
  id: number;
  title: string;
  artist: string;
  cover: string;
}) {
  const dispatch = useDispatch();
  const isPlaying = useSelector(
    (state: RootState) => state.musicReducer.isPlaying
  );
  const handlePlay = useCallback(() => {
    const m = {
      id: id,
      title: title,
      artist: artist,
      audio: audio,
      cover: cover,
    };
    dispatch(setCurrentIndex(0));
    dispatch(setPlaylist([m]));
    dispatch(isLoop(true));
    if (!isPlaying) dispatch(play(true));
  }, [artist, isPlaying, audio, cover, id, title, dispatch]);
  const handleShare = useCallback(async () => {
    try {
      await navigator.share({
        title: `${title} - ${artist}`,
        text: `${title} - ${artist}`,
        url: window.location.origin + "/library/expand",
      });
    } catch (error) {
      console.log(error);
    }
  }, [artist, title]);
  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );
  const playlist = useSelector(
    (state: RootState) => state.musicReducer.playlist
  );
  return (
    <div className="flex fade-in py-2 space-x-2 items-center">
      <div className="overflow-hidden h-12 w-12 space-y-2">
        <AspectRatio ratio={1 / 1}>
          <LazyLoadImage
            src={cover}
            width="100%"
            height="100%"
            effect="blur"
            alt="Image"
            loading="lazy"
            className="rounded-md object-cover h-[100%] w-[100%]"
          />
        </AspectRatio>
      </div>
      <div className="flex  flex-col pl-1 text-start w-[17rem]">
        <span
          onClick={handlePlay}
          className={`w-[15rem] ${
            playlist[currentIndex]?.audio == audio && "text-red-500"
          }  truncate`}
        >
          {title}
        </span>
        <span className="-mt-0.5 text-zinc-400 text-xs w-[11rem] truncate">
          {artist}
        </span>
        <div className="h-[.05rem] w-full bg-zinc-300/10 mt-1.5"></div>
      </div>
      <IoIosMore onClick={handleShare} />
    </div>
  );
}

export default SearchSong;
