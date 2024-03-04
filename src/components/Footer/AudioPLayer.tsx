import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaBackward } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { FaForward } from "react-icons/fa";
import { TbMessage } from "react-icons/tb";
import { FiShare } from "react-icons/fi";
import { FaPause } from "react-icons/fa6";
import { MdOpenInNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { play, setCurrentIndex, setIsLoading, setPlayer } from "@/Store/Player";
import { RootState } from "@/Store/Store";
import { streamApi } from "@/API/api";
import Loader from "../Loaders/Loader";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaRegHeart } from "react-icons/fa6";
import "react-lazy-load-image-component/src/effects/blur.css";
import { DATABASE_ID, ID, LIKE_SONG, db } from "@/appwrite/appwriteConfig";
import { FaHeart } from "react-icons/fa";
import { useQuery } from "react-query";
import { Query } from "appwrite";
import { useSwipeable } from "react-swipeable";
function AudioPLayerComp() {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState<number | "--:--">();
  const music = useSelector((state: RootState) => state.musicReducer.music);
  const [progress, setProgress] = useState<number | "--:--">();
  const [liked, SetLiked] = useState<boolean>();
  const PlaylistOrAlbum = useSelector(
    (state: RootState) => state.musicReducer.PlaylistOrAlbum
  );
  const isLikedSong = useSelector(
    (state: RootState) => state.musicReducer.isLikedSong
  );
  const isPlaying = useSelector(
    (state: RootState) => state.musicReducer.isPlaying
  );
  const isLoading = useSelector(
    (state: RootState) => state.musicReducer.isLoading
  );
  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );
  const playlist = useSelector(
    (state: RootState) => state.musicReducer.playlist
  );
  const currentArtistId = useSelector(
    (state: RootState) => state.musicReducer.currentArtistId
  );
  const playingPlaylistUrl = useSelector(
    (state: RootState) => state.musicReducer.playingPlaylistUrl
  );
  const isLoop = useSelector((state: RootState) => state.musicReducer.isLoop);

  const isLikedCheck = async () => {
    const r = await db.listDocuments(DATABASE_ID, LIKE_SONG, [
      Query.equal("for", [localStorage.getItem("uid") || "default"]),
      Query.equal("youtubeId", [playlist[currentIndex].youtubeId]),
    ]);
    if (r.documents.length == 0) {
      SetLiked(false);
    } else {
      SetLiked(true);
    }
    return r.documents;
  };

  const { data: isLiked, refetch } = useQuery(
    ["likedSongs", playlist[currentIndex].youtubeId],
    isLikedCheck,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  const handleLink = useCallback(() => {
    SetLiked(true);
    db.createDocument(DATABASE_ID, LIKE_SONG, ID.unique(), {
      youtubeId: playlist[currentIndex].youtubeId,
      title: playlist[currentIndex].title,
      artists: [
        playlist[currentIndex].artists[0]?.id || currentArtistId || "unknown",
        playlist[currentIndex].artists[0]?.name || "unknown",
      ],
      thumbnailUrl: playlist[currentIndex].thumbnailUrl,
      for: localStorage.getItem("uid") || "default",
    })
      .then(() => {
        refetch();
      })
      .catch(() => {
        SetLiked(false);
      });
  }, [currentIndex, playlist, currentArtistId, refetch]);

  const RemoveLike = useCallback(async () => {
    SetLiked(false);
    if (isLiked) {
      try {
        await db.deleteDocument(
          DATABASE_ID,
          LIKE_SONG,
          isLiked[0].$id || "default"
        );
      } catch (error) {
        console.error(error);
        SetLiked(true);
      }
    }
  }, [isLiked]);

  const handlePlay = useCallback(() => {
    if (isPlaying) {
      music?.pause();
      dispatch(play(false));
    } else {
      music?.play();
      dispatch(play(true));
    }
  }, [isPlaying, music, dispatch]);

  const handleNext = useCallback(() => {
    SetLiked(false);
    if (playlist.length > 1) {
      dispatch(setCurrentIndex((currentIndex + 1) % playlist.length));
    }
  }, [dispatch, currentIndex, playlist.length]);

  const handlePrev = useCallback(() => {
    if (playlist.length > 1) {
      dispatch(
        setCurrentIndex((currentIndex - 1 + playlist.length) % playlist.length)
      );
    }
  }, [dispatch, currentIndex, playlist.length]);

  const swipeHandler = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
  });

  // useEffect(() => {
  //   const audioContext = new (window.AudioContext ||
  //     // @ts-expect-error:ignore
  //     window.webkitAudioContext)();
  //   const source = audioContext.createBufferSource();
  //   source.start(0);
  // }, []);
  useEffect(() => {
    dispatch(setIsLoading(true));
    const sound: HTMLAudioElement = new Audio(
      `${streamApi}${playlist[currentIndex].youtubeId}`
    );

    const handlePlay = () => {
      if (isLoop) {
        sound.loop = true;
      }
      setDuration(sound.duration);
      navigator.mediaSession.metadata = new MediaMetadata({
        title: playlist[currentIndex].title,
        artist: playlist[currentIndex].artists[0]?.name,
        album: "",
        artwork: [
          {
            src: playlist[currentIndex].thumbnailUrl.replace(
              "w120-h120",
              "w1080-h1080"
            ),
          },
        ],
      });
      //navigator.mediaSession.playbackState = "playing";
      navigator.mediaSession.setActionHandler("play", () => sound.play());
      navigator.mediaSession.setActionHandler("pause", () => sound.pause());
      navigator.mediaSession.setActionHandler("nexttrack", handleNext);
      navigator.mediaSession.setActionHandler("previoustrack", handlePrev);
      navigator.mediaSession.setActionHandler("seekto", handleSeek);
      dispatch(play(true));
    };

    const handlePause = () => {
      dispatch(play(false));
    };

    const handleError = () => {
      setDuration("--:--");
      setProgress("--:--");
      dispatch(setIsLoading(true));
    };

    const handleSeek = (seek: MediaSessionActionDetails) => {
      if (sound.currentTime !== seek.seekTime) {
        sound.currentTime = seek.seekTime ?? 0;
        if (sound.paused) {
          sound.play();
        }
      }
    };

    const handleLoad = () => {
      dispatch(setIsLoading(false));
      refetch();
      setDuration(sound.duration || 0);
    };

    const handleTimeUpdate = () => {
      setProgress(sound.currentTime);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && sound.paused) {
        sound.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    sound.setAttribute("playsinline", "true");
    sound.addEventListener("play", handlePlay);
    sound.addEventListener("pause", handlePause);
    sound.addEventListener("loadedmetadata", handleLoad);
    sound.addEventListener("error", handleError);
    sound.addEventListener("timeupdate", handleTimeUpdate);
    sound.addEventListener("ended", handleNext);

    dispatch(setPlayer(sound));
    sound.play();

    return () => {
      sound.pause();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      sound.removeEventListener("play", handlePlay);
      sound.removeEventListener("pause", handlePause);
      sound.removeEventListener("loadedmetadata", handleLoad);

      sound.removeEventListener("timeupdate", handleTimeUpdate);
      sound.removeEventListener("error", handleError);
      sound.removeEventListener("ended", handleNext);
      navigator.mediaSession.playbackState = "none";
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("seekto", null);
    };
  }, [
    dispatch,
    handlePrev,
    currentIndex,
    playlist,
    handleNext,
    refetch,
    isLoop,
  ]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.share({
        title: `${playlist[currentIndex].title} - ${playlist[currentIndex].artists[0].name}`,
        text: `${playlist[currentIndex].title} - ${playlist[currentIndex].artists[0].name}`,
        url: `${window.location.origin}/${PlaylistOrAlbum}/`,
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentIndex, playlist, PlaylistOrAlbum]);

  const handleSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (music) {
        music.currentTime = parseInt(e.target.value) ?? 0;
      }
    },
    [music]
  );

  const formatDuration = useCallback((seconds: number | "--:--") => {
    if (seconds == "--:--") return seconds;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }, []);

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="items-center fade-in flex space-x-2 w-[68dvw]   px-2.5">
          <div className=" h-11 w-11 overflow-hidden rounded-xl">
            <LazyLoadImage
              height="100%"
              width="100%"
              src={playlist[currentIndex].thumbnailUrl}
              alt="Image"
              effect="blur"
              className="object-cover rounded-xl w-[100%] h-[100%] "
            />
          </div>
          <div className="flex flex-col text-start">
            <p className=" text-sm truncate w-[50vw] ">
              {playlist[currentIndex].title}
            </p>
            <p className=" text-xs w-[30vw] truncate">
              {playlist[currentIndex].artists[0]?.name}
            </p>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className=" h-[96dvh]  bg-zinc-900 ">
        <div className="flex flex-col justify-start pt-2  h-full">
          <DrawerHeader>
            <div
              {...swipeHandler}
              className="overflow-hidden h-[48dvh] w-[90vw] rounded-2xl mx-1 "
            >
              <AspectRatio>
                <LazyLoadImage
                  height="100%"
                  width="100%"
                  src={playlist[currentIndex].thumbnailUrl.replace(
                    "w120-h120",
                    "w1080-h1080"
                  )}
                  alt="Image"
                  visibleByDefault
                  className="object-cover rounded-2xl w-[100%] h-[100%]"
                />
              </AspectRatio>
            </div>
            <div className=" absolute bottom-[35.5vh] w-full text-start px-2 ">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl truncate   w-[75vw] font-semibold">
                  {" "}
                  {playlist[currentIndex].title}
                </h1>

                {liked ? (
                  <FaHeart
                    onClick={RemoveLike}
                    className="h-7 w-7 fade-in fill-red-500"
                  />
                ) : (
                  <FaRegHeart
                    className="h-7 w-7 fade-in"
                    onClick={handleLink}
                  />
                )}
              </div>

              {playlist[currentIndex].artists[0]?.name ? (
                <Link
                  to={`/artist/${
                    playlist[currentIndex].artists[0]?.id || currentArtistId
                  }`}
                >
                  <DrawerClose className="text-start">
                    <p className="text-base truncate  underline underline-offset-4 w-[70vw] text-red-500">
                      {" "}
                      {playlist[currentIndex].artists[0]?.name}
                    </p>
                  </DrawerClose>
                </Link>
              ) : (
                <p className="text-base truncate  w-64 text-red-500">
                  {" "}
                  Unknown
                </p>
              )}
            </div>
          </DrawerHeader>
          <div className="flex  absolute bottom-[26vh]  w-full flex-col justify-center px-6 pt-1 ">
            <input
              type="range"
              value={progress || 0}
              max={duration || 0}
              onInput={handleSeek}
              step="1"
              className="w-full h-2 bg-gray-200 overflow-hidden rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex text-sm justify-between py-2 px-1">
              <span>
                {useMemo(
                  () => formatDuration(progress as "--:--"),
                  [formatDuration, progress]
                )}
              </span>
              <span>
                {useMemo(
                  () => formatDuration(duration as "--:--"),
                  [formatDuration, duration]
                )}
              </span>
            </div>
          </div>
          <div className="flex absolute bottom-[16vh] w-full space-x-16 justify-center  items-center">
            <FaBackward
              className={`h-8 w-10 ${
                playlist.length > 1 ? "text-zinc-300" : "text-zinc-500"
              } `}
              onClick={handlePrev}
            />
            {isLoading ? (
              <div className="h-12 w-12 flex justify-center items-center">
                <Loader size="37" />
              </div>
            ) : (
              <>
                {isPlaying ? (
                  <FaPause className="h-12 w-12" onClick={handlePlay} />
                ) : (
                  <IoPlay className="h-12 w-12" onClick={handlePlay} />
                )}
              </>
            )}

            <FaForward
              className={`h-8 w-9 ${
                playlist.length > 1 ? "text-zinc-300" : "text-zinc-500"
              } `}
              onClick={handleNext}
            />
          </div>
          <div className=" justify-center absolute bottom-[6vh] w-full px-7 text-zinc-400 items-center">
            <div className="flex items-center justify-between w-full">
              {playlist.length > 1 ? (
                <Link
                  to={`/${
                    isLikedSong ? "liked" : PlaylistOrAlbum
                  }/${playingPlaylistUrl}`}
                >
                  <DrawerClose>
                    <MdOpenInNew className="h-6 w-6" />
                  </DrawerClose>
                </Link>
              ) : (
                <MdOpenInNew className="h-6 w-6 text-zinc-700" />
              )}

              <TbMessage
                onClick={() => alert("lyrics soon..")}
                className="h-7 w-7"
              />
              <FiShare className="h-6 w-6" onClick={handleShare} />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
const AudioPLayer = React.memo(AudioPLayerComp);
export default AudioPLayer;
