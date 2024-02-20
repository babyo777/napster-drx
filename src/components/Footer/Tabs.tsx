import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosRadio } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";
import { Player } from "./Player";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import React from "react";
// import { streamApi } from "@/API/api";
// import { Howl } from "howler";
// import {
//   play,
//   setCurrentIndex,
//   setDuration,
//   setIsLoading,
//   setPlayer,
//   setProgress,
// } from "@/Store/Player";
function TabsComp() {
  // const dispatch = useDispatch();
  const playlistUrl = useSelector(
    (state: RootState) => state.musicReducer.playlistUrl
  );

  // const currentIndex = useSelector(
  //   (state: RootState) => state.musicReducer.currentIndex
  // );
  // const playlist = useSelector(
  //   (state: RootState) => state.musicReducer.playlist
  // );

  // const isLoop = useSelector((state: RootState) => state.musicReducer.isLoop);

  // const handleNext = useCallback(() => {
  //   if (playlist.length > 1) {
  //     dispatch(setCurrentIndex((currentIndex + 1) % playlist.length));
  //   }
  // }, [dispatch, currentIndex, playlist.length]);

  // const handlePrev = useCallback(() => {
  //   if (playlist.length > 1) {
  //     dispatch(
  //       setCurrentIndex((currentIndex - 1 + playlist.length) % playlist.length)
  //     );
  //   }
  // }, [dispatch, currentIndex, playlist.length]);

  // const handleMediaSession = useCallback(() => {
  //   navigator.mediaSession.metadata = new MediaMetadata({
  //     title: playlist[currentIndex].title,
  //     artist: playlist[currentIndex].artist,
  //     artwork: [
  //       {
  //         src: playlist[currentIndex].cover,
  //       },
  //     ],
  //   });
  // }, [currentIndex, playlist]);

  // useEffect(() => {
  //   if (playlist.length > 0) {
  //     const sound = new Howl({
  //       src: [
  //         `${streamApi}${playlist[currentIndex].audio.replace(
  //           "https://www.youtube.com/watch?v=",
  //           ""
  //         )}`,
  //       ],
  //       autoplay: false,
  //       loop: isLoop,
  //       html5: true,
  //       onload: () => {
  //         requestAnimationFrame(seek);
  //         dispatch(setDuration(sound.duration()));
  //         handleMediaSession();
  //         dispatch(setIsLoading(true));
  //       },
  //       onloaderror: () => {
  //         dispatch(setDuration("--:--"));
  //         dispatch(setProgress("--:--"));
  //         dispatch(setIsLoading(true));
  //       },
  //       onplayerror: () => {
  //         dispatch(setDuration("--:--"));
  //         dispatch(setProgress("--:--"));
  //         dispatch(setIsLoading(true));
  //       },
  //       onpause: () => {
  //         requestAnimationFrame(seek);
  //         dispatch(play(false));
  //       },
  //       onseek: () => {
  //         requestAnimationFrame(seek);
  //       },
  //       onplay: () => {
  //         requestAnimationFrame(seek);
  //         dispatch(play(true));
  //         dispatch(setIsLoading(false));
  //       },
  //       onend: handleNext,
  //     });

  //     const seek = () => {
  //       const s = sound.seek();
  //       dispatch(setProgress(s));
  //       if (sound.playing()) {
  //         requestAnimationFrame(seek);
  //       }
  //     };

  //     navigator.mediaSession.setActionHandler("play", () => sound.play());
  //     navigator.mediaSession.setActionHandler("pause", () => sound.pause());
  //     navigator.mediaSession.setActionHandler("nexttrack", handleNext);
  //     navigator.mediaSession.setActionHandler("previoustrack", handlePrev);
  //     navigator.mediaSession.setActionHandler(
  //       "seekto",
  //       (seek: MediaSessionActionDetails) => sound.seek(seek.seekTime)
  //     );
  //     sound.play();
  //     dispatch(setPlayer(sound));
  //     return () => {
  //       navigator.mediaSession.setActionHandler("play", null);
  //       navigator.mediaSession.setActionHandler("pause", null);
  //       navigator.mediaSession.setActionHandler("nexttrack", null);
  //       navigator.mediaSession.setActionHandler("previoustrack", null);
  //       navigator.mediaSession.setActionHandler("seekto", null);
  //       sound.stop();
  //       sound.off();
  //     };
  //   }
  // }, [
  //   dispatch,
  //   currentIndex,
  //   playlist,
  //   handleMediaSession,
  //   handleNext,
  //   isLoop,
  //   handlePrev,
  // ]);

  return (
    <div className="fixed  w-full left-0 bottom-0 flex flex-col justify-center items-center">
      <Player />
      <nav className="py-3 pb-6  backdrop-blur-md bg-zinc-950/70 w-full">
        <ul className="flex items-center text-zinc-500 space-x-12 justify-center">
          <li>
            <NavLink
              to={""}
              className={({ isActive }) =>
                `${isActive && "text-zinc-300"} flex flex-col  items-center`
              }
            >
              <FaRegCirclePlay className="h-6 w-6" />
              <span className="text-xs mt-1">Listen now</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/share-play"}
              className={({ isActive }) =>
                `${isActive && "text-zinc-300"} flex flex-col mb-1 items-center`
              }
            >
              <IoIosRadio className="h-7 w-7" />
              <span className="text-xs ">Share Play</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/library/${playlistUrl}`}
              className={({ isActive }) =>
                `${isActive && "text-zinc-300"} flex flex-col mb-1 items-center`
              }
            >
              <MdLibraryMusic className="h-7 w-7" />
              <span className="text-xs ">Library</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/search"}
              className={({ isActive }) =>
                `${isActive && "text-zinc-300"} flex flex-col mb-1 items-center`
              }
            >
              <IoSearch className="h-7 w-7 " />
              <span className="text-xs ">Search</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

const Tabs = React.memo(TabsComp);
export default Tabs;
