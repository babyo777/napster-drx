import { AspectRatio } from "../ui/aspect-ratio";
import { useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import {
  SetPlaylistOrAlbum,
  play,
  setCurrentArtistId,
  setCurrentIndex,
  setPlaylist,
} from "@/Store/Player";
import { artists, playlistSongs } from "@/Interface";
import { Link } from "react-router-dom";
import { DATABASE_ID, ID, INSIGHTS, db } from "@/appwrite/appwriteConfig";
import axios from "axios";
import { SuggestionSearchApi } from "@/API/api";
import { useQuery, useQueryClient } from "react-query";
import SongsOptions from "../Library/SongsOptions";
function SearchSong({
  title,
  artist,
  cover,
  id,
  audio,
  artistId,
  artistName,
}: {
  audio: string;
  id: string;
  title: string;
  artist: artists[];
  cover: string;
  artistName?: string;
  artistId: string;
}) {
  const q = useQueryClient();
  const dispatch = useDispatch();
  const isPlaying = useSelector(
    (state: RootState) => state.musicReducer.isPlaying
  );
  const getSuggestedSongs = async () => {
    const r = await axios.get(`${SuggestionSearchApi}${id}`);
    return r.data as playlistSongs[];
  };
  const { data } = useQuery<playlistSongs[]>(
    ["suggestedSongs", id],
    getSuggestedSongs,
    {
      refetchOnWindowFocus: false,
    }
  );

  const handlePlay = useCallback(async () => {
    try {
      db.createDocument(DATABASE_ID, INSIGHTS, ID.unique(), {
        youtubeId: id,
        title: title,
        thumbnailUrl: cover,
        artists: [artistId, artistName],
        for: localStorage.getItem("uid"),
      });
    } catch (error) {
      console.log(error);
    }
    const m: playlistSongs = {
      youtubeId: id,
      title: title,
      artists: artist,
      thumbnailUrl: cover,
    };

    dispatch(setPlaylist([m]));
    q.refetchQueries("recentSearch");

    if (data) {
      dispatch(setPlaylist(data));
      dispatch(setCurrentIndex(0));
      dispatch(SetPlaylistOrAlbum("suggested"));
    }
    dispatch(setCurrentArtistId(artistId));
    dispatch(SetPlaylistOrAlbum("suggested"));
    if (!isPlaying) dispatch(play(true));
  }, [
    isPlaying,
    title,
    id,
    artist,
    cover,
    dispatch,
    artistId,
    data,
    artistName,
    q,
  ]);

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
            onClick={handlePlay}
            src={cover}
            width="100%"
            height="100%"
            effect="blur"
            alt="Image"
            loading="lazy"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              (e.currentTarget.src = "/demo3.jpeg")
            }
            className="rounded-md object-cover h-[100%] w-[100%]"
          />
        </AspectRatio>
      </div>
      <div className="flex space-y-0.5 flex-col pl-1 text-start w-[68dvw]">
        <p
          onClick={handlePlay}
          className={`w-[60dvw] ${
            playlist[currentIndex]?.youtubeId == audio &&
            currentIndex == 0 &&
            "text-red-500"
          }  truncate`}
        >
          {title}
        </p>
        <Link to={`/artist/${artistId}`} className="w-[40dvw]">
          <p className="-mt-0.5 h-[1rem] underline  text-zinc-400 text-xs w-[40dvw]   truncate">
            {artist[0].name || artistName}
          </p>
        </Link>
        <div className="h-[.05rem] w-full bg-zinc-300/10 mt-1.5"></div>
      </div>
      <SongsOptions />
    </div>
  );
}

export default SearchSong;
