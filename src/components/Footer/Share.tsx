import { IoShareOutline } from "react-icons/io5";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { AspectRatio } from "../ui/aspect-ratio";
import { Blurhash } from "react-blurhash";
import * as LyricsImage from "html-to-image";
import { useCallback, useEffect, useRef, useState } from "react";
import { encode } from "blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaInstagram } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import { GetImage } from "@/API/api";

function ShareLyrics({
  lyrics,
}: {
  lyrics?: [
    {
      time: number | string;
      lyrics: string;
    }
  ];
}) {
  const lyricsRef = useRef<HTMLDivElement>(null);
  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );
  const playlist = useSelector(
    (state: RootState) => state.musicReducer.playlist
  );

  const loadImage = useCallback(async (src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = src;
    });
  }, []);

  const getImageData = useCallback((image: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(image, 0, 0);
      return context.getImageData(0, 0, image.width, image.height);
    }
  }, []);

  const [blurHash, setBlurHash] = useState<string>(
    "L56bv5}iVBV|-LrnN$WB0rIT$_pK"
  );

  const shareLyrics = useCallback(async () => {
    const lyrics = lyricsRef.current;
    if (!lyrics) return;

    try {
      const blobT = await LyricsImage.toBlob(lyrics);
      const blobS = await LyricsImage.toBlob(lyrics);
      console.log(blobT, blobS);

      const blob = await LyricsImage.toBlob(lyrics);
      if (!blob) return;

      const file = new File([blob], "demo.png", { type: "image/png" });
      if (navigator.share) {
        await navigator.share({ files: [file] });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    const encodeImageToBlurhash = async (imageUrl: string) => {
      const image = await loadImage(imageUrl);
      const imageData = getImageData(image as unknown as HTMLImageElement);
      if (imageData) {
        return setBlurHash(
          encode(imageData.data, imageData.width, imageData.height, 4, 4)
        );
      }
    };

    encodeImageToBlurhash(`${GetImage}${playlist[currentIndex].thumbnailUrl}`);
  }, [getImageData, loadImage, playlist, currentIndex]);
  return (
    <Drawer>
      <DrawerTrigger className="m-0 p-1.5 flex  justify-center items-center bg-zinc-900 rounded-full">
        <IoShareOutline className="h-6 w-6 text-white" />
      </DrawerTrigger>
      <DrawerContent className="h-[100dvh] rounded-none px-[4.5vw]  bg-[#09090b]">
        <div className="flex pt-[5vh] flex-col space-y-3 justify-center items-center py-[1vh] ">
          <AspectRatio
            ref={lyricsRef}
            ratio={9 / 16}
            className=" relative flex items-center justify-center overflow-hidden rounded-2xl"
          >
            <Blurhash
              hash={blurHash}
              width={"100%"}
              height={"100%"}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />

            <div className=" absolute text-zinc-100  overflow-hidden rounded-2xl font-semibold backdrop-blur-lg">
              {lyrics && (
                <div className="break-words bg-black/25 text-2xl px-4 py-2  max-w-[77vw] text-left">
                  <p>{lyrics[0].lyrics}</p>
                </div>
              )}

              <div className=" flex  space-x-2 items-center bg-black/30 py-3 px-3">
                <div className="overflow-hidden flex h-[3.3rem] w-[3.3rem]">
                  <AspectRatio ratio={1 / 1}>
                    <LazyLoadImage
                      src={
                        playlist[currentIndex].thumbnailUrl || "/favicon.jpeg"
                      }
                      width="100%"
                      height="100%"
                      effect="blur"
                      alt="Image"
                      loading="lazy"
                      className="rounded-lg object-cover h-[100%] w-[100%]"
                    />
                  </AspectRatio>
                </div>
                <div className=" font-normal   break-words max-w-[55vw]">
                  <p className="text-xl font-semibold  break-words truncate  max-w-[55vw]">
                    {playlist[currentIndex]?.title}
                  </p>
                  <p className="-mt-0.5 text-sm break-words max-w-[55vw]">
                    {playlist[currentIndex]?.artists[0].name}
                  </p>
                </div>
              </div>
            </div>
          </AspectRatio>
        </div>
        <div className=" flex justify-center items-center pt-[1vh]">
          <div
            onClick={shareLyrics}
            className=" flex items-center px-2.5 py-2 bg-zinc-900 text-zinc-300 rounded-xl space-x-1.5"
          >
            <FaInstagram className=" h-6 w-6" />
            <p>Share on instagram</p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ShareLyrics;
