import { FaPlay } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  SetPlaylistOrAlbum,
  isLoop,
  play,
  setCurrentIndex,
  setIsLikedSong,
  setPlayingPlaylistUrl,
  setPlaylist,
  shuffle,
} from "@/Store/Player";
import React, { useCallback } from "react";
import { RootState } from "@/Store/Store";
import { DATABASE_ID, LIKE_SONG, db } from "@/appwrite/appwriteConfig";
import { Query } from "appwrite";
import { likedSongs } from "@/Interface";
import Loader from "@/components/Loaders/Loader";
import GoBack from "@/components/Goback";
import { Button } from "@/components/ui/button";
import Songs from "@/components/Library/Songs";
import { RxShuffle } from "react-icons/rx";
import { RiFocus3Line } from "react-icons/ri";

function LikedSongComp() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );
  const playingPlaylistUrl = useSelector(
    (state: RootState) => state.musicReducer.playingPlaylistUrl
  );

  const playlist = useSelector(
    (state: RootState) => state.musicReducer.playlist
  );

  const getPlaylistDetails = async () => {
    const r = await db.listDocuments(DATABASE_ID, LIKE_SONG, [
      Query.orderDesc("$createdAt"),
      Query.equal("for", [id || localStorage.getItem("uid") || ""]),
      Query.limit(999),
    ]);
    const modified = r.documents.map((doc) => ({
      for: doc.for,
      youtubeId: doc.youtubeId,
      artists: [
        {
          id: doc.artists[0],
          name: doc.artists[1],
        },
      ],
      title: doc.title,
      thumbnailUrl: doc.thumbnailUrl,
    }));
    return modified as unknown as likedSongs[];
  };

  const isPlaying = useSelector(
    (state: RootState) => state.musicReducer.isPlaying
  );

  const {
    data: pDetails,
    isLoading: pLoading,
    isError: pError,
    refetch: pRefetch,
  } = useQuery<likedSongs[]>(["likedSongsDetails", id], getPlaylistDetails, {
    retry: 5,
    staleTime: 1000,
    refetchOnWindowFocus: false,
  });
  const handleShufflePlay = useCallback(async () => {
    if (pDetails) {
      dispatch(shuffle(pDetails));
      dispatch(setCurrentIndex(0));
      dispatch(setPlayingPlaylistUrl(id || ""));
      dispatch(SetPlaylistOrAlbum("liked"));
      if (pDetails.length == 1) {
        dispatch(isLoop(true));
      } else {
        dispatch(isLoop(false));
      }
      if (!isPlaying) {
        dispatch(play(true));
      }
    }
  }, [dispatch, pDetails, isPlaying, id]);
  const handlePlay = useCallback(() => {
    if (pDetails) {
      dispatch(setIsLikedSong(true));
      dispatch(setPlaylist(pDetails));
      dispatch(setCurrentIndex(0));
      dispatch(setPlayingPlaylistUrl(id || ""));
      dispatch(SetPlaylistOrAlbum("liked"));
      if (pDetails.length == 1) {
        dispatch(isLoop(true));
      } else {
        dispatch(isLoop(false));
      }
      if (!isPlaying) {
        dispatch(play(true));
      }
    }
  }, [dispatch, isPlaying, id, pDetails]);

  const handleFocus = useCallback(() => {
    const toFocus = document.getElementById(playlist[currentIndex].youtubeId);
    toFocus?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentIndex, playlist]);

  return (
    <div className=" flex flex-col items-center">
      {pError && pError && (
        <div className=" relative  w-full">
          <div className="fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            No playlist found
          </div>
          <NavLink to={"/library/"}>
            <IoIosArrowBack className="h-7 w-7  my-5 mx-4  backdrop-blur-md text-black bg-white/70 rounded-full p-1" />
          </NavLink>
        </div>
      )}
      {pLoading && pLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      )}
      {pDetails && (
        <>
          <div className="flex w-full h-[25rem]   relative ">
            <GoBack />
            <div className="absolute top-4 z-10 right-3 flex-col space-y-0.5">
              <div className="">
                <IoReload
                  onClick={() => pRefetch()}
                  className="h-8 w-8  mb-2 backdrop-blur-md text-white bg-black/30 rounded-full p-1.5"
                />
              </div>

              {playingPlaylistUrl == id && (
                <div className="" onClick={handleFocus}>
                  <RiFocus3Line className="h-8 w-8 fade-in  backdrop-blur-md text-white bg-black/30 rounded-full p-1.5" />
                </div>
              )}
            </div>
            <img
              width="100%"
              height="100%"
              src="/liked.webp"
              alt="Image"
              loading="lazy"
              className="object-cover opacity-80 h-[100%] w-[100%]"
            />

            <div className=" absolute bottom-5 px-4 left-0  right-0">
              <h1 className="text-center  font-semibold py-2 text-2xl capitalize">
                Liked Songs
              </h1>
              <div className="flex space-x-4 py-1 px-2 justify-center  items-center w-full">
                <Button
                  onClick={handlePlay}
                  type="button"
                  variant={"secondary"}
                  className="text-lg py-6 text-black shadow-none bg-white/95 rounded-lg px-[13dvw]"
                >
                  <FaPlay className="mr-2" />
                  Play
                </Button>
                <Button
                  type="button"
                  onClick={handleShufflePlay}
                  variant={"secondary"}
                  className="text-lg py-6 text-black shadow-none bg-white/95 rounded-lg px-[12dvw]"
                >
                  <RxShuffle className="mr-2" />
                  Shuffle
                </Button>
              </div>
            </div>
          </div>
          <div className="py-3 pb-[9.5rem]">
            {pDetails.map((data, i) => (
              <Songs
                p={id || ""}
                liked={true}
                query="likedSongsDetails"
                artistId={data.artists[0].id}
                audio={data.youtubeId}
                key={data.youtubeId + i}
                id={i}
                where="liked"
                title={data.title}
                artist={data.artists[0].name}
                cover={data.thumbnailUrl}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
const LikedSong = React.memo(LikedSongComp);
export default LikedSong;
