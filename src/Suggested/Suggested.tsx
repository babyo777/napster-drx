import { RootState } from "@/Store/Store";
import GoBack from "@/components/Goback";
import Songs from "@/components/Library/Songs";
import { useCallback } from "react";
import { RiFocus3Line } from "react-icons/ri";
// import { Button } from "@/components/ui/button";
// import { FaPlay } from "react-icons/fa6";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

function Suggested() {
  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );

  const playlist = useSelector(
    (state: RootState) => state.musicReducer.playlist
  );
  const handleFocus = useCallback(() => {
    const toFocus = document.getElementById(playlist[currentIndex].youtubeId);
    toFocus?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentIndex, playlist]);
  const data = useSelector((state: RootState) => state.musicReducer.playlist);
  return (
    <div className=" flex flex-col items-center">
      <>
        <div className="flex w-full h-[23rem] relative ">
          <GoBack />
          <div className="absolute top-4 z-10 right-3 flex-col space-y-0.5">
            <div className="" onClick={handleFocus}>
              <RiFocus3Line className="h-8 w-8 fade-in mb-2  backdrop-blur-md text-white bg-black/30 rounded-full p-1.5" />
            </div>
          </div>
          <LazyLoadImage
            effect="blur"
            width="100%"
            height="100%"
            src="/favicon.jpeg"
            alt="Image"
            loading="lazy"
            className="object-cover opacity-80 h-[100%] w-[100%]"
          />

          <div className=" absolute bottom-5  px-4 left-0  right-0">
            <h1 className="text-center  font-semibold py-2 text-2xl capitalize"></h1>
            <div className="flex space-x-4 py-1 px-2 justify-center  items-center w-full">
              {/* <Button
              onClick={handlePlay}
              type="button"
              variant={"secondary"}
              className="text-base py-5 text-zinc-100 shadow-none bg-white/20 backdrop-blur-md rounded-lg px-14"
            >
              <FaPlay className="mr-2" />
              Play
            </Button> */}
              {/* <Button
              type="button"
              onClick={handleShare}
              variant={"secondary"}
              className="text-base py-5 text-zinc-100 shadow-none bg-white/20 backdrop-blur-md rounded-lg px-14"
            >
              <FaShare className="mr-2" />
              Share
            </Button> */}
            </div>
          </div>
        </div>
        <div className="py-3 pb-[9.5rem]">
          {data.map((data, i) => (
            <Songs
              p={"suggested"}
              where="suggested"
              artistId={data.artists[0]?.id}
              audio={data.youtubeId}
              key={data.youtubeId + i}
              id={i}
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
