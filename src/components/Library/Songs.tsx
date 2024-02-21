import { IoIosMore } from "react-icons/io";
import { AspectRatio } from "../ui/aspect-ratio";
import { useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import {
  isLoop,
  play,
  setCurrentArtistId,
  setCurrentIndex,
  setPlayingPlaylistUrl,
  setPlaylist,
} from "@/Store/Player";
import { playlistSongs } from "@/Interface";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";

function Songs({
  title,
  artist,
  cover,
  id,
  audio,
  p,
  artistId,
}: {
  artistId: string;
  p: string;
  audio: string;
  id: number;
  title: string;
  artist: string;
  cover: string;
}) {
  const dispatch = useDispatch();
  const q = useQueryClient();
  const isPlaying = useSelector(
    (state: RootState) => state.musicReducer.isPlaying
  );
  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );
  const playlist = useSelector(
    (state: RootState) => state.musicReducer.playlist
  );
  const playingPlaylistUrl = useSelector(
    (state: RootState) => state.musicReducer.playingPlaylistUrl
  );

  const handlePlay = useCallback(async () => {
    const data = q.getQueryData<playlistSongs[]>(["playlist", p]);
    console.log(data);

    if (data && data.length > 0) {
      dispatch(isLoop(false));
      dispatch(setPlayingPlaylistUrl(p));
      dispatch(setCurrentArtistId(artistId));
      dispatch(setPlaylist(data));
      dispatch(setCurrentIndex(id));
    }
    if (!isPlaying) dispatch(play(true));
  }, [dispatch, id, q, p, isPlaying, artistId]);

  const handleShare = useCallback(async () => {
    if (playlist && playlist.length > 0) {
      try {
        await navigator.share({
          title: `${title} - ${artist}`,
          text: `${title} - ${artist}`,
          url: window.location.origin + `/library/${playingPlaylistUrl}`,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [artist, title, playlist, playingPlaylistUrl]);

  return (
    <div id={artistId} className="flex fade-in py-2 space-x-2 items-center">
      <div className="overflow-hidden h-12 w-12 space-y-2">
        <AspectRatio ratio={1 / 1}>
          <LazyLoadImage
            onClick={handlePlay}
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
            playlist[currentIndex]?.youtubeId == audio && "text-red-500"
          }  truncate`}
        >
          {title.replace("______________________________________", "untitled")}
        </span>
        <Link to={`/artist/${artistId}`}>
          <span className="-mt-0.5 text-xs underline text-zinc-400 w-[11rem] truncate">
            {artist}
          </span>
        </Link>
        <div className="h-[.05rem] w-full bg-zinc-300/10 mt-1.5"></div>
      </div>
      <IoIosMore
        onClick={handleShare}
        className={playlist.length > 0 ? "text-zinc-100" : "text-zinc-600"}
      />
    </div>
  );
}

export default Songs;
