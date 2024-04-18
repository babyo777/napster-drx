import Share from "@/HandleShare/Share";
import { savedPlaylist } from "@/Interface";
import {
  DATABASE_ID,
  NEW_USER,
  PLAYLIST_COLLECTION_ID,
  db,
} from "@/appwrite/appwriteConfig";
import GoBack from "@/components/Goback";
import SavedLibraryCard from "@/components/Library/SavedLibraryCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Query, Models } from "appwrite";
import { GiPin } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
interface User extends Models.Document {
  name: string;
  image: string;
  notify: string;
}
function User() {
  const { id } = useParams();
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
  const loadSavedPlaylist = async () => {
    const r = await db.listDocuments(DATABASE_ID, PLAYLIST_COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
      Query.equal("for", [localStorage.getItem("uid") || "default"]),
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
  return (
    <>
      <GoBack />
      <div className="absolute top-4 z-10 right-3  flex-col space-y-0.5">
        <Share />
      </div>
      <div className="w-full flex justify-start items-center px-5 pt-16">
        <div className=" flex flex-col items-start space-y-1.5 justify-start text-start">
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
              <h1 className=" truncate animate-fade-right max-w-[80dvw] px-1  font-medium text-2xl">
                {user ? user[0]?.name : ""}
              </h1>
            )}
          </div>
        </div>
      </div>
      {user && (
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
                  <p className="w-[59vw] fade-in font-semibold text-xl truncate">
                    Send Tracks to {(user && user[0]?.name) || ""}
                  </p>
                  <div className="flex  text-zinc-400 items-center space-x-1">
                    <GiPin className="h-3 text-white w-3" />
                    <p className="text-xs w-[50vw]truncate">TuneBox</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {isLoading ? (
        <div></div>
      ) : (
        <>
          <h2 className="px-5 mb-2.5 animate-fade-right font-medium leading-tight text-xl">
            Playlists
          </h2>
          <div className="flex fade-in flex-col px-5">
            <div className=" space-y-3">
              {savedPlaylist &&
                savedPlaylist.map((saved, id) => (
                  <SavedLibraryCard
                    key={saved.link + id}
                    id={saved.$id || ""}
                    data={saved}
                    author={saved.creator}
                    link={saved.link}
                    f={saved.for}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default User;
