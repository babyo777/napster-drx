import { Link } from "react-router-dom";
import { AspectRatio } from "../ui/aspect-ratio";
import EditInfo from "./EditInfo";

function SavedLibraryCard({
  title,
  author,
  link,
  f,
  id,
}: {
  id: string;
  title?: string;
  author?: string;
  link?: string;
  f: string;
}) {
  return (
    <div className="flex space-x-2.5 items-center justify-between">
      <Link
        to={`/library/${link}?title=${title}`}
        className="flex space-x-2.5 items-center justify-between"
      >
        <div className="overflow-hidden h-[3.2rem]  w-[3.2rem] space-y-2">
          <AspectRatio ratio={1 / 1}>
            <img
              src="/demo2.jpeg"
              alt="Image"
              className="rounded-md object-cover w-[100%] h-[100%]"
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col text-xl text-start">
          <span className="w-[16rem]  truncate">{title || "Music"}</span>
          <span className="-mt-0.5 text-sm w-[14rem] truncate">
            {author || "NapsterDrx."}
          </span>
        </div>
      </Link>
      <EditInfo id={id} f={f} />
    </div>
  );
}

export default SavedLibraryCard;
