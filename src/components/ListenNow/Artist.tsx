import { homePagePlaylist } from "@/Interface";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function Artist({ data }: { data: homePagePlaylist[] }) {
  return (
    <>
      {data && (
        <>
          <div className="flex flex-col px-4 py-2 pt-3 ">
            <h1 className="text-start font-semibold text-xl">Top Artist</h1>
          </div>
          <div className="flex  space-x-4 px-4 overflow-x-auto pb-4 items-center">
            {data.map((artist) => (
              <Link to={`/artist/${artist.url}`} key={artist.url}>
                <div className="flex items-center mt-1 overflow-x-scroll py-1 ">
                  <div>
                    <div className=" h-20 w-20 mb-1">
                      <LazyLoadImage
                        width="100%"
                        height="100%"
                        effect="blur"
                        src={artist.image}
                        alt="Image"
                        className="rounded-full object-cover h-[100%] w-[100%]"
                      />
                    </div>
                    <h1 className="text-center text-sm truncate  w-20">
                      {artist.type}
                    </h1>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Artist;
