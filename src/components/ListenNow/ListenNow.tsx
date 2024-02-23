import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  DATABASE_ID,
  LISTEN_NOW_COLLECTION_ID,
  db,
} from "@/appwrite/appwriteConfig";
import { homePagePlaylist } from "@/Interface";
import { useQuery } from "react-query";
import Artist from "./Artist";
import Charts from "./Charts";
import ListenNo from "./NewListen";
import { Query } from "appwrite";

export function ListenNowComp() {
  const plugin = React.useRef(
    Autoplay({ delay: 7000, stopOnInteraction: true })
  );

  const getChart = async () => {
    const q = await db.listDocuments(DATABASE_ID, LISTEN_NOW_COLLECTION_ID, [
      Query.equal("type", ["playlist"]),
    ]);
    const data: homePagePlaylist[] =
      q.documents as unknown as homePagePlaylist[];
    return data;
  };

  const getArtist = async () => {
    const q = await db.listDocuments(DATABASE_ID, LISTEN_NOW_COLLECTION_ID, [
      Query.notEqual("type", ["playlist"]),
    ]);
    const data: homePagePlaylist[] =
      q.documents as unknown as homePagePlaylist[];
    return data;
  };

  const { data: chart } = useQuery<homePagePlaylist[]>("chart", getChart, {
    refetchOnMount: false,
    staleTime: 5 * 60000,
    refetchOnWindowFocus: false,
  });

  const { data: artist } = useQuery<homePagePlaylist[]>("artist", getArtist, {
    refetchOnMount: false,
    staleTime: 5 * 60000,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {!chart && !artist && <ListenNo />}
      {chart && artist && (
        <>
          <Header title="Listen Now" />

          <div className="flex  flex-col px-4 pb-1 no-scrollbar">
            <h1 className="text-start font-semibold text-xl">What's New ?</h1>
          </div>
          <div className=" flex justify-center items-center w-full mt-2 px-4 no-scrollbar">
            <Carousel
              plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
              className="w-[93vw]"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                <CarouselItem>
                  <Link to={`/`}>
                    <div className="overflow-hidden h-32 rounded-lg  relative">
                      <AspectRatio ratio={16 / 8}>
                        <LazyLoadImage
                          width="100%"
                          height="100%"
                          effect="blur"
                          src="/demo4.jpeg"
                          alt="Image"
                          className="rounded-lg object-cover h-[100%] w-[100%]"
                        />
                      </AspectRatio>
                    </div>
                  </Link>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

          <Charts data={chart} />
          <Artist data={artist} />
        </>
      )}
    </div>
  );
}

const ListenNow = React.memo(ListenNowComp);
export default ListenNow;
