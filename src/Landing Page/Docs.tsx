import {
  GetAlbumSongs,
  GetArtistDetails,
  GetLyrics,
  GetPlaylistSongsApi,
  SearchAlbum,
  SearchApi,
  SearchArtist,
  SearchPlaylistApi,
  SuggestionSearchApi,
  getPlaylistDetails,
} from "@/API/api";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";
import { auth, googleAuthProvider } from "./firebase";
import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
export default function Docs() {
  const [logged, setLogged] = useState<boolean>();

  const handleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider).then(() => {
      setLogged(true);
    });
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
    return () => unSub();
  }, []);

  return (
    <>
      <div className=" fade-in">
        <header className=" px-11 max-md:px-5 py-4 bg-transparent fixed w-full backdrop-blur-xl justify-between flex  z-10">
          <Link
            to={"/"}
            className="animate-fade-right font-bold text-lg max-md:text-lg"
          >
            Napster Docs 📚
          </Link>
          <ul className=" animate-fade-left flex text-lg text-zinc-200  items-center space-x-3">
            <a
              href="https://github.com/babyo77/napsterDrx-Public"
              target="_blank"
            >
              <FiGithub className=" hover:text-white duration-300 transition-all cursor-pointer" />
            </a>
            <a target="blank" href="https://twitter.com/tanmay11117">
              <FaXTwitter className="hover:text-white duration-300 transition-all cursor-pointer" />
            </a>
          </ul>
        </header>
        {logged ? (
          <>
            <div className="bg-[#09090B] font-semibold w-full min-h-screen flex  justify-start items-start px-9 pb-4 max-lg:text-4xl max-md:text-4xl text-7xl flex-col space-y-7 text-start pt-[11dvh] max-md:px-2.5  prose break-all prose-green">
              <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2 ">
                <h1 className=" font-bold max-md:text-xl text-4xl  text-white animate-fade-up ">
                  # Getting Started 🚀
                </h1>
                <ul>
                  <li className="animate-fade-up">
                    Endpoint - {""}
                    <a
                      target="blank"
                      href="https://music-player-api-mu.vercel.app"
                    >
                      https://music-player-api-mu.vercel.app
                    </a>
                  </li>
                  <li className=" animate-fade-up">
                    Authentication is not required for accessing public
                    endpoints.
                  </li>
                </ul>
              </div>
              {/* <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2 ">
                <h1 className=" font-bold max-md:text-xl text-4xl  text-white animate-fade-up ">
                 #  Streaming 🎶{" "}
                </h1>
                <ul>
                  <li className="animate-fade-up">
                    Endpoint 1 - {""}
                    <a href="  https://exotic-cloe-babyo77.koyeb.app/?url=">
                      https://exotic-cloe-babyo77.koyeb.app/?url=
                    </a>
                  </li>
                  <li className="animate-fade-up">
                    Endpoint 2- {""}
                    <a href="https://unconscious-elianora-babyo7.koyeb.app/?url=">
                      https://unconscious-elianora-babyo7.koyeb.app/?url=
                    </a>
                  </li>
                  <li className="animate-fade-up">
                    Endpoint 3- {""}
                    <a href="https://occasional-clara-babyo777.koyeb.app/?url=">
                      https://occasional-clara-babyo777.koyeb.app/?url=
                    </a>
                  </li>
                  <li className="animate-fade-up">
                    Endpoint 4- {""}
                    <a href="https://alone-dorothee-wolfey.koyeb.app?url=">
                      https://alone-dorothee-wolfey.koyeb.app?url=
                    </a>
                  </li>
                </ul>

                <div>
                  <h2 className=" font-semibold text-white animate-fade-up">
                    How to Use
                  </h2>
                  <p className="animate-fade-up">
                    After <span className=" font-bold "> ?url= </span> enter
                    YouTube video ID.
                  </p>
                </div>
                <div>
                  <h3 className=" font-semibold text-white animate-fade-up">
                    Example
                  </h3>
                  <p className="animate-fade-up">
                    Stream - {""}
                    <a
                      target="blank"
                      href="https://alone-dorothee-wolfey.koyeb.app?url==e-ORhEE9VVg"
                    >
                      https://alone-dorothee-wolfey.koyeb.app?url=
                      <span className=" ">e-ORhEE9VVg</span>
                    </a>
                  </p>
                  <p className="animate-fade-up">
                    Download - {""}
                    <a
                      target="blank"
                      href="https://alone-dorothee-wolfey.koyeb.app/download?url=e-ORhEE9VVg"
                    >
                      https://alone-dorothee-wolfey.koyeb.app/download?url=
                      <span className=" ">e-ORhEE9VVg</span>
                    </a>
                  </p>
                </div>
              </div> */}
              <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2 ">
                <h1 className=" font-bold max-md:text-xl text-4xl  text-white animate-fade-up ">
                  # Search Songs 🔍
                </h1>
                <ul>
                  <li className="animate-fade-up">
                    Endpoint - {""}
                    <a href={SearchApi}>{SearchApi}</a>
                  </li>
                </ul>
                <div>
                  <h2 className=" font-semibold text-white animate-fade-up">
                    How to Use
                  </h2>
                  <p className="animate-fade-up">
                    After
                    <span className=" font-bold "> /s/ </span>
                    enter song name.
                  </p>
                </div>
                <div>
                  <h3 className=" font-semibold text-white animate-fade-up">
                    Example
                  </h3>
                  <p className="animate-fade-up">
                    Search - {""}
                    <a
                      target="blank"
                      href={SearchApi + "lover by taylor swift"}
                    >
                      {SearchApi}
                      <span className=" ">Lover by Taylor Swift</span>
                    </a>
                  </p>
                  <p className="animate-fade-up">
                    Search with Suggestion{" "}
                    <span className=" text-white font-semibold">
                      {" "}
                      (Takes video ID)
                    </span>
                    - {""}
                    <a
                      target="blank"
                      href={SuggestionSearchApi + "uLL2xTK35Qc"}
                    >
                      {SuggestionSearchApi}
                      <span className=" ">uLL2xTK35Qc</span>
                    </a>
                  </p>
                </div>
              </div>
              <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2 ">
                <h1 className=" font-bold max-md:text-xl text-4xl  text-white animate-fade-up ">
                  # Get Lyrics 📝
                </h1>
                <ul>
                  <li className="animate-fade-up">
                    Endpoint - {""}
                    <a href={GetLyrics}>{GetLyrics}</a>
                  </li>
                </ul>
                <div>
                  <h2 className=" font-semibold text-white animate-fade-up">
                    How to Use
                  </h2>
                  <p className="animate-fade-up">
                    After
                    <span className=" font-bold "> /lrc/ </span>
                    enter song name with the artist's name to get better
                    results. The output will be in{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/LRC_(file_format)"
                      target="_blank"
                      className=" font-bold "
                    >
                      LRC Format
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className=" font-semibold text-white animate-fade-up">
                    Example
                  </h3>
                  <p className="animate-fade-up">
                    Get Lyrics - {""}
                    <a
                      target="blank"
                      href={GetLyrics + "lover by taylor swift"}
                    >
                      {GetLyrics}
                      <span className=" ">Lover by Taylor Swift</span>
                    </a>
                  </p>
                </div>
              </div>
              <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2 ">
                <h1 className=" font-bold max-md:text-xl text-4xl  text-white animate-fade-up ">
                  # Search Artists 🎤
                </h1>
                <ul>
                  <li className="animate-fade-up">
                    Endpoint - {""}
                    <a href={SearchArtist}>{SearchArtist}</a>
                  </li>
                </ul>
                <div>
                  <h2 className=" font-semibold text-white animate-fade-up">
                    How to Use
                  </h2>
                  <p className="animate-fade-up">
                    After
                    <span className=" font-bold "> /a/ </span>
                    enter artist's name.
                  </p>
                </div>
                <div>
                  <h3 className=" font-semibold text-white animate-fade-up">
                    Example
                  </h3>
                  <p className="animate-fade-up">
                    Get Artists - {""}
                    <a target="blank" href={SearchArtist + "taylor swift"}>
                      {SearchArtist}
                      <span className=" ">Taylor Swift</span>
                    </a>
                  </p>
                  <p className="animate-fade-up">
                    Get Artist Details{" "}
                    <span className=" text-white font-semibold">
                      {" "}
                      (Takes Artist ID)
                    </span>{" "}
                    - {""}
                    <a
                      target="blank"
                      href={GetArtistDetails + "UCPC0L1d253x-KuMNwa05TpA"}
                    >
                      {GetArtistDetails}
                      <span className=" ">UCPC0L1d253x-KuMNwa05TpA</span>
                    </a>
                  </p>
                </div>
              </div>
              <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2 ">
                <h1 className=" font-bold max-md:text-xl text-4xl  text-white animate-fade-up ">
                  # Search Albums 📀
                </h1>
                <ul>
                  <li className="animate-fade-up">
                    Endpoint - {""}
                    <a href={SearchAlbum}>{SearchAlbum}</a>
                  </li>
                </ul>
                <div>
                  <h2 className=" font-semibold text-white animate-fade-up">
                    How to Use
                  </h2>
                  <p className="animate-fade-up">
                    After
                    <span className=" font-bold "> /al/ </span>
                    enter album name with the artist's name for better results.
                  </p>
                </div>
                <div>
                  <h3 className=" font-semibold text-white animate-fade-up">
                    Example
                  </h3>
                  <p className="animate-fade-up">
                    Get Albums - {""}
                    <a target="blank" href={SearchAlbum + "Lunch Break"}>
                      {SearchAlbum}
                      <span className=" ">Lunch Break</span>
                    </a>
                  </p>
                  <p className="animate-fade-up">
                    Get Album Songs{" "}
                    <span className=" text-white font-semibold">
                      {" "}
                      (Takes Album ID)
                    </span>{" "}
                    - {""}
                    <a
                      target="blank"
                      href={GetAlbumSongs + "MPREb_ssw2KCCsqYW"}
                    >
                      {GetArtistDetails}
                      <span className=" ">MPREb_ssw2KCCsqYW</span>
                    </a>
                  </p>
                </div>
              </div>
              <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2 ">
                <h1 className=" font-bold max-md:text-xl text-4xl  text-white animate-fade-right">
                  # Search Playlists 🎵
                </h1>
                <ul>
                  <li className="animate-fade-up">
                    Endpoint - {""}
                    <a href={SearchPlaylistApi}>{SearchPlaylistApi}</a>
                  </li>
                </ul>
                <div>
                  <h2 className=" font-semibold text-white animate-fade-up">
                    How to Use
                  </h2>
                  <p className="animate-fade-up">
                    After
                    <span className=" font-bold "> /p/ </span>
                    enter playlist name.
                  </p>
                </div>
                <div>
                  <h3 className=" font-semibold text-white animate-fade-up">
                    Example
                  </h3>
                  <p className="animate-fade-up">
                    Get Playlists - {""}
                    <a
                      target="blank"
                      href={SearchPlaylistApi + "billie eilish"}
                    >
                      {SearchPlaylistApi}
                      <span className=" ">Billie Eilish</span>
                    </a>
                  </p>
                  <p className="animate-fade-up">
                    Get Playlist Songs{" "}
                    <span className=" text-white font-semibold">
                      {" "}
                      (Takes Playlist ID)
                    </span>{" "}
                    - {""}
                    <a
                      target="blank"
                      href={
                        GetPlaylistSongsApi +
                        "VLPLiyHrD1Lz34xUsqSUE2lyNRf-d_wbbqcz"
                      }
                    >
                      {GetPlaylistSongsApi}
                      <span className=" ">
                        VLPLiyHrD1Lz34xUsqSUE2lyNRf-d_wbbqcz
                      </span>
                    </a>
                  </p>
                  <p className="animate-fade-up">
                    Get Playlist Detail{" "}
                    <span className=" text-white font-semibold">
                      {" "}
                      (Takes Playlist ID)
                    </span>{" "}
                    - {""}
                    <a
                      target="blank"
                      href={
                        getPlaylistDetails +
                        "VLPLiyHrD1Lz34xUsqSUE2lyNRf-d_wbbqcz"
                      }
                    >
                      {getPlaylistDetails}
                      <span className=" ">
                        VLPLiyHrD1Lz34xUsqSUE2lyNRf-d_wbbqcz
                      </span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-[#09090B] fade-in font-semibold w-full min-h-screen flex justify-center items-center px-9 max-lg:text-4xl max-md:text-4xl text-7xl flex-col space-y-7 text-center max-md:px-4 overflow-hidden fixed -z-10">
            <Button
              onClick={handleSignIn}
              className="  py-6 animate-fade-up  max-md:text-base rounded-lg space-x-1"
            >
              <FcGoogle />
              <p>Continue with Google</p>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
