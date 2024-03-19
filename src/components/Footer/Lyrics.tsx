import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import Options from "./Options";
import axios from "axios";
import { GetLyrics } from "@/API/api";
import { useQuery } from "react-query";
import Loader from "../Loaders/Loader";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import {
  MouseEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { TbMicrophone2 } from "react-icons/tb";
import { prominent } from "color.js";

function Lyrics({ closeRef }: { closeRef: RefObject<HTMLButtonElement> }) {
  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );
  const playlist = useSelector(
    (state: RootState) => state.musicReducer.playlist
  );
  const playingPlaylistUrl = useSelector(
    (state: RootState) => state.musicReducer.playingPlaylistUrl
  );
  const progress = useSelector(
    (state: RootState) => state.musicReducer.progress
  );
  const music = useSelector((state: RootState) => state.musicReducer.music);
  const [color, setColor] = useState<string | null>();
  const getColor = useCallback(async () => {
    const c = await prominent(playlist[currentIndex].thumbnailUrl, {
      amount: 8,
      format: "hex",
    });
    if (c === "#000000") {
      return setColor(null);
    }

    setColor(c as string);
  }, [playlist, currentIndex]);
  const formatDuration = useCallback((seconds: number | "--:--") => {
    if (seconds == "--:--") return seconds;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }, []);
  const getLyrics = useCallback(async () => {
    getColor();
    console.log(
      `${playlist[currentIndex].artists[0].name.replace(
        /[^\w\s]/gi,
        ""
      )} ${playlist[currentIndex].title
        .replace(/\((?![^)]*Acoustic)[^()]*\)/g, "")
        .replace(/\[(?![^\]]*Acoustic)[^\]]*\]/g, "")
        .replace(/[^\w\s]/gi, "")
        .replace(/\(.*\)/g, "")
        .replace(/@/g, "")
        .replace(/-\s*/g, "")
        .replace(/\[.*?\]/g, "")
        .replace(/\./g, "")
        .replace(/'\s*/g, "")
        .trim()
        .replace(/\s+/g, " ")} ${formatDuration(music?.duration || 0)}`
    );

    const lyrics = await axios.get(
      `${GetLyrics}${playlist[currentIndex].artists[0].name.replace(
        /[^\w\s]/gi,
        ""
      )} ${playlist[currentIndex].title
        .replace(/\((?![^)]*Acoustic)[^()]*\)/g, "")
        .replace(/\[(?![^\]]*Acoustic)[^\]]*\]/g, "")
        .replace(/[^\w\s]/gi, "")
        .replace(/\(.*\)/g, "")
        .replace(/@/g, "")
        .replace(/-\s*/g, "")
        .replace(/\[.*?\]/g, "")
        .replace(/\./g, "")
        .replace(/'\s*/g, "")
        .trim()
        .replace(/\s+/g, " ")} ${formatDuration(music?.duration || 0)}`
    );

    const lines = lyrics.data.lyrics.split("\n");
    const parsedLyrics = lines
      .map((line: string) => {
        const matches = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
        if (matches) {
          const minutes = parseInt(matches[1]);
          const seconds = parseFloat(matches[2]);
          const lyrics = matches[3].trim();
          const time = minutes * 60 + seconds;
          return { time, lyrics };
        }
        return null;
      })
      .filter((line: string) => line !== null);

    return parsedLyrics as [{ time: number | string; lyrics: string }];
  }, [playlist, currentIndex, music, formatDuration, getColor]);

  const {
    data: lyrics,
    refetch,
    isLoading,
  } = useQuery<[{ time: number | string; lyrics: string }]>(
    ["lyrics", playlist[currentIndex].youtubeId],
    getLyrics,
    {
      enabled: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 6000,
      refetchOnMount: false,
    }
  );

  const lyricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lyricsRef.current) {
      const lines = Array.from(
        lyricsRef.current.children
      ) as HTMLParagraphElement[];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const time = parseFloat(line.dataset.time || "0");
        const nextTime = parseFloat(lines[i + 1]?.dataset.time || "0");

        if (
          (time as number | "--:--") <= progress &&
          (nextTime as number | "--:--") > progress
        ) {
          line.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    refetch();
  }, [currentIndex, refetch]);

  const handleClick: MouseEventHandler<HTMLParagraphElement> = useCallback(
    (t) => {
      if (music) {
        music.currentTime = parseFloat(t.currentTarget.dataset.time || "0");
      }
    },
    [music]
  );
  return (
    <Drawer>
      <DrawerTrigger onClick={() => refetch()}>
        <TbMicrophone2 className="h-6 w-6" />
      </DrawerTrigger>
      <DrawerContent className="h-[100dvh] rounded-none bg-[#09090b]">
        <div className=" absolute pt-[3vh] w-full px-5 pb-[2vh] backdrop-blur-lg bg-transparent z-10 flex justify-between items-center ">
          <div className="flex space-x-3">
            <div className=" h-16 w-16 overflow-hidden rounded-lg">
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
              <p className="text-xl truncate w-[57vw] fade-in">
                {playlist[currentIndex].title}
              </p>

              <Link
                className="text-start -mt-1"
                to={`/artist/${playlist[currentIndex].artists[0]?.id}`}
              >
                <DrawerClose
                  onClick={() => closeRef.current?.click()}
                  className="p-0 m-0"
                >
                  <p className="text-sm fade-in text-start truncate w-[47vw]  text-red-500">
                    {playlist[currentIndex].artists[0]?.name}
                  </p>
                </DrawerClose>
              </Link>
            </div>
          </div>
          <div>
            <Options id={playingPlaylistUrl} music={playlist[currentIndex]} />
          </div>
        </div>
        <div className="flex relative overflow-scroll pb-3 pt-[10vh] flex-col px-5 space-y-3">
          {isLoading ? (
            <div className="flex h-[77dvh] justify-center items-center">
              <Loader loading={true} />
            </div>
          ) : (
            <>
              {lyrics ? (
                <div
                  ref={lyricsRef}
                  className=" transition-all break-words duration-300 fade-in pb-4"
                >
                  {lyrics.map((line, index) => (
                    <p
                      onClick={handleClick}
                      key={index}
                      data-time={line.time}
                      style={{
                        fontSize: "1.875rem",
                        marginTop: "1rem",
                        transitionProperty: "all",
                        transitionDuration: "500ms",
                        fontWeight: "bold",
                        opacity:
                          line.time <= progress &&
                          (index === lyrics.length - 1 ||
                            (lyrics[index + 1]?.time || 0) > progress)
                            ? color
                              ? 1
                              : 1
                            : 0.05,
                        color:
                          line.time <= progress &&
                          (index === lyrics.length - 1 ||
                            (lyrics[index + 1]?.time || 0) > progress)
                            ? color
                              ? color[0]
                              : "#e4e4e7"
                            : "#71717a",
                      }}
                    >
                      {line.lyrics}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="flex h-[77dvh] justify-center items-center">
                  <p className="text-2xl fade-in">Lyrics not Found</p>
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
