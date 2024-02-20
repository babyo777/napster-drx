import { LazyLoadImage } from "react-lazy-load-image-component";

function Charts() {
  return (
    <>
      <div className="flex  flex-col px-4 py-3">
        <h1 className="text-start font-semibold text-xl">Charts</h1>
      </div>

      <div className="flex items-center overflow-scroll space-x-3 px-4">
        <div>
          <div className=" h-32 w-32">
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
