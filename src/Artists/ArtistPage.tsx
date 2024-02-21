import { GetArtistDetails } from "@/API/api";
import { ArtistDetails } from "@/Interface";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FaShare } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import { useQuery } from "react-query";
import { NavLink, useParams } from "react-router-dom";
import SuggestedArtist from "./SuggestedArtist";
import ArtistAlbums from "./ArtistAlbums";
import Loader from "@/components/Loaders/Loader";

function ArtistPage() {
  const { id } = useParams();
  const getArtistDetails = async () => {
    const list = await axios.get(`${GetArtistDetails}${id}`);
    return list.data as ArtistDetails;
  };

  const { data, isLoading, isError, refetch, isRefetching } =
    useQuery<ArtistDetails>(["playlist", id], getArtistDetails, {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 60 * 60000,
    });

  console.log(data);

  return (
    <>
      {isError && (
        <div className=" relative  w-full">
          <div className="fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            No artist found
          </div>
          <NavLink to={"/library/"}>
            <IoIosArrowBack className="h-7 w-7  my-5 mx-4  backdrop-blur-md text-black bg-white/70 rounded-full p-1" />
          </NavLink>
        </div>
      )}
      {isRefetching && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      )}
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      )}
      {data && (
        <div className="flex w-full h-[17rem]  relative ">
          <div className=" absolute top-4 z-10 left-3">
            <NavLink to={"/search/"}>
              <IoIosArrowBack className="h-8 w-8  backdrop-blur-md text-white bg-black/30 rounded-full p-1" />
            </NavLink>
          </div>

          <div className=" absolute top-4 z-10 right-3">
            <IoReload
              onClick={() => refetch()}
              className="h-8 w-8  backdrop-blur-md text-white bg-black/30 rounded-full p-1.5"
            />
          </div>

          <img
            width="100%"
            height="100%"
            src={data.thumbnails[0].url}
            alt="Image"
            loading="lazy"
            className="object-cover opacity-80 h-[100%] w-[100%]"
          />

          <div className=" absolute bottom-5 px-4 left-0  right-0">
            <h1 className="text-center  font-semibold py-2 text-2xl capitalize">
              {data.name}
            </h1>
            <div className="flex space-x-4 py-1 justify-center  items-center w-full">
              <Button
                type="button"
                variant={"ghost"}
                className="text-base py-5 text-zinc-100 shadow-none bg-white/20 backdrop-blur-md rounded-lg px-14"
              >
                <FaShare className="mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      )}

      {data && data.albums.length > 0 && (
        <div className="flex flex-col">
          <div className="flex  px-4 py-2 pt-3 ">
            <h1 className="text-start font-semibold text-xl">Albums</h1>
          </div>
          <div className="flex overflow-x-scroll items-center">
            {data.albums.map((s) => (
              <ArtistAlbums
                key={s.albumId}
                title={s.title}
                thumbnailUrl={s.thumbnailUrl}
                type={s.type}
                year={s.year}
                albumId={s.albumId}
              />
            ))}
          </div>
        </div>
      )}

      {data && data.singles.length > 0 && (
        <div className="flex flex-col">
          <div className="flex  px-4 py-2 pt-3 ">
            <h1 className="text-start font-semibold text-xl">Singles</h1>
          </div>
          <div className="flex overflow-x-scroll items-center">
            {data.singles.map((s) => (
              <ArtistAlbums
                key={s.albumId}
                title={s.title}
                thumbnailUrl={s.thumbnailUrl}
                type={s.type}
                year={s.year}
                albumId={s.albumId}
              />
            ))}
          </div>
        </div>
      )}

      {data && (
        <div className="flex flex-col">
          <div className="flex  px-4 py-2 pt-3 ">
            <h1 className="text-start font-semibold text-xl">
              Suggested Artist
            </h1>
          </div>
          <div className="flex overflow-x-scroll items-center">
            {data.suggestedArtists.map((s) => (
              <SuggestedArtist
                key={s.artistId}
                artistId={s.artistId}
                name={s.name}
                thumbnailUrl={s.thumbnailUrl}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ArtistPage;
