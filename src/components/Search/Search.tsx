/* demo 1.1.0 */
import { Input } from "@/components/ui/input";
import Header from "../Header/Header";
import { useQuery } from "react-query";
import axios from "axios";
import { queryApi } from "@/API/api";
import { songs, trending } from "@/Interface";
import Loader from "../Loaders/Loader";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import { setSearch } from "@/Store/Player";
import {
  DATABASE_ID,
  TRENDING_COLLECTION_ID,
  db,
} from "@/appwrite/appwriteConfig";
import { Skeleton } from "../ui/skeleton";
import SearchSong from "./SearchSong";

function SearchComp() {
  const searchQuery = useSelector(
    (state: RootState) => state.musicReducer.search
  );
  const dispatch = useDispatch();
  const s = useRef<HTMLInputElement>(null);

  const trending = async () => {
    const q = await db.listDocuments(DATABASE_ID, TRENDING_COLLECTION_ID);
    return q.documents as unknown as trending[];
  };

  const query = async () => {
    if (searchQuery.length > 0) {
      const q = await axios.get(`${queryApi}${searchQuery}`);
      return q.data as songs[];
    } else {
      return [];
    }
  };
  const {
    data: music,
    isLoading,
    refetch,
  } = useQuery<songs[]>(["search", searchQuery], query, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60000,
    refetchOnMount: false,
  });
  const { data: trend, isLoading: isTrend } = useQuery<trending[]>(
    "trending",
    trending,
    {
      refetchOnWindowFocus: false,
      staleTime: 10000,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    if (s.current) {
      s.current.value = searchQuery;
    }
  }, [searchQuery]);
  const search = useCallback(() => {
    s.current?.value.trim() == "" && dispatch(setSearch(""));
    const q = setTimeout(() => {
      if (s.current?.value) {
        s.current.value.length > 1 &&
          (refetch(), dispatch(setSearch(s.current?.value || "")));
      }
    }, 1100);
    return () => clearTimeout(q);
  }, [refetch, dispatch]);

  return (
    <>
      <Header title="Search" />
      <div className="flex flex-col fade-in items-center space-x-1 px-4">
        <Input
          ref={s}
          type="text"
          onChange={search}
          placeholder="Search"
          className=" shadow-none rounded-lg"
        />
        <div className="flex flex-col  text-start w-full py-2">
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Loader />
            </div>
          )}

          {searchQuery.length == 0 && (
            <>
              <h3 className="text-xs text-zinc-500 pt-2 pb-1 ">Trending now</h3>
              {isTrend && (
                <div className="flex flex-col space-y-2.5  py-2.5">
                  <Skeleton className="w-[90vw] h-[.7rem]  rounded-md bg-zinc-500" />
                  <Skeleton className="w-[90vw] h-[.7rem]  rounded-md bg-zinc-500" />
                  <Skeleton className="w-[70vw] h-[.7rem]  rounded-md bg-zinc-500" />
                </div>
              )}
              {trend &&
                trend.map((trend) => (
                  <div
                    key={trend.song}
                    className="flex fade-in flex-col text-sm py-1 capitalize text-zinc-300"
                    onClick={() => {
                      s.current && (s.current.value = trend.song);
                      search();
                    }}
                  >
                    <span>{trend.song}</span>
                    <div className=" h-[.05rem] w-full bg-white/30 mt-3"></div>
                  </div>
                ))}
            </>
          )}
          {music && !isLoading && searchQuery.length > 0 && (
            <div className="h-[63vh] overflow-auto">
              {music.map((r) => (
                <SearchSong
                  audio={r.audio}
                  id={r.id}
                  key={r.id}
                  title={r.title}
                  artist={r.artist}
                  cover={r.cover}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
const Search = React.memo(SearchComp);
export default Search;
