import { LazyLoadImage } from "react-lazy-load-image-component";

function Artist() {
  return (
    <>
      <div className="flex flex-col px-4 py-3">
        <h1 className="text-start font-semibold text-xl">Top Artist</h1>
      </div>
      <div className="flex items-center overflow-scroll space-x-3 px-4">
        <div>
          <div className=" h-20 w-20 mb-1">
            <LazyLoadImage
              width="100%"
              height="100%"
              effect="blur"
              src="/demo3.jpeg"
              alt="Image"
              className="rounded-full object-cover h-[100%] w-[100%]"
            />
          </div>
          <h1 className="text-center text-sm">Name</h1>
        </div>
      </div>
    </>
  );
}

export default Artist;
