import { Input } from "@/components/ui/input";
import Header from "../Header/Header";
import { useQuery } from "react-query";
import axios from "axios";
import {
  SearchAlbum,
  SearchApi,
  SearchArtist,
  SearchPlaylistApi,
} from "@/API/api";
import {
  SearchPlaylist,
  likedSongs,
  playlistSongs,
  searchAlbumsInterface,
  suggestedArtists,
} from "@/Interface";
import Loader from "../Loaders/Loader";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import { setSearch } from "@/Store/Player";
import { DATABASE_ID, INSIGHTS, db } from "@/appwrite/appwriteConfig";
import SearchSong from "./SearchSong";
import { Query } from "appwrite";
import { ArtistSearch } from "./artistSearch";
import { MdCancel } from "react-icons/md";
import { PlaylistSearchComp } from "./playlistSearch";
import { AlbumSearchComp } from "./albumSearch";
import SkeletonP from "../Library/SkeletonP";

function SearchComp() {
  const searchQuery = useSelector(
    (state: RootState) => state.musicReducer.search
  );
  const dispatch = useDispatch();
  const s = useRef<HTMLInputElement>(null);

  const loadRecentSearch = async () => {
    const r = await db.listDocuments(DATABASE_ID, INSIGHTS, [
      Query.orderDesc("$createdAt"),
      Query.equal("for", [localStorage.getItem("uid") || ""]),
      Query.limit(7),
    ]);
    const p = r.documents as unknown as likedSongs[];
    return p;
  };
  const { data: RecentSearch, isLoading: RecentLoading } = useQuery<
    likedSongs[]
  >("recentSearch", loadRecentSearch, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const clearSearchQuery = useCallback(() => {
    dispatch(setSearch(""));
  }, [dispatch]);
  const query = async () => {
    if (searchQuery.length > 0) {
      const q = await axios.get(`${SearchApi}${searchQuery}`);
      return q.data as playlistSongs[];
    } else {
      return [];
    }
  };
  const {
    data: music,
    isLoading,
    refetch,
  } = useQuery<playlistSongs[]>(["search", searchQuery], query, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60000,
    refetchOnMount: false,
  });

  const artists = async () => {
    if (searchQuery.length > 0) {
      const q = await axios.get(`${SearchArtist}${searchQuery}`);
      return q.data as suggestedArtists[];
    } else {
      return [];
    }
  };
  const { data: artistsData, refetch: artistsRefetch } = useQuery<
    suggestedArtists[]
  >(["artistsSearch", searchQuery], artists, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60000,
    refetchOnMount: false,
  });

  const albums = async () => {
    if (searchQuery.length > 0) {
      const q = await axios.get(`${SearchAlbum}${searchQuery}`);
      return q.data as searchAlbumsInterface[];
    } else {
      return [];
    }
  };
  const { data: albumData, refetch: albumRefetch } = useQuery<
    searchAlbumsInterface[]
  >(["albumsSearch", searchQuery], albums, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60000,
    refetchOnMount: false,
  });

  const playlists = async () => {
    if (searchQuery.length > 0) {
      const q = await axios.get(`${SearchPlaylistApi}${searchQuery}`);

      return q.data as SearchPlaylist[];
    } else {
      return [];
    }
  };
  const { data: playlistsData, refetch: playlistsRefetch } = useQuery<
    SearchPlaylist[]
  >(["PlaylistSearch", searchQuery], playlists, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60000,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (s.current) {
      s.current.value = searchQuery;
    }
  }, [searchQuery]);

  const search = useCallback(
    (time: number) => {
      s.current?.value.trim() == "" && dispatch(setSearch(""));
      const q = setTimeout(() => {
        if (s.current?.value) {
          s.current.value.length > 1 &&
            (refetch(),
            artistsRefetch(),
            playlistsRefetch(),
            albumRefetch(),
            dispatch(setSearch(s.current?.value || "")));
        }
      }, time);
      return () => clearTimeout(q);
    },
    [refetch, dispatch, artistsRefetch, playlistsRefetch, albumRefetch]
  );

  return (
    <>
      <Header title="Search" />
      <div className="flex flex-col fade-in items-center space-x-1 px-4">
        <Input
          ref={s}
          type="text"
          onChange={() => search(1100)}
          placeholder="Artists, Songs, Playlists, Albums"
          className=" relative shadow-none rounded-lg"
        />
        {searchQuery.length > 0 && (
          <MdCancel
            onClick={clearSearchQuery}
            className=" absolute fade-in right-6 mt-2 h-5 w-5"
          />
        )}
        <div className="flex flex-col  text-start w-full py-2">
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Loader />
            </div>
          )}

          {RecentSearch &&
            RecentSearch.length > 0 &&
            searchQuery.length <= 0 && (
              <>
                <h3 className="text-xs fade-in text-zinc-500 pt-2 pb-1 ">
                  Recent Search Played
                </h3>
                <div className="flex fade-in flex-col -space-y-1  ">
                  {RecentSearch.map((r, i) => (
                    <SearchSong
                      fromSearch={true}
                      //@ts-expect-error:custom
                      artistId={r.artists[0]}
                      //@ts-expect-error:custom
                      artistName={r.artists[1]}
                      audio={r.youtubeId}
                      id={r.youtubeId}
                      key={r.youtubeId + i}
                      title={r.title}
                      artist={r.artists}
                      cover={r.thumbnailUrl}
                    />
                  ))}
                </div>
              </>
            )}

          {searchQuery.length == 0 && (
            <>
              {RecentLoading && (
                <div className="flex fade-in flex-col space-y-1 ">
                  <SkeletonP />
                  <SkeletonP />
                  <SkeletonP />
                  <SkeletonP />
                </div>
              )}
            </>
          )}

          {music && !isLoading && searchQuery.length > 0 && (
            <div className="h-[63vh] overflow-y-scroll overflow-hidden flex flex-col items-center">
              {music.slice(0, 3).map((r) => (
                <SearchSong
                  artistId={r.artists[0].id}
                  audio={r.youtubeId}
                  artistName={r.artists[0].name}
                  id={r.youtubeId}
                  key={r.youtubeId}
                  title={r.title}
                  artist={r.artists}
                  cover={r.thumbnailUrl}
                />
              ))}

              {music.slice(4, 6).map((r) => (
                <SearchSong
                  artistId={r.artists[0].id}
                  audio={r.youtubeId}
                  artistName={r.artists[0].name}
                  id={r.youtubeId}
                  key={r.youtubeId}
                  title={r.title}
                  artist={r.artists}
                  cover={r.thumbnailUrl}
                />
              ))}
              {artistsData && artistsData.length > 0 && (
                <div>
                  {artistsData.slice(0, 4).map((a, i) => (
                    <ArtistSearch
                      key={a.name + a.artistId + i}
                      name={a.name}
                      artistId={a.artistId}
                      thumbnailUrl={a.thumbnailUrl}
                    />
                  ))}
                </div>
              )}
              {albumData && albumData.length > 0 && (
                <div>
                  {albumData.slice(0, 4).map((a, i) => (
                    <AlbumSearchComp
                      key={a.albumId + a.title + i}
                      title={a.title}
                      albumId={a.albumId}
                      thumbnailUrl={a.thumbnailUrl}
                    />
                  ))}
                </div>
              )}
              {music.slice(7, 10).map((r) => (
                <SearchSong
                  artistName={r.artists[0].name}
                  artistId={r.artists[0].id}
                  audio={r.youtubeId}
                  id={r.youtubeId}
                  key={r.youtubeId}
                  title={r.title}
                  artist={r.artists}
                  cover={r.thumbnailUrl}
                />
              ))}

              {playlistsData &&
                playlistsData.length > 0 &&
                playlistsData
                  .slice(0, 3)
                  .map((p) => (
                    <PlaylistSearchComp
                      key={p.thumbnailUrl + p.playlistId}
                      playlistId={p.playlistId
                        .replace("VL", "")
                        .replace("MPSP", "")}
                      thumbnailUrl={p.thumbnailUrl}
                      title={p.title}
                    />
                  ))}

              {albumData && albumData.length > 0 && (
                <div>
                  {albumData.slice(4, 7).map((a, i) => (
                    <AlbumSearchComp
                      key={a.albumId + a.title + i}
                      title={a.title}
                      albumId={a.albumId}
                      thumbnailUrl={a.thumbnailUrl}
                    />
                  ))}
                </div>
              )}

              {music.slice(11, music.length - 1).map((r) => (
                <SearchSong
                  artistId={r.artists[0].id}
                  artistName={r.artists[0].name}
                  audio={r.youtubeId}
                  id={r.youtubeId}
                  key={r.youtubeId}
                  title={r.title}
                  artist={r.artists}
                  cover={r.thumbnailUrl}
                />
              ))}

              {playlistsData &&
                playlistsData.length > 0 &&
                playlistsData
                  .slice(3, 7)
                  .map((p) => (
                    <PlaylistSearchComp
                      key={p.thumbnailUrl + p.playlistId}
                      playlistId={p.playlistId
                        .replace("VL", "")
                        .replace("MPSP", "")}
                      thumbnailUrl={p.thumbnailUrl}
                      title={p.title}
                    />
                  ))}

              {albumData && albumData.length > 0 && (
                <div>
                  {albumData.slice(7, albumData.length - 1).map((a, i) => (
                    <AlbumSearchComp
                      key={a.albumId + a.title + i}
                      title={a.title}
                      albumId={a.albumId}
                      thumbnailUrl={a.thumbnailUrl}
                    />
                  ))}
                </div>
              )}
              {artistsData && artistsData.length > 0 && (
                <div>
                  {artistsData.slice(5, artists.length - 1).map((a, i) => (
                    <ArtistSearch
                      key={a.name + a.artistId + i}
                      name={a.name}
                      artistId={a.artistId}
                      thumbnailUrl={a.thumbnailUrl}
                    />
                  ))}
                </div>
              )}
              {playlistsData &&
                playlistsData.length > 0 &&
                playlistsData
                  .slice(8, playlistsData.length - 1)
                  .map((p) => (
                    <PlaylistSearchComp
                      key={p.thumbnailUrl + p.playlistId}
                      playlistId={p.playlistId
                        .replace("VL", "")
                        .replace("MPSP", "")}
                      thumbnailUrl={p.thumbnailUrl}
                      title={p.title}
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
