import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function AppScreenshots() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem>
          <AspectRatio ratio={9 / 16} className="bg-muted rounded-md">
            <LazyLoadImage
              height="100%"
              width="100%"
              src="/ui/1.PNG"
              alt="ui"
              className="rounded-md object-cover h-[100%] w-[100%] "
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem>
          <AspectRatio ratio={9 / 16} className="bg-muted rounded-md">
            <LazyLoadImage
              height="100%"
              width="100%"
              src="/ui/2.PNG"
              alt="ui"
              className="rounded-md object-cover h-[100%] w-[100%] "
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem>
          <AspectRatio ratio={9 / 16} className="bg-muted rounded-md">
            <LazyLoadImage
              height="100%"
              width="100%"
              src="/ui/3.PNG"
              alt="ui"
              className="rounded-md object-cover h-[100%] w-[100%] "
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem>
          <AspectRatio ratio={9 / 16} className="bg-muted rounded-md">
            <LazyLoadImage
              height="100%"
              width="100%"
              src="/ui/4.PNG"
              alt="ui"
              className="rounded-md object-cover h-[100%] w-[100%] "
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem>
          <AspectRatio ratio={9 / 16} className="bg-muted rounded-md">
            <LazyLoadImage
              height="100%"
              width="100%"
              src="/ui/5.PNG"
              alt="ui"
              className="rounded-md object-cover h-[100%] w-[100%] "
            />
          </AspectRatio>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
