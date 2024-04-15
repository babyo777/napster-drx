import React, { useCallback, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { GetImage } from "@/API/api";
import { playlistSongs } from "@/Interface";
import { FiSend } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { DATABASE_ID, ID, TUNEBOX, db } from "@/appwrite/appwriteConfig";
import { useQuery } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/Store";
import { setLimit } from "@/Store/Player";

function TuneSongComp({ item }: { item: playlistSongs }) {
  const { id } = useParams();
  const [send, setSend] = useState<boolean>(false);
  const limit = useSelector((state: RootState) => state.musicReducer.limit);
  const dispatch = useDispatch();
  const handleSend = useCallback(() => {
    if (id) {
      setSend(true);
      if (limit !== 5) {
        dispatch(setLimit(limit + 1));
        db.createDocument(DATABASE_ID, TUNEBOX, ID.unique(), {
          youtubeId: item.youtubeId,
          title: item.title,
          artists: [
            item.artists[0]?.id || "unknown",
            item.artists[0]?.name || "unknown",
          ],
          thumbnailUrl: item.thumbnailUrl,
          for: id,
        })
          .then(() => {
            setSend(true);
          })
          .catch(() => {
            setSend(false);
          });
      }
    }
  }, [id, item, limit, dispatch]);

  const image = async () => {
    const response = await axios.get(GetImage + item.thumbnailUrl, {
      responseType: "arraybuffer",
    });
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    return URL.createObjectURL(blob);
  };

  const { data: c } = useQuery(["image", item.thumbnailUrl], image, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <div className="flex animate-fade-right py-2 px-[35dvw]  max-md:px-5 w-[100dvw] justify-between items-center">
      <div className=" flex space-x-2">
        <div className="h-14 w-14 space-y-2">
          <AspectRatio ratio={1 / 1}>
            <LazyLoadImage
              src={c ? c : "/cache.jpg"}
              width="100%"
              height="100%"
              effect="blur"
              alt="Image"
              loading="lazy"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                (e.currentTarget.src = "/liked.webp")
              }
              className="rounded-md object-cover h-[100%] w-[100%]"
            />
          </AspectRatio>
        </div>
        <div className="flex space-y-0.5 flex-col pl-1 text-start  ">
          <p
            className={`max-md:w-[55dvw] w-[20dvw] text-base  truncate font-semibold `}
          >
            {item?.title}
          </p>

          <p className="-mt-0.5 text-zinc-400 text-sm max-md:w-[50dvw] w-[17dvw]  truncate">
            {item.artists[0].name || "Unknown Artist"}
          </p>
        </div>
      </div>
      <div className=" -ml-1 text-xl">
        {send ? (
          <FiSend className="text-zinc-400" />
        ) : (
          <FiSend onClick={handleSend} />
        )}
      </div>
    </div>
  );
}

const TuneSong = React.memo(TuneSongComp);
export default TuneSong;
