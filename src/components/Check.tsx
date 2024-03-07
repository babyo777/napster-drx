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
import { AlbumSongs, lastPlayed, likedSongs, playlistSongs } from "@/Interface";
import axios from "axios";
import {
  GetAlbumSongs,
  GetPlaylistHundredSongsApi,
  SuggestionSearchApi,
} from "@/API/api";
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

  const { data, isError } = useQuery<lastPlayed>(
    "lastPlayedSongs",
    getLastPlayed,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
    }
  );

  const getPlaylist = async () => {
    if (data) {
      const list = await axios.get(
        `${GetPlaylistHundredSongsApi}${data?.playlisturl}`
      );
      const r = await axios.get(`${SuggestionSearchApi}${data?.curentsongid}`);

      const newD = [
        ...list.data.slice(0, data?.index - 1),
        r.data[0],
        ...list.data.slice(data.index - 1),
      ];

      dispatch(setPlaylist(newD));
      console.log(newD);

      return list.data as playlistSongs[];
    } else {
      return [];
    }
  };
  const getAlbum = async () => {
    if (data) {
      const list = await axios.get(`${GetAlbumSongs}${data?.playlisturl}`);
      const r = await axios.get(`${SuggestionSearchApi}${data?.curentsongid}`);
      if (r.data[0]?.youtubeId == list.data[0]?.youtubeId) {
        const ps = (list.data as AlbumSongs[]).slice(1);
        const newD = [
          ...ps.slice(0, data?.index - 1),
          r.data[0],
          ...ps.slice(data.index - 1),
        ];

        dispatch(setPlaylist(newD));
      } else {
        const newD = [
          ...list.data.slice(0, data?.index - 1),
          r.data[0],
          ...list.data.slice(data.index - 1),
        ];

        dispatch(setPlaylist(newD));
      }
      return list.data as AlbumSongs[];
    } else {
      return [];
    }
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
  const { refetch: album } = useQuery<AlbumSongs[]>(
    ["albumSongs", data?.playlisturl],
    getAlbum,
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
    const s = await axios.get(`${SuggestionSearchApi}${data?.curentsongid}`);
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
    if (data) {
      if (s.data[0]?.youtubeId == modified[0].youtubeId) {
        const mm = modified.slice(1);

        const newD = [
          ...modified.slice(0, data?.index - 1),
          s.data[0],
          ...mm.slice(5),
        ];
        dispatch(setPlaylist(newD));
      } else {
        const newD = [
          ...modified.slice(0, data?.index - 1),
          s.data[0],
          ...modified.slice(5),
        ];

        dispatch(setPlaylist(newD));
      }
    }
    return modified as unknown as likedSongs[];
  };

  const { refetch: likedSong } = useQuery<likedSongs[]>(
    ["likedSongsDetailsP", data?.playlisturl],
    getPlaylistDetails,
    {
      retry: 5,
      enabled: false,
      refetchOnMount: false,
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
      retry: 5,
      enabled: false,
      refetchOnMount: false,
      staleTime: 5 * 6000,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(setPlayingPlaylistUrl(data.playlisturl));
      dispatch(SetPlaylistOrAlbum(data.navigator));
      dispatch(setCurrentIndex(data.index));

      if (data.navigator == "library") {
        refetch();
      }
      if (data.navigator == "album") {
        album();
      }
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
  }, [dispatch, data, refetch, likedSong, suggested, album]);

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
      {check && navigator.onLine && !data && !playlistSongs ? (
        <div className="load flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {isIPhone && data && playlistSongs ? (
            <InstallNapster />
          ) : (
            <InstallNapsterAndroid />
          )}
          {isIPhone && isError ? <InstallNapster /> : <InstallNapsterAndroid />}
        </>
      )}
    </>
  );
}

export default Check;
