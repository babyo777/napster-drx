import { useEffect, useState } from "react";
import App from "@/App";
import InstallNapster from "./InstallNapster";
import { Desktop } from "./Desktop";
import InstallNapsterAndroid from "@/Testing/AndInstaller";
import { useDispatch, useSelector } from "react-redux";
import {
  SetPlaylistOrAlbum,
  setCurrentIndex,
  setIsIphone,
  setPlayingPlaylistUrl,
  setPlaylist,
} from "@/Store/Player";
import { RootState } from "@/Store/Store";
import Loader from "./Loaders/Loader";
import {
  DATABASE_ID,
  LAST_PLAYED,
  LIKE_SONG,
  db,
} from "@/appwrite/appwriteConfig";
import { useQuery } from "react-query";
import { lastPlayed, likedSongs, playlistSongs } from "@/Interface";
import axios from "axios";
import { GetPlaylistHundredSongsApi, SuggestionSearchApi } from "@/API/api";
import { Query } from "appwrite";

function Check() {
  const dispatch = useDispatch();
  const [check, setCheck] = useState<boolean>(true);
  const [isStandalone, setIsStandalone] = useState<boolean>();
  const [graphic, setGraphic] = useState<boolean>();
  const [hardwareConcurrency, setHardwareConcurrency] = useState<number | null>(
    null
  );
  const isStandaloneWep = useSelector(
    (state: RootState) => state.musicReducer.isIphone
  );
  const uid = useSelector((state: RootState) => state.musicReducer.uid);

  const isIPhone = /iPhone/i.test(navigator.userAgent);
  const isDesktop = window.innerWidth > 786;
  const checkGpuCapabilities = () => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");

    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : null;

      return renderer;
    }

    return null;
  };

  const getLastPlayed = async () => {
    const lastPlayed = await db.getDocument(
      DATABASE_ID,
      LAST_PLAYED,
      uid || ""
    );
    return lastPlayed as unknown as lastPlayed;
  };

  const { data, isLoading, isError } = useQuery<lastPlayed>(
    "lastPlayed",
    getLastPlayed,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
    }
  );

  const getPlaylist = async () => {
    const list = await axios.get(
      `${GetPlaylistHundredSongsApi}${data?.playlisturl}`
    );
    dispatch(setPlaylist(list.data));
    return list.data as playlistSongs[];
  };

  const { refetch, data: playlistSongs } = useQuery<playlistSongs[]>(
    ["playlist", data?.playlisturl],
    getPlaylist,
    {
      retry: 5,
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 60 * 60000,
    }
  );

  const getPlaylistDetails = async () => {
    const r = await db.listDocuments(DATABASE_ID, LIKE_SONG, [
      Query.orderDesc("$createdAt"),
      Query.equal("for", [localStorage.getItem("uid") || ""]),
      Query.limit(999),
    ]);
    const modified = r.documents.map((doc) => ({
      for: doc.for,
      youtubeId: doc.youtubeId,
      artists: [
        {
          id: doc.artists[0],
          name: doc.artists[1],
        },
      ],
      title: doc.title,
      thumbnailUrl: doc.thumbnailUrl,
    }));
    dispatch(setPlaylist(modified));
    return modified as unknown as likedSongs[];
  };

  const { refetch: likedSong } = useQuery<likedSongs[]>(
    ["likedSongsDetails", data?.playlisturl],
    getPlaylistDetails,
    {
      retry: 5,
      enabled: false,
      staleTime: 1000,
      refetchOnWindowFocus: false,
    }
  );

  const getSuggestedSongs = async () => {
    const r = await axios.get(`${SuggestionSearchApi}${data?.curentsongid}`);
    dispatch(setPlaylist(r.data));
    return r.data as playlistSongs[];
  };

  const { refetch: suggested } = useQuery<playlistSongs[]>(
    ["suggestedSongs", data?.curentsongid],
    getSuggestedSongs,
    {
      refetchOnMount: false,
      staleTime: 5 * 6000,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(setPlayingPlaylistUrl(data.playlisturl));
      dispatch(setCurrentIndex(data.index));
      dispatch(SetPlaylistOrAlbum(data.navigator));
      refetch();
      if (data.navigator == "liked") {
        likedSong();
      }
      if (data.navigator == "suggested") {
        suggested();
      }
    }
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    const hardwareConcurrency = navigator.hardwareConcurrency || null;
    setHardwareConcurrency(hardwareConcurrency);
    setIsStandalone(isStandalone);
    dispatch(setIsIphone(isStandalone));
    setGraphic(checkGpuCapabilities());
    setCheck(false);
  }, [dispatch, data, refetch, likedSong, suggested]);

  const isiPad = navigator.userAgent.match(/iPad/i) !== null;

  if (isDesktop || isiPad) {
    return <Desktop desktop={isDesktop} iPad={isiPad} />;
  }
  if (isStandalone) {
    return <App />;
  }
  if (
    !isStandaloneWep &&
    hardwareConcurrency &&
    hardwareConcurrency >= 4 &&
    graphic
  ) {
    return <App />;
  }

  return (
    <>
      {check && navigator.onLine && isLoading && playlistSongs ? (
        <div className="load flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {isIPhone ? <InstallNapster /> : <InstallNapsterAndroid />}
          {isIPhone && isError ? <InstallNapster /> : <InstallNapsterAndroid />}
        </>
      )}
    </>
  );
}

export default Check;
