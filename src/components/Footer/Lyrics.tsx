import { BsChatSquareQuote } from "react-icons/bs";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import Options from "./Options";
import { useEffect } from "react";

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
  useEffect;
  return (
    <Drawer>
      <DrawerTrigger>
        <BsChatSquareQuote className="h-6 w-6" />
      </DrawerTrigger>
      <DrawerContent className="h-[100dvh] rounded-none bg-[#09090b]">
        <div className=" px-5 pt-[2vh] flex justify-between items-center ">
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
      </DrawerContent>
    </Drawer>
  );
}

export default Lyrics;
