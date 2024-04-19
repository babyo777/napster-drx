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
import { GiPin } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { prominent } from "color.js";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiUserUnfollowFill } from "react-icons/ri";
import socket from "@/socket";
import { GetImage } from "@/API/api";
import ProgressBar from "@ramonak/react-progress-bar";

interface User extends Models.Document {
  name: string;
  image: string;
  notify: string;
}
function User() {
  const { id } = useParams();
  const [color, setColor] = useState<string[]>([]);
  const getUser = async () => {
    const user = await db.listDocuments(DATABASE_ID, NEW_USER, [
      Query.equal("user", [id ? id : ""]),
      Query.limit(1),
    ]);

    return user.documents as User[];
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
  const { data: savedPlaylist, isLoading } = useQuery(
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

  const [listening, setListening] = useState<playlistSongs>();
  const [color2, setColor2] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [Progress, setProgress] = useState<number>(0);

  useEffect(() => {
    socket.connect();
    function onConnect() {
      socket.emit("join", { id: id });
    }

    function setValue(data: playlistSongs) {
      if (data !== null) {
        console.log(data);
        setListening(data);
        prominent(GetImage + data.thumbnailUrl, {
          amount: 50,
          format: "hex",
        }).then((c) => {
          setColor2(c as string[]);
        });
      }
    }

    function handleDuration(data: { id: string; duration: number }) {
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

  return (
    <>
      {user && user.length > 0 ? (
        <>
          {/* <GoBack /> */}
          <div className="absolute top-4 z-10 right-3 animate-fade-left flex-col space-y-0.5">
            {isFavArtist ? (
              <RiUserUnfollowFill
                onClick={removeFromFav}
                className="h-8 w-8  backdrop-blur-md mb-2 fade-in  bg-black/30 rounded-full p-1.5"
              />
            ) : (
              <AiOutlineUserAdd
                onClick={addToFav}
                className="h-8 w-8 mb-2 backdrop-blur-md fade-in  bg-black/30 rounded-full p-1.5"
              />
            )}
            <Share />
          </div>
          <div
            style={{
              backgroundImage: `linear-gradient(to top, #121212, ${color[3]}`,
            }}
            className={`w-full  flex justify-start items-center px-5 pt-[5vh] pb-0.5 transition-all duration-300`}
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
                    <div className=" flex flex-col space-y-1.5">
                      <div>
                        <h1 className=" truncate -mb-1 animate-fade-right max-w-[50dvw] px-1  font-semibold text-xl">
                          {user ? user[0]?.name : ""}
                        </h1>
                      </div>
                      <div className=" animate-fade-right text-xs text-zinc-400 ml-1">
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
                      </div>
                      {/* <div className="flex space-x-1.5 text-sm ml-1">
                    <IoLogoInstagram />
                    <RiTwitterXFill />
                    <FaSnapchat />
                    <BsGlobeAmericas />
                  </div> */}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {user && (
            <>
              {savedPlaylist && savedPlaylist.length > 0 && (
                <h2 className="px-5 -mb-2 mt-4 animate-fade-right font-semibold leading-tight text-lg">
                  Tunebox
                </h2>
              )}
              <div className="pt-4">
                <Link to={`/box/${id}`}>
                  <div className="flex space-x-2 px-5 mb-3 animate-fade-right items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="overflow-hidden h-14  w-14 ">
                        <AspectRatio ratio={1 / 1}>
                          <LazyLoadImage
                            height="100%"
                            width="100%"
                            effect="blur"
                            src="/tunebox.jpg"
                            alt="Image"
                            className="rounded-md object-cover w-[100%] h-[100%]"
                          />
                        </AspectRatio>
                      </div>
                      <div className="flex flex-col  text-xl text-start">
                        <p className="w-[59vw] fade-in font-medium text-base truncate">
                          Send Tracks to {(user && user[0]?.name) || ""}
                        </p>
                        <div className="flex  text-zinc-400 items-center space-x-1">
                          <GiPin className="h-3 text-white w-3" />
                          <p className="text-xs w-[50vw]truncate">Showcase</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          )}

          {isLoading ? (
            <div></div>
          ) : (
            <>
              {savedPlaylist && savedPlaylist.length > 0 && (
                <h2 className="px-5 -mt-0.5 mb-2.5 animate-fade-right font-semibold leading-tight text-lg">
                  Playlists
                </h2>
              )}
              <div className="flex fade-in flex-col px-5">
                <div className=" space-y-3">
                  {savedPlaylist &&
                    savedPlaylist
                      .slice(0, 3)
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
                {savedPlaylist && savedPlaylist.length > 3 && (
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
          {user && listening && (
            <div
              style={{
                backgroundImage: `linear-gradient(to bottom, ${color2[21]}, ${color2[21]}`,
              }}
              className="flex space-x-2  overflow-hidden mb-3 animate-fade-right items-center justify-between  px-2.5 py-2.5 mx-3.5 rounded-xl"
            >
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
                        src={GetImage + listening.thumbnailUrl || "/cache.jpg"}
                        alt="Image"
                        className="rounded-md object-cover w-[100%] h-[100%]"
                      />
                    </AspectRatio>
                  </div>
                </Link>
                <div
                  style={{ color: color2[48] }}
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
                    <p className="w-[69dvw]  fade-in font-semibold text-xl truncate">
                      {listening?.title || "Unknown"}
                    </p>
                  </Link>
                  <div
                    style={{ color: color2[48] }}
                    className="flex  items-center space-x-1"
                  >
                    <Link
                      to={`/artist/${
                        listening.artists && listening.artists[0]?.id
                      }`}
                    >
                      <p className="text-xs -mt-0.5  w-[50vw]truncate font-medium">
                        {(listening.artists && listening.artists[0]?.name) ||
                          "Unknown"}
                      </p>
                    </Link>
                  </div>
                  <div
                    style={{ color: color2[48] }}
                    className="flex  items-center space-x-1"
                  >
                    <p className="text-xs -mt-0.5  w-[50vw]truncate font-medium">
                      on napster
                    </p>
                  </div>
                  <div className="w-full ">
                    <ProgressBar
                      className=" mt-1.5 w-full rounded-md border-none "
                      height="2px"
                      isLabelVisible={false}
                      bgColor={color2[40]}
                      maxCompleted={duration}
                      completed={Progress}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex text-start text-base px-7 h-screen justify-center items-center">
          <p>
            No user found !{" "}
            <Link
              to={"/search"}
              className=" underline underline-offset-2 text-red-500"
            >
              Search
            </Link>{" "}
          </p>
        </div>
      )}
    </>
  );
}

export default User;
