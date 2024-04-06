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
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Docs() {
  return (
    <>
      <div className=" fade-in">
        <header className=" px-11 max-md:px-5 py-4 bg-transparent fixed w-full backdrop-blur-xl justify-between flex">
          <Link to={"/"} className=" font-bold text-lg max-md:text-lg">
            Napster Docs
          </Link>
          <ul className=" flex text-lg text-zinc-200  items-center space-x-3">
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

        <div className="bg-[#09090B] font-semibold w-full min-h-screen flex  justify-start items-start px-9 pb-4 max-lg:text-4xl max-md:text-4xl text-7xl flex-col space-y-7 text-start pt-[11dvh] max-md:px-2.5 prose break-all prose-stone">
          <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2">
            <h1 className="text-2xl font-bold  text-white ">Getting Started</h1>
            <ul>
              <li>
                Endpoint - {""}
                <a
                  className=" text-blue-400"
                  href="https://music-player-api-mu.vercel.app"
                >
                  https://music-player-api-mu.vercel.app
                </a>
              </li>
            </ul>
          </div>
          <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2">
            <h1 className="text-2xl font-bold  text-white ">Streaming</h1>
            <ul>
              <li>
                Endpoint 1 - {""}
                <a
                  className=" text-blue-400"
                  href="  https://exotic-cloe-babyo77.koyeb.app/?url="
                >
                  https://exotic-cloe-babyo77.koyeb.app/?url=
                </a>
              </li>
              <li>
                Endpoint 2- {""}
                <a
                  className=" text-blue-400"
                  href="https://unconscious-elianora-babyo7.koyeb.app/?url="
                >
                  https://unconscious-elianora-babyo7.koyeb.app/?url=
                </a>
              </li>
              <li>
                Endpoint 3- {""}
                <a
                  className=" text-blue-400"
                  href="https://occasional-clara-babyo777.koyeb.app/?url="
                >
                  https://occasional-clara-babyo777.koyeb.app/?url=
                </a>
              </li>
              <li>
                Endpoint 4- {""}
                <a
                  className=" text-blue-400"
                  href="https://alone-dorothee-wolfey.koyeb.app?url="
                >
                  https://alone-dorothee-wolfey.koyeb.app?url=
                </a>
              </li>
            </ul>
            <div>
              <h2 className=" font-semibold text-white">How to Use</h2>
              <p>
                After <span className=" font-bold text-green-500"> ?url= </span>{" "}
                enter the YouTube video ID.
              </p>
            </div>
            <div>
              <h3 className=" font-semibold text-white">Example</h3>
              <p>
                Stream - {""}
                <a
                  target="blank"
                  className=" text-blue-400"
                  href="https://alone-dorothee-wolfey.koyeb.app?url==e-ORhEE9VVg"
                >
                  https://alone-dorothee-wolfey.koyeb.app?url=
                  <span className=" text-green-500">e-ORhEE9VVg</span>
                </a>
              </p>
              <p>
                Download - {""}
                <a
                  target="blank"
                  className=" text-blue-400"
                  href="https://alone-dorothee-wolfey.koyeb.app/download?url=e-ORhEE9VVg"
                >
                  https://alone-dorothee-wolfey.koyeb.app/download?url=
                  <span className=" text-green-500">e-ORhEE9VVg</span>
                </a>
              </p>
            </div>
          </div>

          <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2">
            <h1 className="text-2xl font-bold  text-white ">Search Songs</h1>
            <ul>
              <li>
                Endpoint - {""}
                <a className=" text-blue-400" href={SearchApi}>
                  {SearchApi}
                </a>
              </li>
            </ul>
            <div>
              <h2 className=" font-semibold text-white">How to Use</h2>
              <p>
                After
                <span className=" font-bold text-green-500"> /s/ </span>
                enter the song name.
              </p>
            </div>
            <div>
              <h3 className=" font-semibold text-white">Example</h3>
              <p>
                Search - {""}
                <a
                  target="blank"
                  className=" text-blue-400"
                  href={SearchApi + "lover by taylor swift"}
                >
                  {SearchApi}
                  <span className=" text-green-500">Lover by Taylor Swift</span>
                </a>
              </p>
              <p>
                Search with Suggestion{" "}
                <span className=" text-red-500"> (Takes video ID)</span>- {""}
                <a
                  target="blank"
                  className=" text-blue-400"
                  href={SuggestionSearchApi + "uLL2xTK35Qc"}
                >
                  {SuggestionSearchApi}
                  <span className=" text-green-500">uLL2xTK35Qc</span>
                </a>
              </p>
            </div>
          </div>
          <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2">
            <h1 className="text-2xl font-bold  text-white ">Get Lyrics</h1>
            <ul>
              <li>
                Endpoint - {""}
                <a className=" text-blue-400" href={GetLyrics}>
                  {GetLyrics}
                </a>
              </li>
            </ul>
            <div>
              <h2 className=" font-semibold text-white">How to Use</h2>
              <p>
                After
                <span className=" font-bold text-green-500"> /lrc/ </span>
                enter the song name with the artist's name to get better
                results. The output will be in{" "}
                <a
                  href="https://en.wikipedia.org/wiki/LRC_(file_format)"
                  target="_blank"
                  className=" font-bold text-green-500"
                >
                  LRC Format
                </a>
              </p>
            </div>
            <div>
              <h3 className=" font-semibold text-white">Example</h3>
              <p>
                Get Lyrics - {""}
                <a
                  target="blank"
                  className=" text-blue-400"
                  href={GetLyrics + "lover by taylor swift"}
                >
                  {GetLyrics}
                  <span className=" text-green-500">Lover by Taylor Swift</span>
                </a>
              </p>
            </div>
          </div>
          <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2">
            <h1 className="text-2xl font-bold  text-white ">Search Artists</h1>
            <ul>
              <li>
                Endpoint - {""}
                <a className=" text-blue-500" href={SearchArtist}>
                  {SearchArtist}
                </a>
              </li>
            </ul>
            <div>
              <h2 className=" font-semibold text-white">How to Use</h2>
              <p>
                After
                <span className=" font-bold text-green-500"> /a/ </span>
                enter the artist's name.
              </p>
            </div>
            <div>
              <h3 className=" font-semibold text-white">Example</h3>
              <p>
                Get Artists - {""}
                <a
                  target="blank"
                  className=" text-blue-400"
                  href={SearchArtist + "taylor swift"}
                >
                  {SearchArtist}
                  <span className=" text-green-500">Taylor Swift</span>
                </a>
              </p>
              <p>
                Get Artist Details{" "}
                <span className=" text-red-500"> (Takes Artist ID)</span> - {""}
                <a
                  target="blank"
                  className=" text-blue-400"
                  href={GetArtistDetails + "UCPC0L1d253x-KuMNwa05TpA"}
                >
                  {GetArtistDetails}
                  <span className=" text-green-500">
                    UCPC0L1d253x-KuMNwa05TpA
                  </span>
                </a>
              </p>
            </div>
          </div>
          <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2">
            <h1 className="text-2xl font-bold  text-white ">Search Albums</h1>
            <ul>
              <li>
                Endpoint - {""}
                <a className=" text-blue-400" href={SearchAlbum}>
                  {SearchAlbum}
                </a>
              </li>
            </ul>
            <div>
              <h2 className=" font-semibold text-white">How to Use</h2>
              <p>
                After
                <span className=" font-bold text-green-500"> /al/ </span>
                enter the album name with the artist's name for better results.
              </p>
            </div>
            <div>
              <h3 className=" font-semibold text-white">Example</h3>
              <p>
                Get Albums - {""}
                <a
                  target="blank"
                  className=" text-blue-400"
                  href={SearchAlbum + "Lunch Break"}
                >
                  {SearchAlbum}
                  <span className=" text-green-500">Lunch Break</span>
                </a>
              </p>
              <p>
                Get Album Songs{" "}
                <span className=" text-red-500"> (Takes Album ID)</span> - {""}
                <a
                  target="blank"
                  className=" text-blue-400"
                  href={GetAlbumSongs + "MPREb_ssw2KCCsqYW"}
                >
                  {GetArtistDetails}
                  <span className=" text-green-500">MPREb_ssw2KCCsqYW</span>
                </a>
              </p>
            </div>
          </div>
          <div className=" text-base  text-zinc-300 font-normal px-2 space-y-2">
            <h1 className="text-2xl font-bold  text-white">Search Playlists</h1>
            <ul>
              <li>
                Endpoint - {""}
                <a className=" text-blue-400" href={SearchPlaylistApi}>
                  {SearchPlaylistApi}
                </a>
              </li>
            </ul>
            <div>
              <h2 className=" font-semibold text-white">How to Use</h2>
              <p>
                After
                <span className=" font-bold text-green-500"> /p/ </span>
                enter the playlist name.
              </p>
            </div>
            <div>
              <h3 className=" font-semibold text-white">Example</h3>
              <p>
                Get Playlists - {""}
                <a
                  target="blank"
                  className=" text-blue-400"
                  href={SearchPlaylistApi + "billie eilish"}
                >
                  {SearchPlaylistApi}
                  <span className=" text-green-500">Billie Eilish</span>
                </a>
              </p>
              <p>
                Get Playlist Songs{" "}
                <span className=" text-red-500"> (Takes Playlist ID)</span> -{" "}
                {""}
                <a
                  target="blank"
                  className=" text-blue-400"
                  href={
                    GetPlaylistSongsApi + "VLPLiyHrD1Lz34xUsqSUE2lyNRf-d_wbbqcz"
                  }
                >
                  {GetPlaylistSongsApi}
                  <span className=" text-green-500">
                    VLPLiyHrD1Lz34xUsqSUE2lyNRf-d_wbbqcz
                  </span>
                </a>
              </p>
              <p>
                Get Playlist Detail{" "}
                <span className=" text-red-500"> (Takes Playlist ID)</span> -{" "}
                {""}
                <a
                  target="blank"
                  className=" text-blue-400"
                  href={
                    getPlaylistDetails + "VLPLiyHrD1Lz34xUsqSUE2lyNRf-d_wbbqcz"
                  }
                >
                  {getPlaylistDetails}
                  <span className=" text-green-500">
                    VLPLiyHrD1Lz34xUsqSUE2lyNRf-d_wbbqcz
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
