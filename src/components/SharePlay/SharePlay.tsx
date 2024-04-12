import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import ShareLyrics from "../Footer/Share";
import { LiaDownloadSolid } from "react-icons/lia";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DATABASE_ID,
  FAV_ARTIST,
  LIKE_SONG,
  db,
} from "@/appwrite/appwriteConfig";
import { ID, Query } from "appwrite";
import { ArtistDetails, favArtist } from "@/Interface";
import { useQuery } from "react-query";
import { GetArtistDetails, downloadApi } from "@/API/api";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import {
  SetQueue,
  setCurrentIndex,
  setNextPrev,
  setPlaylist,
} from "@/Store/Player";
import { useDoubleTap } from "use-double-tap";
import { Link } from "react-router-dom";
import { LuMusic2 } from "react-icons/lu";
import { Skeleton } from "../ui/skeleton";
import Lottie from "lottie-react";
import musicData from "../../assets/music.json";
import likeData from "../../assets/like.json";
import { GoMute, GoUnmute } from "react-icons/go";

function SharePlay() {
  const playlist = useSelector((state: RootState) => state.musicReducer.Feed);
  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );
  const [isFavArtist, setIsFavArtist] = useState<boolean>();

  const loadIsFav = async () => {
    const r = await db.listDocuments(DATABASE_ID, FAV_ARTIST, [
      Query.equal("for", [localStorage.getItem("uid") || "default"]),
      Query.equal("artistId", [
        playlist[currentIndex]?.artists[0].id || "none",
      ]),
    ]);
    const p = r.documents as unknown as favArtist[];
    if (p.length == 0) {
      setIsFavArtist(false);
    } else {
      setIsFavArtist(true);
    }
    return p;
  };

  const { data: isFav, refetch: refetchFav } = useQuery<favArtist[]>(
    ["checkFavArtist", playlist[currentIndex]?.artists[0].id],
    loadIsFav,
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const removeFromFav = async () => {
    if (isFav) {
      setIsFavArtist(false);

      await db
        .deleteDocument(DATABASE_ID, FAV_ARTIST, isFav[0].$id)
        .catch(() => setIsFavArtist(false));
      refetchFav();
    }
  };

  const getArtistDetails = async () => {
    const list = await axios.get(
      `${GetArtistDetails}${playlist[currentIndex]?.artists[0].id}`
    );
    return list.data as ArtistDetails;
  };

  const { data, refetch: followRefetch } = useQuery<ArtistDetails>(
    ["artist", playlist[currentIndex]?.artists[0].id],
    getArtistDetails,
    {
      retry: 5,
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 60 * 60000,
      onSuccess(d) {
        d == null && followRefetch();
      },
    }
  );

  const addToFav = async () => {
    if (!playlist[currentIndex].artists[0].id) return;
    setIsFavArtist(true);
    await db
      .createDocument(DATABASE_ID, FAV_ARTIST, ID.unique(), {
        artistId: playlist[currentIndex]?.artists[0].id,
        name: data?.name,
        thumbnailUrl: data?.thumbnails[0].url.replace(
          "w540-h225",
          "w1080-h1080"
        ),
        for: localStorage.getItem("uid"),
      })
      .catch(() => setIsFavArtist(true));
    refetchFav();
  };

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
    ["likedSongs", playlist[currentIndex]?.youtubeId],
    isLikedCheck,
    {
      enabled: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  const [liked, SetLiked] = useState<boolean>();
  const currentArtistId = useSelector(
    (state: RootState) => state.musicReducer.currentArtistId
  );
  const [once, setOnce] = useState<boolean>();
  const handleLike = useCallback(() => {
    if (playlist.length == 0) return;
    SetLiked(true);
    setOnce(true);
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
        setOnce(false);
        SetLiked(false);
      });
  }, [currentIndex, playlist, currentArtistId, refetch]);

  const RemoveLike = useCallback(async () => {
    if (playlist.length == 0) return;
    SetLiked(false);
    setOnce(false);
    if (isLiked) {
      try {
        await db.deleteDocument(
          DATABASE_ID,
          LIKE_SONG,
          isLiked[0].$id || "default"
        );
      } catch (error) {
        setOnce(true);
        console.error(error);
        SetLiked(true);
      }
    }
  }, [isLiked, playlist]);

  useEffect(() => {
    if (playlist[currentIndex]?.artists[0].id) {
      followRefetch();
      refetch();
    }
  }, [playlist, currentIndex, followRefetch, refetch]);

  const image = async () => {
    const response = await axios.get(
      playlist[currentIndex]?.thumbnailUrl.replace("w120-h120", "w1080-h1080"),
      {
        responseType: "arraybuffer",
      }
    );
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    return URL.createObjectURL(blob);
  };

  const { data: c } = useQuery(
    ["image", playlist[currentIndex]?.thumbnailUrl],
    image,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  const handleDownload = useCallback(() => {
    if (playlist.length == 0) return;
    const link = document.createElement("a");
    link.style.display = "none";
    link.target = "_blank";
    link.href = `${downloadApi}${playlist[currentIndex].youtubeId}&file=${playlist[currentIndex].title}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [playlist, currentIndex]);

  const [next, setNext] = useState<boolean>();
  const [prev, setPrev] = useState<boolean>();

  const dispatch = useDispatch();
  const handleNext = useCallback(() => {
    setOnce(false);
    setNext(true);
    const t = setTimeout(() => {
      setNext(false);
    }, 200);
    SetLiked(false);
    if (playlist.length > 1) {
      dispatch(setNextPrev("next"));
    }
    return () => clearTimeout(t);
  }, [dispatch, playlist.length]);

  useEffect(() => {
    if (currentIndex > playlist.length) {
      dispatch(setCurrentIndex(0));
    }
  }, [dispatch, playlist, currentIndex]);
  useEffect(() => {
    dispatch(SetQueue(playlist));
    dispatch(setPlaylist(playlist));
  }, [dispatch, playlist]);
  const handlePrev = useCallback(() => {
    setOnce(false);
    setPrev(true);
    const t = setTimeout(() => {
      setPrev(false);
    }, 200);
    if (playlist.length > 1) {
      dispatch(setNextPrev("prev"));
    }
    return () => clearTimeout(t);
  }, [dispatch, playlist.length]);

  const swipeHandler = useSwipeable({
    onSwipedUp: handleNext,
    onSwipedDown: handlePrev,
  });

  const [dbClick, setDb] = useState<boolean>();

  const handleDbClick = useCallback(() => {
    setDb(true);
    if (!once) {
      if (playlist.length > 0) {
        handleLike();
      }
    }
    const t = setTimeout(() => {
      setDb(false);
    }, 1290);
    return () => clearTimeout(t);
  }, [handleLike, once, playlist]);

  const bind = useDoubleTap(handleDbClick);
  // const ref = useRef<LottieRefCurrentProps>(null);
  const [muted, setMuted] = useState<boolean>();
  const music = useSelector((state: RootState) => state.musicReducer.music);
  const isPlaying = useSelector(
    (state: RootState) => state.musicReducer.isPlaying
  );
  const handleMute = useCallback(() => {
    console.log("ok");
    if (music) {
      setMuted(!music.muted);
      music.muted = !music.muted;
    }
  }, [music]);

  return (
    <div className=" fixed w-full ">
      <div className="h-dvh pb-[19dvh] relative">
        <div className=" z-10  justify-between absolute bottom-[5.6rem] space-y-2.5 flex  items-center left-4">
          {playlist.length == 0 ? (
            <Skeleton className="w-28 bg-zinc-800 h-3 mb-2 ml-0.5" />
          ) : (
            <>
              <div className=" z-10 flex items-center animate-fade-right space-x-1">
                <div
                  onClick={handleMute}
                  className=" text-xs   bg-zinc-800/80 backdrop-blur-xl px-2.5 font-normal py-2 rounded-full"
                >
                  <p className="flex items-center  text-start  space-x-1">
                    {muted ? <GoMute /> : <GoUnmute />}
                  </p>
                </div>
                <div className=" text-xs  bg-zinc-800/80 backdrop-blur-xl px-2.5 font-normal py-1 rounded-xl">
                  <p className="flex items-center  text-start  space-x-1">
                    <LuMusic2 />
                    <span className="max-w-[47vw] truncate">
                      {playlist[currentIndex]?.title}
                    </span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {dbClick && (
          <div className=" z-10 pb-[4dvh]  absolute w-full h-full flex justify-center items-center text-9xl bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text  ">
            <Lottie animationData={likeData} className="h-56 w-56" />
          </div>
        )}
        <div className=" absolute top-4 w-full flex items-center justify-center ">
          <p className=" text-sm bg-zinc-800 rounded-xl px-4 animate-fade-down py-0.5">
            Beta
          </p>
        </div>

        <div className=" z-10 absolute text-3xl bottom-36 space-y-2.5 flex flex-col items-center right-2">
          <div className=" animate-fade-left">
            {liked ? (
              <IoMdHeart onClick={RemoveLike} className=" text-red-500" />
            ) : (
              <IoMdHeartEmpty onClick={handleLike} />
            )}
          </div>
          <div className=" animate-fade-left text-zinc-500">
            <IoAddSharp />
          </div>
          <div className=" animate-fade-left">
            <ShareLyrics className="h-6 w-6" />
          </div>
          <div onClick={handleDownload} className=" animate-fade-left">
            <LiaDownloadSolid />
          </div>
        </div>

        <div className=" absolute animate-fade-right z-10 bottom-32 left-3.5">
          <div className=" flex space-x-2 items-center">
            {playlist.length == 0 ? (
              <Skeleton className="w-11 rounded-full bg-zinc-800 h-11" />
            ) : (
              <Link to={`/artist/${data?.artistId}`}>
                <Avatar className=" h-11 w-11">
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarImage
                    src={
                      (data &&
                        data.thumbnails[0]?.url.replace(
                          "w540-h225",
                          "w1080-h1080"
                        )) ||
                      "/favicon.jpeg"
                    }
                  />
                </Avatar>
              </Link>
            )}
            <div>
              <h1 className=" flex truncate  text-lg font-semibold">
                <Link
                  to={`/artist/${data?.artistId}`}
                  className="max-w-[47dvw] truncate"
                >
                  {playlist[currentIndex]?.artists[0].name || (
                    <Skeleton className="w-28 bg-zinc-800 h-3" />
                  )}
                </Link>
                {playlist[currentIndex]?.artists[0].name && (
                  <div className="ml-1.5 flex items-center">
                    {isFavArtist ? (
                      <p
                        onClick={removeFromFav}
                        className=" border px-2 py-0.5 bg-white text-black rounded-lg text-sm   "
                      >
                        Following
                      </p>
                    ) : (
                      <p
                        onClick={addToFav}
                        className=" border px-2 py-0.5 rounded-lg text-sm   "
                      >
                        Follow
                      </p>
                    )}
                  </div>
                )}
              </h1>
              <Link to={`/artist/${data?.artistId}`}>
                <p className="  text-xs truncate w-[60dvw]">
                  {playlist[currentIndex]?.title || (
                    <Skeleton className="w-24 mt-1 bg-zinc-800 h-3" />
                  )}
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div
          {...bind}
          {...swipeHandler}
          className="max-h-full min-h-full  absolute w-full h-full px-14 flex justify-center items-center "
        >
          <div>
            {isPlaying && (
              <Lottie
                className=" animate-fade-down"
                animationData={musicData}
              />
            )}
            <LazyLoadImage
              height="100%"
              width="100%"
              src={c || playlist[currentIndex]?.thumbnailUrl}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                (e.currentTarget.src = "/newfavicon.jpg")
              }
              alt="Image"
              effect="blur"
              className={` hidden object-cover rounded-xl ${
                next && "animate-fade-up"
              }  ${
                prev && "animate-fade-down"
              }  transition-all duration-300 w-[100%] h-[100%] `}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharePlay;
