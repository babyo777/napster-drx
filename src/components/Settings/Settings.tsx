import { FaUserCircle } from "react-icons/fa";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SpotifyTransfer } from "../SpotifyTransfer";
import { useCallback, useRef } from "react";
import { Token } from "../Token";
// import { SponsorsComp } from "../Sponsors";
import { DialogClose } from "../ui/dialog";
import { RootState } from "@/Store/Store";
import { useSelector } from "react-redux";
import { Account } from "./Account";
import { DATABASE_ID, NEW_USER, db } from "@/appwrite/appwriteConfig";
import { Query } from "appwrite";
import { useQuery } from "react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserApi } from "@/API/api";
import axios from "axios";

function Settings() {
  const close = useRef<HTMLButtonElement>(null);
  const handleReset = useCallback(() => {
    const reset = confirm("Are you sure you want to reset");
    if (reset)
      localStorage.clear(), alert("successfully reset"), location.reload();
  }, []);
  const handleLoad = useCallback(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      const l = prompt("Enter Shared Token");
      if (l && l?.trim() != "") {
        db.listDocuments(DATABASE_ID, NEW_USER, [
          Query.equal("user", [uid]),
        ]).then((result) => {
          if (result.documents[0]) {
            localStorage.setItem("uid", l);
            location.reload();
          } else {
            alert("User not found with requested Uid!");
          }
        });
      }
    }
  }, []);
  const handleLoadPlaylist = useCallback(() => {
    const l = prompt("Enter Shared Playlist Link");
    if (l && l?.trim() != "") {
      if (l.startsWith(window.location.origin)) {
        window.location.href = l;
      } else {
        alert("invalid link");
      }
    }
  }, []);

  const track = useSelector(
    (state: RootState) => state.musicReducer.spotifyTrack
  );
  const uid = useSelector((state: RootState) => state.musicReducer.uid);

  const handleImage = async () => {
    if (uid) {
      const result = await db.listDocuments(DATABASE_ID, NEW_USER, [
        Query.equal("user", [uid]),
      ]);
      if (
        result.documents[0].image.length > 0 &&
        result.documents[0].name.length > 0
      ) {
        const res = await axios.get(
          `${getUserApi}${result.documents[0].spotifyId}`
        );
        const code = res.data;
        await db.updateDocument(
          DATABASE_ID,
          NEW_USER,
          result.documents[0].$id,
          {
            image: code.image,
            name: code.name,
          }
        );
      }

      return result.documents[0];
    }
  };

  const { data: imSrc } = useQuery("dpImage", handleImage, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return (
    <Drawer>
      <DrawerTrigger>
        {imSrc && imSrc.image.length > 0 ? (
          <Avatar className="animate-fade-left h-9 w-9 p-0 m-0 -mr-0.5">
            <AvatarImage src={imSrc.image}></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <FaUserCircle className="h-7 w-7 animate-fade-left text-zinc-100" />
        )}
      </DrawerTrigger>
      <DrawerContent className="px-5 h-dvh bg-neutral-950">
        <DrawerHeader>
          <DrawerTitle className="text-zinc-400 animate-fade-up font-bold">
            Napster Settings
          </DrawerTitle>
        </DrawerHeader>
        <Account />
        <p
          onClick={handleLoad}
          className=" rounded-xl py-2.5 mt-3 animate-fade-up bg-neutral-900 flex justify-center  text-base"
        >
          Load From Token
        </p>
        {/iPhone/i.test(navigator.userAgent) && (
          <p
            onClick={handleLoadPlaylist}
            className=" rounded-xl py-2.5 mt-3 animate-fade-up bg-neutral-900 flex justify-center  text-base"
          >
            Load Playlist
          </p>
        )}

        {/* <p
          onClick={() => window.open("https://tanmayo7.vercel.app")}
          className=" rounded-xl py-2.5 mt-3 bg-neutral-900 flex justify-center text-base "
        >
          More by babyo7_
        </p> */}
        {/* <SponsorsComp /> */}
        {!track && <SpotifyTransfer close={close} />}
        <p
          onClick={() =>
            (window.location.href = "mailto:yfw111realone@gmail.com")
          }
          className=" animate-fade-up rounded-xl py-2.5 mt-3 bg-neutral-900 flex justify-center text-base "
        >
          Feedback
        </p>
        <DialogClose ref={close}></DialogClose>
        <DrawerFooter className=" items-center w-full px-0">
          <div className="flex space-x-2 w-full items-center">
            <Token />
            <div className="w-full">
              <p
                onClick={handleReset}
                className=" rounded-xl animate-fade-up  py-2.5 mt-3 flex justify-center bg-red-500 text-base "
              >
                Reset
              </p>
            </div>
          </div>
          <span className="text-xs text-zinc-300 animate-fade-up">
            Version - 1.2.7 beta
          </span>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Settings;
