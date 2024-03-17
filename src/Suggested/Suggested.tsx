import { RootState } from "@/Store/Store";
import GoBack from "@/components/Goback";
import UpNextSongs from "./upNextSongs";
import { useSelector } from "react-redux";

function Suggested() {
  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );

  const PlaylistOrAlbum = useSelector(
    (state: RootState) => state.musicReducer.PlaylistOrAlbum
  );
  const playlist = useSelector(
    (state: RootState) => state.musicReducer.playlist
  );

  const data = useSelector((state: RootState) => state.musicReducer.playlist);
  return (
    <div className=" flex flex-col items-center">
      <>
        <div className="flex w-full z-10 fixed h-[3rem]  ">
          <GoBack />
          <div className="absolute top-4 z-10 right-3 flex-col space-y-0.5">
            <div className="w-fit">
              <p className="fade-in mb-2 text-zinc-100  backdrop-blur-md bg-black/30 rounded-full p-1.5 px-2 w-fit">
                Edit
              </p>
            </div>
          </div>

          <div className=" absolute bottom-5  px-4 left-0  right-0">
            <h1 className="text-center  font-semibold py-2 text-2xl capitalize"></h1>
            <div className="flex space-x-4 py-1 px-2 justify-center  items-center w-full"></div>
          </div>
        </div>
        <div className="py-3 pt-14 pb-[8.5rem]">
          <p className=" font-semibold text-xl mb-1">Now Playing</p>
          {playlist[currentIndex] && (
            <UpNextSongs
              p={"suggested"}
              where="suggested"
              artistId={playlist[currentIndex].artists[0]?.id}
              audio={playlist[currentIndex].youtubeId}
              key={playlist[currentIndex].youtubeId + currentIndex}
              id={currentIndex}
              album={PlaylistOrAlbum == "album" && true}
              title={playlist[currentIndex].title}
              artist={playlist[currentIndex].artists[0]?.name}
              cover={playlist[currentIndex].thumbnailUrl}
            />
          )}
          <p className=" font-semibold text-xl mb-1">Up next</p>
          {data.map((data, i) => (
            <UpNextSongs
              p={"suggested"}
              where="suggested"
              artistId={data.artists[0]?.id}
              audio={data.youtubeId}
              key={data.youtubeId + i}
              id={i}
              album={PlaylistOrAlbum == "album" && true}
              title={data.title}
              artist={data.artists[0]?.name}
              cover={data.thumbnailUrl}
            />
          ))}
        </div>
      </>
    </div>
  );
}

export default Suggested;
