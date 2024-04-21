import Share from "@/HandleShare/Share";
import { playlistSongs, savedPlaylist } from "@/Interface";
import {
  DATABASE_ID,
  NEW_USER,
  PLAYLIST_COLLECTION_ID,
  db,
} from "@/appwrite/appwriteConfig";
// import GoBack from "@/components/Goback";
import SavedLibraryCard from "@/components/Library/SavedLibraryCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Query, Models } from "appwrite";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { prominent } from "color.js";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiTwitterXFill, RiUserUnfollowFill } from "react-icons/ri";
import socket from "@/socket";
import { GetImage, getSpotifyProfile } from "@/API/api";
import ProgressBar from "@ramonak/react-progress-bar";
import { RxCodesandboxLogo } from "react-icons/rx";
import axios from "axios";
import { IoLogoInstagram } from "react-icons/io5";
import { FaSnapchat } from "react-icons/fa";
import { BsGlobeAmericas } from "react-icons/bs";

interface User extends Models.Document {
  name: string;
  image: string;
  snap: string;
  insta: string;
  other: string;
  twitter: string;
}
function User() {
  const { id } = useParams();
  const [color, setColor] = useState<string[]>([]);
  const getUser = async () => {
    const user = await db.listDocuments(DATABASE_ID, NEW_USER, [
      Query.equal("user", [id ? id : ""]),
      Query.limit(1),
    ]);

    const res = await axios.get(
      `${getSpotifyProfile}${user.documents[0].spotifyId}`
    );
    const result = user.documents[0];
    const code: User[] = res.data;

    const modified = [
      {
        name: code[0].name,
        image: code[0].image,
        snap: result.snap,
        insta: result.insta,
        other: result.other,
        twitter: result.twitter,
      },
    ];

    return modified as User[];
  };
  const { data: user, isLoading: userLoading } = useQuery<User[]>(
    ["user", id],
    getUser,
    {
      refetchOnMount: false,
      retry: 5,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (user) {
      prominent(user[0]?.image, {
        amount: 12,
        format: "hex",
      }).then((c) => {
        setColor(c as string[]);
      });
    }
  }, [user]);
  const loadSavedPlaylist = async () => {
    const r = await db.listDocuments(DATABASE_ID, PLAYLIST_COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
      Query.equal("for", [id || ""]),
    ]);
    const p = r.documents as unknown as savedPlaylist[];
    return p;
  };
  const { data: savedPlaylist } = useQuery(
    "savedPublicPlaylists",
    loadSavedPlaylist,
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
  const [isFavArtist, setIsFavArtist] = useState<boolean>();
  const removeFromFav = useCallback(() => {
    setIsFavArtist(false);
  }, []);
  const addToFav = useCallback(() => {
    setIsFavArtist(true);
  }, []);

  const [listening, setListening] = useState<playlistSongs | null>();
  const [duration, setDuration] = useState<number>(0);
  const [Progress, setProgress] = useState<number>(0);

  useEffect(() => {
    socket.connect();
    function onConnect() {
      socket.emit("join", { id: id });
    }

    function setValue(data: playlistSongs) {
      if (data !== null) {
        setListening(data);
      }
    }

    function handleDuration(data: { id: string; duration: number }) {
      console.log("ok");

      setDuration(data.duration);
    }
    function handleProgress(data: { id: string; progress: number }) {
      setProgress(data.progress);
    }

    socket.on("connect", onConnect);
    socket.on("message", setValue);
    socket.on("duration", handleDuration);
    socket.on("progress", handleProgress);
    return () => {
      socket.disconnect();

      socket.off("progress", handleProgress);
      socket.off("duration", handleDuration);
      socket.off("message", setValue);
      socket.off("connect", onConnect);
    };
  }, [id]);

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }, []);

  const image = async () => {
    const response = await axios.get(GetImage + listening?.thumbnailUrl, {
      responseType: "arraybuffer",
    });
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    return URL.createObjectURL(blob);
  };

  const { data: c } = useQuery(["image", listening?.thumbnailUrl], image, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <>
      {/* <GoBack /> */}
      <div className="absolute top-4 z-10 right-3 animate-fade-left flex-col space-y-0.5">
        {user && user.length > 0 && (
          <>
            {isFavArtist ? (
              <RiUserUnfollowFill
                onClick={removeFromFav}
                className="h-8 w-8 hidden backdrop-blur-md mb-2 fade-in  bg-black/30 rounded-full p-1.5"
              />
            ) : (
              <AiOutlineUserAdd
                onClick={addToFav}
                className="h-8 w-8 mb-2 hidden backdrop-blur-md fade-in  bg-black/30 rounded-full p-1.5"
              />
            )}
            <Share />
          </>
        )}
      </div>
      {user && user.length > 0 && (
        <div className="absolute hidden bottom-2 z-10   left-4 animate-fade-right w-full text-xs font-semibold leading-tight tracking-tight text-zinc-500 space-y-0.5">
          <a href="https://twitter.com/tanmay11117" target="blank">
            made by @babyo7_
          </a>
        </div>
      )}
      {user && user.length > 0 && (
        <div className="absolute top-14 z-10 right-3 animate-fade-left flex-col space-y-0.5">
          <Link to={`/box/${id}`}>
            <RxCodesandboxLogo className="h-8 w-8 animate-fade-left backdrop-blur-md text-zinc-300 bg-black/30 rounded-full p-1.5" />
          </Link>
        </div>
      )}

      <div
        style={{
          backgroundImage: `linear-gradient(to top, #121212, ${color[3]}`,
        }}
        className={`w-full  flex justify-start items-center px-5 pt-[5vh] pb-4 transition-all duration-300`}
      >
        <div className=" flex  items-center space-x-1.5 justify-start text-start">
          {userLoading ? (
            <Skeleton className="h-24 w-24 object-cover rounded-full" />
          ) : (
            <div>
              <LazyLoadImage
                src={user ? user[0]?.image || "/cache.jpg" : "/cache.jpg"}
                className="h-24 w-24 animate-fade-right object-cover rounded-full"
              />
            </div>
          )}
          <div>
            {userLoading ? (
              <div></div>
            ) : (
              <>
                {user && user.length > 0 && (
                  <div className=" flex flex-col space-y-1.5">
                    <div>
                      <h1 className=" truncate -mb-1 animate-fade-right max-w-[50dvw] px-1  font-semibold text-xl">
                        {user[0]?.name || ""}
                      </h1>
                    </div>
                    {/* <div className=" animate-fade-right text-xs text-zinc-400 ml-1">
                    <p>
                      <span
                        className="text-white ml-0.5
                      "
                      >
                        1M
                      </span>{" "}
                      followers <span className="text-white ml-0.5">7</span>{" "}
                      following
                    </p>
                  </div> */}
                    <div className="flex animate-fade-right space-x-1.5 text-sm ml-1">
                      {user[0].insta && <IoLogoInstagram />}
                      {user[0].twitter && <RiTwitterXFill />}
                      {user[0].snap && <FaSnapchat />}
                      {user[0].other && <BsGlobeAmericas />}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {userLoading ? (
        <div></div>
      ) : (
        <>
          {savedPlaylist && savedPlaylist.length > 0 && (
            <h2 className="px-5 mt-6 mb-2.5 animate-fade-right font-semibold leading-tight text-lg">
              Library
            </h2>
          )}
          <div className="flex fade-in flex-col px-5">
            <div className=" space-y-3">
              {savedPlaylist &&
                savedPlaylist
                  .slice(0, 4)
                  .map((saved, id) => (
                    <SavedLibraryCard
                      className
                      key={saved.link + id}
                      id={saved.$id || ""}
                      data={saved}
                      author={saved.creator}
                      link={saved.link}
                      f={saved.for}
                    />
                  ))}
            </div>
            {savedPlaylist && savedPlaylist.length > 0 && (
              <div className="w-full flex justify-center items-center font-normal">
                <Link to={`/playlists/${id}`}>
                  <Button
                    variant={"outline"}
                    className=" animate-fade-right mt-4 text-xs font-normal rounded-full"
                  >
                    See all Playlists
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
      {user && listening && (
        <h2 className="px-5 mt-1 mb-2.5 animate-fade-right font-semibold leading-tight text-lg">
          Listening
        </h2>
      )}
      {user && listening ? (
        <div className="flex bg-zinc-100/5 space-x-2  overflow-hidden mb-3 animate-fade-right items-center justify-between  px-2.5 py-2.5 mx-3.5 rounded-xl">
          <div className="flex w-full animate-fade-right items-center space-x-2">
            <Link
              to={`/track/${
                listening.youtubeId &&
                listening.youtubeId?.replace(
                  "https://occasional-clara-babyo777.koyeb.app/?url=https://soundcloud.com/",
                  ""
                )
              }`}
            >
              <div className="overflow-hidden h-16  w-16 ">
                <AspectRatio ratio={1 / 1}>
                  <LazyLoadImage
                    height="100%"
                    width="100%"
                    effect="blur"
                    src={c ? c : "/cache.jpg"}
                    alt="Image"
                    className="rounded-md object-cover w-[100%] h-[100%]"
                  />
                </AspectRatio>
              </div>
            </Link>
            <div
              style={{ color: "white" }}
              className="flex flex-col w-full  text-xl text-start"
            >
              <Link
                to={`/track/${
                  listening.youtubeId &&
                  listening?.youtubeId.replace(
                    "https://occasional-clara-babyo777.koyeb.app/?url=https://soundcloud.com/",
                    ""
                  )
                }`}
              >
                <p className="w-[69dvw] leading-tight  fade-in font-semibold text-lg truncate">
                  {listening?.title || "Unknown"}
                </p>
              </Link>
              <div
                style={{ color: "white" }}
                className="flex  items-center space-x-1"
              >
                <Link
                  to={`/artist/${
                    listening.artists && listening.artists[0]?.id
                  }`}
                >
                  <p className="text-xs  leading-tight truncate  max-w-[65vw]  font-normal  text-zinc-200">
                    {(listening.artists && listening.artists[0]?.name) ||
                      "Unknown"}
                  </p>
                </Link>
              </div>
              <div
                style={{ color: "white" }}
                className="flex  items-center space-x-1"
              >
                <div className=" flex w-full">
                  <p className=" flex items-center w-full -mb-0.5 justify-between text-xs">
                    <span>{formatDuration(Progress || 0)}</span>
                    <span>{formatDuration(duration || 0)}</span>
                  </p>
                </div>
              </div>
              <div className="w-full ">
                <ProgressBar
                  className=" mt-1.5 w-full rounded-md border-none "
                  height="2.4px"
                  animateOnRender={false}
                  transitionDuration="0"
                  isLabelVisible={false}
                  bgColor={"#dcb48c" || color[8]}
                  maxCompleted={duration}
                  completed={Progress}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {user && user.length > 0 && (
            <h2 className="px-5 mt-4 mb-2.5 animate-fade-right font-semibold leading-tight text-lg">
              {user && user[0].name} is currently offline.
            </h2>
          )}
        </>
      )}
    </>
  );
}

export default User;
