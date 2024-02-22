import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function Artist() {
  return (
    <>
      <div className="flex flex-col px-4 py-2 pt-3 ">
        <h1 className="text-start font-semibold text-xl">Top Artist</h1>
      </div>
   <div className="flex overflow-x-scroll items-center">
      <div className="flex items-center mt-1 overflow-x-scroll  space-x-3 px-4">
        <Link to={"/artist/UCc6ZhmiYsVmBbiBqNhD6_1Q"}>
          <div>
            <div className=" h-20 w-20 mb-1">
              <LazyLoadImage
                width="100%"
                height="100%"
                effect="blur"
                src="https://lh3.googleusercontent.com/jxBMrpqmYuz-F0g_Q5WK3-m2tN7Pw2b6WJRYu22lxGfNZe1z7tdmkQaZKIZhZo2D4KZmDYJIeFhI7CM=w1080-h1080-p-l90-rj"
                alt="Image"
                className="rounded-full object-cover h-[100%] w-[100%]"
              />
            </div>
            <h1 className="text-center text-sm">Paradox</h1>
          </div>
        </Link>
        <Link to={"/artist/UCGvj8kfUV5Q6lzECIrGY19"}>
          <div>
            <div className=" h-20 w-20 mb-1">
              <LazyLoadImage
                width="100%"
                height="100%"
                effect="blur"
                src="https://lh3.googleusercontent.com/iVttpMqOcjor_Rt64WqL0iB8YJ3At97IGNer6qzhYQ7ffoqzVL7pEmxJXmItcZ2Sj_aRT_dewAg1ORg=w1080-h1080-p-l90-rj"
                alt="Image"
                className="rounded-full object-cover h-[100%] w-[100%]"
              />
            </div>
            <h1 className="text-center text-sm">Justin Bieber</h1>
          </div>
        </Link>
        <Link to={"/artist/UCof4hiuvv9BPhVCh90QHErw"}>
          <div>
            <div className=" h-20 w-20 mb-1">
              <LazyLoadImage
                width="100%"
                height="100%"
                effect="blur"
                src="https://lh3.googleusercontent.com/74NZ9fLNFPiSe13-72IemSw-GOMRjmS0fprqdDGte5Gymrwuy41jvIYIgo3g5-MakRYe9Fkl8hfVv5E=w1080-h1080-p-l90-rj"
                alt="Image"
                className="rounded-full object-cover h-[100%] w-[100%]"
              />
            </div>
            <h1 className="text-center text-sm">The Kid Laroi</h1>
          </div>
        </Link>
      </div>
  </div>
    </>
  );
}

export default Artist;
