import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function Charts() {
  return (
    <>
      <div className="flex  flex-col px-4 py-2 pt-3">
        <h1 className="text-start font-semibold text-xl">Charts</h1>
      </div>

      <div className="flex items-center mt-0.5 overflow-x-scroll  space-x-3 px-4">
        <Link to={"/library/PL4fGSI1pDJn6puJdseH2Rt9sMvt9E2M4i"}>
          <div>
            <div className=" h-36 w-36">
              <LazyLoadImage
                width="100%"
                height="100%"
                effect="blur"
                src="https://yt3.ggpht.com/jP0CCz5o3xRYOHu0c58Pvody-wIijRY5DlPJpZ6NGe6k1IORSbr8Ml2hqZWO2cQTy2GGUJHpTPY=s1200"
                alt="Image"
                className="rounded-lg object-cover h-[100%] w-[100%]"
              />
            </div>
          </div>
        </Link>
        <Link to={"/library/PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG"}>
          <div>
            <div className=" h-36 w-36">
              <LazyLoadImage
                width="100%"
                height="100%"
                effect="blur"
                src="https://yt3.googleusercontent.com/n-iATsGuz9TKoQwM4iETGlQSPbpxf4mJKTtimf-avWuolG8dc1BOv0yVuZAHaAVkjSxoS4WUCozw=s1200"
                alt="Image"
                className="rounded-lg object-cover h-[100%] w-[100%]"
              />
            </div>
          </div>
        </Link>
        <Link to={"/library/PL4fGSI1pDJn4pTWyM3t61lOyZ6_4jcNOw"}>
          <div>
            <div className=" h-36 w-36">
              <LazyLoadImage
                width="100%"
                height="100%"
                effect="blur"
                src="https://yt3.ggpht.com/WRer-n1iCqDEqz2YRNeolHVZoRpoBIliHnZ01-3_UREXUMfLTv9DAa_1OSMMtNGu9lWMHkO_dSE=s1200"
                alt="Image"
                className="rounded-lg object-cover h-[100%] w-[100%]"
              />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Charts;
