import { LazyLoadImage } from "react-lazy-load-image-component";
import { Input } from "../ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { useCallback, useRef, useState } from "react";
import axios from "axios";
import { playlistSongs } from "@/Interface";
import { SearchApi } from "@/API/api";
import { useQuery } from "react-query";
import Loader from "../Loaders/Loader";
import TuneSong from "./tuneSong";
import { Link, useParams } from "react-router-dom";
import { DATABASE_ID, NEW_USER, db } from "@/appwrite/appwriteConfig";
import { Models, Query } from "appwrite";
interface User extends Models.Document {
  name: string;
  image: string;
}
function Box() {
  const searchQuery = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const [data, setData] = useState<playlistSongs[]>();
  const query = async () => {
    const query = searchQuery.current;
    if (query && query.value.length > 0) {
      const q = await axios.get(`${SearchApi}${searchQuery.current.value}`);
      setData(q.data);
      return q.data as playlistSongs[];
    } else {
      return [];
    }
  };

  const { isLoading, refetch } = useQuery<playlistSongs[]>(
    ["searchSong", searchQuery.current?.value],
    query,
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleChange = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.src = "";
    }
    const t = setTimeout(() => {
      if (searchQuery.current && searchQuery.current.value.length > 0) {
        setData([]);
        refetch();
      } else {
        setData([]);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [refetch]);

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

  return (
    <div className=" max-md:px-4 py-11 flex px-[35dvw] flex-col justify-center space-y-1.5 items-center">
      <audio src="" hidden ref={audioRef} autoPlay></audio>
      {userLoading && !data ? (
        <div className=" h-dvh flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {user && user[0] ? (
            <>
              <div className=" absolute top-2.5 animate-fade-right left-2.5 text-xs  text-zinc-400 font-semibold">
                <Link
                  to={`${window.location.origin}/tunebox/${localStorage.getItem(
                    "uid"
                  )}`}
                >
                  Get Your Own
                </Link>
              </div>
              <LazyLoadImage
                src={user[0].image || "/cache.jpg"}
                className=" rounded-full animate-fade-down object-cover object-center h-28 w-28"
              />
              <div className="animate-fade-down">
                <p className="text-base text-center font-semibold -mb-1.5 text-zinc-300 truncate w-[50dvw]">
                  {user[0].name}
                </p>
              </div>
              <div className="animate-fade-down pb-1 text-2xl text-center font-semibold">
                <h2>Send me anonymous tracks!</h2>
              </div>

              <div className="flex w-full  -space-x-2 animate-fade-up">
                <div className="border rounded-lg rounded-r-none border-r-0 px-2 border-zinc-800">
                  <IoSearchOutline className=" text-white   eft-6 mt-2 h-5 w-5" />
                </div>
                <Input
                  type="text"
                  ref={searchQuery}
                  onChange={handleChange}
                  placeholder="Search track and send"
                  className="  px-2 relative  shadow-none rounded-lg rounded-l-none border-l-0 "
                />
              </div>
              <div key={user[0].$id}>
                {isLoading && (
                  <div className=" h-[60dvh] flex items-center justify-center">
                    <Loader />
                  </div>
                )}
                {data &&
                  !isLoading &&
                  data.length > 0 &&
                  data
                    .slice(0, 7)
                    .map((item) => (
                      <TuneSong
                        audioRef={audioRef}
                        key={item.youtubeId + item.thumbnailUrl}
                        item={item}
                      />
                    ))}
              </div>
            </>
          ) : (
            <div className=" h-dvh flex items-center justify-center">
              <p>
                Sorry, this page isn't available.{" "}
                <Link to={"/"} className="underline text-red-500">
                  Go back
                </Link>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Box;
