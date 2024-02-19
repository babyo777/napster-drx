import Header from "../Header/Header";
import SavedLibraryCard from "./SavedLibraryCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylistUrl, setSavedPlaylist } from "@/Store/Player";
import { RootState } from "@/Store/Store";
import SkeletonP from "./SkeletonP";
import {
  DATABASE_ID,
  PLAYLIST_COLLECTION_ID,
  db,
} from "@/appwrite/appwriteConfig";
import { Query } from "appwrite";
import { savedPlaylist } from "@/Interface";
import { useQuery } from "react-query";

function SavedLibrary() {
  const dispatch = useDispatch();
  const savedPlaylist = useSelector(
    (state: RootState) => state.musicReducer.savedPlaylist
  );
  const loadSavedPlaylist = async () => {
    const r = await db.listDocuments(DATABASE_ID, PLAYLIST_COLLECTION_ID, [
      Query.equal("for", [localStorage.getItem("uid") || "default", "default"]),
    ]);
    const p = r.documents as unknown as savedPlaylist[];
    return p;
  };
  const { data, isLoading } = useQuery("savedPlaylist", loadSavedPlaylist, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    dispatch(setSavedPlaylist([]));
    dispatch(setPlaylistUrl(""));
    if (data) {
      dispatch(setSavedPlaylist([...data]));
    }
  }, [dispatch, data]);

  return (
    <>
      <Header title="Library" l={true} />
      {isLoading && (
        <div className="flex fade-in space-y-3  flex-col px-4">
          <SkeletonP />
          <SkeletonP />
          <SkeletonP />
          <SkeletonP />
        </div>
      )}
      <div className="flex fade-in  flex-col px-4">
        <div className="pb-36 space-y-3">
          {savedPlaylist.map((saved, id) => (
            <SavedLibraryCard
              key={saved.link + id}
              title={saved.name}
              id={saved.$id || ""}
              author={saved.creator}
              link={saved.link}
              f={saved.for}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default SavedLibrary;
