import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Header from "../Header/Header";
import { FaCirclePlay } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  DATABASE_ID,
  LISTEN_NOW_COLLECTION_ID,
  db,
} from "@/appwrite/appwriteConfig";
import { listen } from "@/Interface";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function ListenNowComp() {
  const plugin = React.useRef(
    Autoplay({ delay: 7000, stopOnInteraction: true })
  );
  const getData = async () => {
    const q = await db.listDocuments(DATABASE_ID, LISTEN_NOW_COLLECTION_ID);
    const data: listen[] = q.documents as unknown as listen[];
    return data;
  };

  const { data, isLoading } = useQuery<listen[]>("listenNow", getData, {
    refetchOnMount: false,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <Header title="Listen Now" />
      {isLoading && (
        <div className="flex justify-center items-center w-full">
          <Skeleton className="w-[90vw] h-52 rounded-xl bg-zinc-500" />
        </div>
      )}
      <div className="flex fade-in flex-col justify-center items-center">
        <Carousel
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
          className="w-[93vw]"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {data &&
              data.length > 0 &&
              data.map((listen) => (
                <CarouselItem key={listen.$id}>
                  <Link to={`/library/${listen.link}`}>
                    <div className="overflow-hidden relative">
                      <AspectRatio ratio={16 / 9}>
                        <LazyLoadImage
                          width="100%"
                          height="100%"
                          effect="blur"
                          src={listen.cover}
                          alt="Image"
                          className="rounded-xl object-cover h-[100%] w-[100%]"
                        />
                      </AspectRatio>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
      {isLoading && (
        <div className="flex justify-center mt-4 items-center w-full">
          <Skeleton className="w-[90vw] h-[19rem] rounded-xl bg-zinc-500" />
        </div>
      )}
      <div className="flex fade-in flex-col mt-4 justify-center items-center">
        <Carousel
          plugins={[plugin.current]}
          className="w-[93vw]"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {data && data.length > 0 && (
              <CarouselItem key={data[1].$id}>
                <div className="overflow-hidden relative">
                  <AspectRatio ratio={4 / 3}>
                    <LazyLoadImage
                      width="100%"
                      height="100%"
                      effect="blur"
                      src={data[1].cover}
                      alt="Image"
                      className="rounded-xl object-cover h-[100%] w-[100%]"
                    />
                  </AspectRatio>
                </div>
                <Link to={`/library/${data[1].link}`}>
                  <FaCirclePlay className=" backdrop-blur-xl absolute h-11 w-11 bottom-4 right-4" />
                </Link>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}

const ListenNow = React.memo(ListenNowComp);
export default ListenNow;
