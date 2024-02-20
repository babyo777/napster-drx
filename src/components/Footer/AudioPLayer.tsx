import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {AspectRatio} from "@/components/ui/aspect-ratio"
import { FaBackward } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { FaForward } from "react-icons/fa";
import { IoIosRadio } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import { FaPause } from "react-icons/fa6";
import { MdOpenInNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { play, setCurrentIndex, setIsLoading, setPlayer } from "@/Store/Player";
import { RootState } from "@/Store/Store";
import { Howl } from "howler";
import { streamApi } from "@/API/api";
import Loader from "../Loaders/Loader";
import { Link } from "react-router-dom";
function AudioPLayerComp() {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState<number | "--:--">();
  const music = useSelector((state: RootState) => state.musicReducer.music);
  const [progress, setProgress] = useState<number | "--:--">();
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
  const playingPlaylistUrl = useSelector(
    (state: RootState) => state.musicReducer.playingPlaylistUrl
  );
  const isLoop = useSelector((state: RootState) => state.musicReducer.isLoop);

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

  const handleMediaSession = useCallback(() => {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: playlist[currentIndex].title,
      artist: playlist[currentIndex].artist,
      artwork: [
        {
          src: playlist[currentIndex].cover,
        },
      ],
    });
  }, [currentIndex, playlist]);

  useEffect(() => {
    const sound = new Howl({
      src: [
        `${streamApi}${playlist[currentIndex].audio.replace(
          "https://www.youtube.com/watch?v=",
          ""
        )}`,
      ],
      autoplay: false,
      loop: isLoop,
      html5: true,
      onload: () => {
        requestAnimationFrame(seek);
        setDuration(sound.duration());
        handleMediaSession();
        dispatch(setIsLoading(true));
      },
      onloaderror: () => {
        setDuration("--:--");
        setProgress("--:--");
        dispatch(setIsLoading(true));
      },
      onplayerror: () => {
        setDuration("--:--");
        setProgress("--:--");
        dispatch(setIsLoading(true));
      },
      onpause: () => {
        requestAnimationFrame(seek);
        dispatch(play(false));
      },
      onseek: () => {
        requestAnimationFrame(seek);
      },
      onplay: () => {
        requestAnimationFrame(seek);
        dispatch(play(true));
        dispatch(setIsLoading(false));
      },
      onend: handleNext,
    });

    const seek = () => {
      const s = sound.seek();
      setProgress(s);
      if (sound.playing()) {
        requestAnimationFrame(seek);
      }
    };

    navigator.mediaSession.setActionHandler("play", () => sound.play());
    navigator.mediaSession.setActionHandler("pause", () => sound.pause());
    navigator.mediaSession.setActionHandler("nexttrack", handleNext);
    navigator.mediaSession.setActionHandler("previoustrack", handlePrev);
    navigator.mediaSession.setActionHandler(
      "seekto",
      (seek: MediaSessionActionDetails) => sound.seek(seek.seekTime)
    );
    sound.play();
    dispatch(setPlayer(sound));
    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("seekto", null);
      sound.stop();
      sound.off();
    };
  }, [
    dispatch,
    currentIndex,
    playlist,
    handleMediaSession,
    handleNext,
    isLoop,
    handlePrev,
  ]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.share({
        title: `${playlist[currentIndex].title} - ${playlist[currentIndex].artist}`,
        text: `${playlist[currentIndex].title} - ${playlist[currentIndex].artist}`,
        url: window.location.origin,
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentIndex, playlist]);

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
        <div className="items-center fade-in flex space-x-2 w-[16.5rem]   px-2.5">
          <div className=" h-11 w-11 overflow-hidden rounded-xl">
           
              <img
                src={playlist[currentIndex].cover}
                alt="Image"
                className="object-cover w-[100%] h-[100%] "
              />
           
          </div>
          <div className="flex flex-col text-start">
            <span className=" text-sm truncate w-48 font-semibold">
              {playlist[currentIndex].title}
            </span>
            <span className=" text-xs w-32 truncate">
              {playlist[currentIndex].artist}
            </span>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className=" h-[96dvh]  bg-zinc-900/70 backdrop-blur-md">
        <div className="flex flex-col justify-start pt-2  h-full">
          <DrawerHeader>
            <div className="overflow-hidden h-[48dvh] w-[90vw] rounded-2xl mx-1 ">
             <AspectRatio>
                <img
                  
                  src={playlist[currentIndex].cover}
                  alt="Image"
                  className="object-cover rounded-2xl w-[100%] h-[100%]"
                />
             </AspectRatio>
            </div>
            <div className=" absolute bottom-[35.5vh] w-full text-start px-2 ">
              <h1 className=" text-3xl truncate  w-80 font-semibold">
                {" "}
                {playlist[currentIndex].title}
              </h1>
              <p className=" text-base truncate w-64 text-red-500">
                {" "}
                {playlist[currentIndex].artist}
              </p>
            </div>
          </DrawerHeader>
          <div className="flex  absolute bottom-[26vh]  w-full flex-col justify-center px-6 pt-1 ">
            <input
              type="range"
              value={progress}
              max={duration}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                music?.seek(parseInt(e.target.value))
              }
              className="w-full h-2 bg-gray-200 overflow-hidden rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex text-sm justify-between py-2 px-1">
              <span>{formatDuration(progress as "--:--")}</span>
              <span>{formatDuration(duration as "--:--")}</span>
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
                <Link to={`library/${playingPlaylistUrl}`}>
                  <DrawerClose>
                    <MdOpenInNew className="h-6 w-6" />
                  </DrawerClose>
                </Link>
              ) : (
                <MdOpenInNew className="h-6 w-6 text-zinc-700" />
              )}

              <IoIosRadio className="h-7 w-7" />
              <FiShare className="h-6 w-6" onClick={handleShare} />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
const AudioPLayer = React.memo(AudioPLayerComp)
export default AudioPLayer;
