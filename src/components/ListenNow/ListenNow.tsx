import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Header from "../Header/Header";
// import { FaCirclePlay } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import {
//   DATABASE_ID,
//   LISTEN_NOW_COLLECTION_ID,
//   db,
// } from "@/appwrite/appwriteConfig";
// import { listen } from "@/Interface";
// import { useQuery } from "react-query";
import Artist from "./Artist";
import Charts from "./Charts";

export function ListenNowComp() {
  const plugin = React.useRef(
    Autoplay({ delay: 7000, stopOnInteraction: true })
  );
  // const getData = async () => {
  //   const q = await db.listDocuments(DATABASE_ID, LISTEN_NOW_COLLECTION_ID);
  //   const data: listen[] = q.documents as unknown as listen[];
  //   return data;
  // };

  // const { data } = useQuery<listen[]>("listenNow", getData, {
  //   refetchOnMount: false,
  //   staleTime: 10000,
  //   refetchOnWindowFocus: false,
  // });
  return (
    <>
      <Header title="Listen Now" />
      <div className="flex  flex-col px-4 pb-1">
        <h1 className="text-start font-semibold text-xl">Suggested</h1>
      </div>
      <div className=" flex justify-center mt-2">
        <Carousel
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
          className="w-[93vw]"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            <CarouselItem>
              <Link to={`/library/`}>
                <div className="overflow-hidden h-36 rounded-lg  relative">
                  <AspectRatio ratio={16 / 9}>
                    <LazyLoadImage
                      width="100%"
                      height="100%"
                      effect="blur"
                      src="/demo3.jpeg"
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

      <Charts />
      <Artist />
    </>
  );
}

const ListenNow = React.memo(ListenNowComp);
export default ListenNow;
