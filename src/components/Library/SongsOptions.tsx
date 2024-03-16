import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { PiQueue } from "react-icons/pi";
import { useCallback } from "react";
import { playlistSongs, savedPlaylist } from "@/Interface";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "@/Store/Player";
import { RootState } from "@/Store/Store";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoAddSharp } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_TO_LIBRARY,
  DATABASE_ID,
  ID,
  LIKE_SONG,
  PLAYLIST_COLLECTION_ID,
  db,
} from "@/appwrite/appwriteConfig";
import { Query } from "appwrite";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../Loaders/Loader";

function SongsOptions({
  library,
  underline,
  music,
  like,
  id,
}: {
  like?: boolean;
  id?: string;
  music: playlistSongs;
  library?: boolean;
  underline?: boolean;
}) {
  const dispatch = useDispatch();
  const q = useQueryClient();
  const playlist = useSelector(
    (state: RootState) => state.musicReducer.playlist
  );
  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );
  const handleQueue = useCallback(() => {
    console.log(playlist.length);
    const newPlaylist = [...playlist];
    newPlaylist.splice(currentIndex + 1, 0, music);
    dispatch(setPlaylist(newPlaylist));
    console.log(playlist.length);
  }, [music, dispatch, playlist, currentIndex]);

  const handleAdd = useCallback(
    (playlistId: string, show?: boolean) => {
      if (localStorage.getItem("uid")) {
        db.createDocument(DATABASE_ID, ADD_TO_LIBRARY, ID.unique(), {
          for: localStorage.getItem("uid"),
          youtubeId: music.youtubeId,
          artists: [music.artists[0].id, music.artists[0].name],
          title: music.title,
          thumbnailUrl: music.thumbnailUrl,
          playlistId: playlistId,
        }).then(() => {
          if (show) return;
        });
      }
    },
    [music]
  );

  const handleLibrary = useCallback(async () => {
    if (localStorage.getItem("uid")) {
      db.createDocument(DATABASE_ID, PLAYLIST_COLLECTION_ID, ID.unique(), {
        name: music.title,
        creator: music.artists[0].name || "unknown",
        link: "custom" + uuidv4(),
        image: music.thumbnailUrl,
        for: localStorage.getItem("uid"),
      }).then((d) => {
        handleAdd(d.$id);
        alert("Added to new Library");
      });
    }
  }, [music, handleAdd]);
  const loadSavedPlaylist = async () => {
    const r = await db.listDocuments(DATABASE_ID, PLAYLIST_COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
      Query.notEqual("$id", [id?.replace("custom", "") || ""]),
      Query.startsWith("link", "custom"),
      Query.equal("for", [localStorage.getItem("uid") || "default"]),
      Query.limit(999),
    ]);
    const p = r.documents as unknown as savedPlaylist[];
    return p;
  };
  const { data, isLoading, refetch } = useQuery(
    "savedPlaylistToAdd",
    loadSavedPlaylist,
    {
      refetchOnWindowFocus: false,
      enabled: false,
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );

  const handlePlaylist = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const handleDelete = useCallback(async () => {
    const ok = confirm("Are you sure you want to delete");
    if (ok) {
      if (like) {
        await db.deleteDocument(DATABASE_ID, LIKE_SONG, music.$id || "");
        q.fetchQuery<playlistSongs[]>(["likedSongsDetails", id]);
      } else {
        await db.deleteDocument(DATABASE_ID, ADD_TO_LIBRARY, music.$id || "");
        q.fetchQuery<playlistSongs[]>(["playlist", id]);
      }
    }
  }, [q, music, id, like]);

  const uid = useSelector((state: RootState) => state.musicReducer.uid);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="m-0 p-0">
        <BiDotsHorizontalRounded className="h-6 w-6 text-white" />
        {!underline && (
          <div className="h-[.05rem] w-[8vw] bg-zinc-300/10 mt-[1.1rem] -ml-2"></div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-400/10 border-none rounded-lg backdrop-blur-2xl mx-4 -mt-5">
        <DropdownMenuItem
          onClick={handleLibrary}
          className="flex items-center justify-between space-x-2"
        >
          <p className="text-base">Add to library</p>
          <IoAddSharp className="h-5 w-5" />
        </DropdownMenuItem>

        <div className="h-[.05rem] w-full bg-zinc-300/10 "></div>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            onClick={handlePlaylist}
            className="flex items-center justify-between space-x-2"
          >
            <p className="text-base">Add to a Playlist...</p>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="bg-zinc-400/10 border-none rounded-lg backdrop-blur-2xl  mr-2">
              {isLoading && (
                <div className="py-5 flex justify-center items-center">
                  <Loader loading={true} />
                </div>
              )}
              {data && data.length > 0 ? (
                data.map((d, i) => (
                  <div key={d.$id}>
                    {i !== 0 && (
                      <div className="h-[.05rem] w-full bg-zinc-300/10 "></div>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleAdd(d.$id || "null", true)}
                    >
                      <p className="truncate w-[9rem]">{d.creator}</p>
                    </DropdownMenuItem>
                  </div>
                ))
              ) : (
                <>
                  {!isLoading && (
                    <DropdownMenuItem>no playlist found</DropdownMenuItem>
                  )}
                </>
              )}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <div className="h-[.05rem] w-full bg-zinc-300/10 "></div>
        <DropdownMenuItem
          onClick={handleQueue}
          className="flex items-center justify-between space-x-2"
        >
          <p className="text-base">Add to queue</p>
          <PiQueue className="h-5 w-5" />
        </DropdownMenuItem>

        {library && uid && music.for == uid && (
          <>
            <div className="h-[.05rem] w-full bg-zinc-300/10 "></div>
            <DropdownMenuItem
              onClick={handleDelete}
              className="flex items-center -mb-0.5 -mt-0.5 justify-between space-x-2"
            >
              <p className="text-base">Remove</p>
              <IoIosRemoveCircleOutline className="h-5 w-5" />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SongsOptions;
