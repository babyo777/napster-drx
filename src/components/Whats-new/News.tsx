import { Alert, AlertDescription } from "../ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { DATABASE_ID, UPDATES, db } from "@/appwrite/appwriteConfig";
function News() {
  const [close, setClose] = useState<boolean>(false);

  useEffect(() => {
    db.getDocument(
      DATABASE_ID,
      UPDATES,
      localStorage.getItem("uid") || "default"
    )
      .then(() => setClose(false))
      .catch(() => setClose(true));
  }, []);
  const handleClose = () => {
    setClose(false);
    db.createDocument(
      DATABASE_ID,
      UPDATES,
      localStorage.getItem("uid") || "default",
      {
        user: localStorage.getItem("uid"),
      }
    ).then(() => {
      setClose(false);
    });
  };
  return (
    <>
      {close && (
        <div className=" fixed w-full px-4">
          <Alert className=" fade-in bg-zinc-800 rounded-xl  top-5 ">
            <AlertDescription>
              <div className="flex items-center justify-between space-x-2">
                <Avatar className="h-9 w-9">
                  <LazyLoadImage
                    effect="blur"
                    src="https://static-00.iconduck.com/assets.00/spotify-icon-2048x2048-5gqpkwih.png"
                  />
                </Avatar>
                <span className="text-xs">
                  Soon you will be able to transfer your spotify playlists.
                </span>
                <Button
                  onClick={handleClose}
                  className="text-xs py-1.5 bg-zinc-600 font-normal hover:bg-zinc-700 text-white px-3 rounded-md h-fit"
                >
                  Close
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}

export default News;
