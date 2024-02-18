import Songs from "./Songs";
import { Button } from "../ui/button";
import { FaPlay } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import { FaShare } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { songs } from "@/Interface";
import Loader from "../Loaders/Loader";
import { infoApi } from "@/API/api";
import { useDispatch, useSelector } from "react-redux";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  isLoop,
  play,
  setCurrentIndex,
  setPlayingPlaylistUrl,
  setPlaylist,
  setPlaylistUrl,
} from "@/Store/Player";
import React, { useCallback, useEffect } from "react";
import { RootState } from "@/Store/Store";
import AddLibrary from "./AddLibrary";
function LibraryComp() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const playlistUrl = useSelector(
    (state: RootState) => state.musicReducer.playlistUrl
  );
  const getPlaylist = async () => {
    const list = await axios.get(`${infoApi}${id}`);
    return list.data as songs[];
  };

  const isPlaying = useSelector(
    (state: RootState) => state.musicReducer.isPlaying
  );
  const { data, isLoading, isError, refetch, isRefetching } = useQuery<songs[]>(
    ["playlist", id],
    getPlaylist,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 60 * 60000,
    }
  );

  useEffect(() => {
    if (id && id !== playlistUrl) {
      dispatch(setPlaylistUrl(id));
    }
  }, [dispatch, id, playlistUrl]);

  const handlePlay = useCallback(() => {
    if (data) {
      dispatch(setPlaylist(data));
      dispatch(setCurrentIndex(0));
      dispatch(setPlayingPlaylistUrl(id || ""));
      dispatch(isLoop(false));
      if (!isPlaying) {
        dispatch(play(true));
      }
    }
  }, [dispatch, data, isPlaying, id]);

  return (
    <div className=" flex flex-col items-center">
      {isError && (
        <div className=" relative  w-full">
          <div className="fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            No playlist found
          </div>
          <NavLink to={"/library/"}>
            <IoIosArrowBack className="h-7 w-7  my-5 mx-4  backdrop-blur-md text-black bg-white/70 rounded-full p-1" />
          </NavLink>
        </div>
      )}
      {isRefetching && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader color="red" />
        </div>
      )}
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      )}
      {data && (
        <>
          <div className="flex w-full h-72  relative ">
            <div className=" absolute top-4 z-10 left-3">
              <NavLink to={"/library/"}>
                <IoIosArrowBack className="h-7 w-7  backdrop-blur-md text-white bg-black/30 rounded-full p-1" />
              </NavLink>
            </div>

            <div className=" absolute top-4 z-10 right-3">
              <IoReload
                onClick={() => refetch()}
                className="h-7 w-7  backdrop-blur-md text-white bg-black/30 rounded-full p-1"
              />
            </div>
            <div className=" absolute top-14 z-10 right-3">
              <AddLibrary clone={true} id={id} />
            </div>

            <img
              width="100%"
              height="100%"
              src={data[0].cover}
              alt="Image"
              loading="lazy"
              className="object-cover  h-[100%] w-[100%]"
            />

            <div className=" absolute bottom-3 px-4 left-0 right-0">
              <h1 className="text-center font-semibold py-2 text-2xl capitalize">
                Music
              </h1>
              <div className="flex space-x-4 py-1 justify-center items-center w-full">
                <Button
                  onClick={handlePlay}
                  type="button"
                  variant={"ghost"}
                  className="text-base py-5 text-zinc-100 shadow-none bg-white/20 backdrop-blur-md rounded-lg px-14"
                >
                  <FaPlay className="mr-2" />
                  Play
                </Button>
                <Button
                  type="button"
                  variant={"ghost"}
                  className="text-base py-5 text-zinc-100 shadow-none bg-white/20 backdrop-blur-md rounded-lg px-14"
                >
                  <FaShare className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
          <div className="py-3 pb-[9.5rem]">
            {data.map((data, i) => (
              <Songs
                p={id || ""}
                audio={data.audio}
                key={data.audio + i}
                id={i}
                title={data.title}
                artist={data.artist}
                cover={data.cover}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
const Library = React.memo(LibraryComp);
export default Library;
