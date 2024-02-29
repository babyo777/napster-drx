import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { SiGithubsponsors } from "react-icons/si";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { FaSnapchat } from "react-icons/fa6";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DATABASE_ID, SPONSORS, db } from "@/appwrite/appwriteConfig";
import { Sponsors } from "@/Interface";
import { useQuery } from "react-query";
import Loader from "./Loaders/Loader";

function SponsorsComp() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const getSponsors = async () => {
    const data = await db.listDocuments(DATABASE_ID, SPONSORS);
    return data.documents as unknown as Sponsors[];
  };

  const { data, isLoading } = useQuery<Sponsors[]>("sponsors", getSponsors, {
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <p className=" rounded-xl flex items-center justify-center bg-zinc-800  py-2.5 mt-3  w-full text-base">
          <SiGithubsponsors className="mr-2 fill-pink-400" /> Sponsor
        </p>
      </DialogTrigger>
      <DialogContent className="w-[87vw]  rounded-2xl">
        <DialogHeader>
          <DialogTitle className="  text-lg">Sponsors</DialogTitle>
        </DialogHeader>
        {isLoading && (
          <div className="py-4 w-full rounded-xl flex justify-center flex-col  space-y-2 items-center">
            <Loader />
          </div>
        )}
        {data && (
          <Carousel
            plugins={[plugin.current]}
            className="w-full rounded-xl"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="rounded-xl">
              {data.map((sponsor) => (
                <CarouselItem
                  key={sponsor.image}
                  className="rounded-xl fade-in flex flex-col  justify-center items-center"
                >
                  <div className="py-2 w-full rounded-xl flex justify-center flex-col  space-y-2 items-center">
                    <Avatar className="h-16 w-14">
                      <AvatarImage src={sponsor.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className=" text-base py-1 capitalize">{sponsor.name}</p>
                    <div className="flex space-x-3 justify-center items-center">
                      {sponsor.snapchat && (
                        <a href={sponsor.snapchat}>
                          <FaSnapchat className="w-5 h-5" />
                        </a>
                      )}
                      {sponsor.instagram && (
                        <a href={sponsor.instagram}>
                          <FaInstagram className="w-5 h-5" />
                        </a>
                      )}
                      {sponsor.twitter && (
                        <a href={sponsor.twitter}>
                          <FaXTwitter className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        <DialogFooter>
          <Button
            asChild
            onClick={() => alert("adding soon...")}
            variant={"secondary"}
            className=" py-5 w-full rounded-xl"
          >
            <p>Become a Sponsor</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { SponsorsComp };
