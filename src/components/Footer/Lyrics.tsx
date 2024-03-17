import { BsChatSquareQuote } from "react-icons/bs";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import Options from "./Options";
import axios from "axios";
import { GetLyrics } from "@/API/api";
import { useQuery } from "react-query";
import { lyrics } from "@/Interface";
import Loader from "../Loaders/Loader";

function Lyrics() {
  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );
  const playlist = useSelector(
    (state: RootState) => state.musicReducer.playlist
  );
  const playingPlaylistUrl = useSelector(
    (state: RootState) => state.musicReducer.playingPlaylistUrl
  );
  const getLyrics = async () => {
    const lyrics = await axios.get(
      `${GetLyrics}?t=${playlist[currentIndex].title}&a=${playlist[currentIndex].artists[0].name}`
    );

    return lyrics.data as lyrics;
  };
  const {
    data: lyrics,
    refetch,
    isLoading,
  } = useQuery<lyrics>(
    ["lyrics", playlist[currentIndex].youtubeId],
    getLyrics,
    {
      enabled: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 6000,
      refetchOnMount: false,
    }
  );
  return (
    <Drawer>
      <DrawerTrigger onClick={() => refetch()}>
        <BsChatSquareQuote className="h-6 w-6" />
      </DrawerTrigger>
      <DrawerContent className="h-[100dvh] rounded-none bg-[#09090b]">
        <div className="flex fade-in flex-col px-5 space-y-3">
          <div className="  pt-[2vh] flex justify-between items-center ">
            <div className="flex space-x-3">
              <div className=" h-14 w-14 overflow-hidden rounded-lg">
                <LazyLoadImage
                  height="100%"
                  width="100%"
                  src={
                    playlist[currentIndex].thumbnailUrl ||
                    "https://i.pinimg.com/564x/d4/40/76/d44076613b20dd92a8e4da29a8df538e.jpg"
                  }
                  alt="Image"
                  effect="blur"
                  className="object-cover transition-all duration-300 rounded-lg w-[100%] h-[100%] "
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xl">{playlist[currentIndex].title}</p>
                <p className="text-sm">
                  {playlist[currentIndex].artists[0].name}
                </p>
              </div>
            </div>
            <div>
              <Options id={playingPlaylistUrl} music={playlist[currentIndex]} />
            </div>
          </div>
          {isLoading ? (
            <div className="flex h-[77dvh] justify-center items-center">
              <Loader loading={true} />
            </div>
          ) : (
            <>
              {lyrics ? (
                <div className=" overflow-scroll h-[86vh]">
                  {lyrics.lyrics.split("\n\n").map((verse, index) => (
                    <div key={index} className="text-2xl">
                      {verse.split("\n").map((line, index) => (
                        <p className="mb-1" key={index}>
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[77dvh] justify-center items-center">
                  <p className="text-2xl">Lyrics not Found</p>
                </div>
              )}
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default Lyrics;
