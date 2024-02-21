import { LazyLoadImage } from "react-lazy-load-image-component";

function Charts() {
  return (
    <>
      <div className="flex  flex-col px-4 py-2 pt-3">
        <h1 className="text-start font-semibold text-xl">Charts</h1>
      </div>

      <div className="flex items-center mt-0.5 overflow-x-scroll space-x-3 px-4">
        <div>
          <div className=" h-36 w-36">
            <LazyLoadImage
              width="100%"
              height="100%"
              effect="blur"
              src="/demo3.jpeg"
              alt="Image"
              className="rounded-lg object-cover h-[100%] w-[100%]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Charts;
