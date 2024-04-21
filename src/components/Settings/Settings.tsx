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
import { DialogClose } from "../ui/dialog";
import { RootState } from "@/Store/Store";
import { useDispatch, useSelector } from "react-redux";
import { Account } from "./Account";
import authService, {
  DATABASE_ID,
  NEW_USER,
  db,
} from "@/appwrite/appwriteConfig";
import { Query } from "appwrite";
import { useQuery } from "react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getSpotifyProfile } from "@/API/api";
import axios from "axios";
import { setUser } from "@/Store/Player";

function Settings() {
  const close = useRef<HTMLButtonElement>(null);
  const handleReset = useCallback(async () => {
    const reset = confirm(
      "Save Your Token Before Logout. Are you sure you want to logout?"
    );
    if (reset)
      await authService.logout(), localStorage.clear(), location.reload();
  }, []);
  const handleLoad = useCallback(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      const l = prompt("Enter Shared Token");
      if (l && l?.trim() != "") {
        db.listDocuments(DATABASE_ID, NEW_USER, [
          Query.equal("user", [uid]),
        ]).then(async (result) => {
          if (result.documents[0]) {
            await authService.logout();
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
  const dispatch = useDispatch();
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
          `${getSpotifyProfile}${result.documents[0].spotifyId}`
        );
        const code = res.data;

        if (result.documents[0].spotifyId) {
          dispatch(setUser(true));
        }
        console.log(code);

        return code;
      }
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
        {imSrc && imSrc[0].image.length > 0 ? (
          <Avatar className="animate-fade-left h-9 w-9 p-0 m-0 -mr-0.5">
            <AvatarImage
              className="rounded-full object-cover h-[100%] w-[100%]"
              src={imSrc[0].image}
            ></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <FaUserCircle className="h-7 w-7 animate-fade-left text-zinc-100" />
        )}
      </DrawerTrigger>
      <DrawerContent className="px-5 h-dvh rounded-none">
        <DrawerHeader className="animate-fade-up">
          <DrawerTitle className="text-zinc-400 animate-fade-up font-bold">
            Settings
          </DrawerTitle>
        </DrawerHeader>
        <Account className="text-start px-4" />
        <div className="animate-fade-up">
          <p
            onClick={handleLoad}
            className=" rounded-xl hidden py-2.5 mt-3 animate-fade-up bg-neutral-900 flex text-start   px-4  text-base "
          >
            Load From Token
          </p>
        </div>
        {/iPhone/i.test(navigator.userAgent) && (
          <div className="animate-fade-up">
            <p
              onClick={handleLoadPlaylist}
              className=" rounded-xl py-2.5 mt-3 animate-fade-up bg-neutral-900 flex text-start   px-4  text-base "
            >
              Load Playlist
            </p>
          </div>
        )}

        {/* <p
          onClick={() => window.open("https://tanmayo7.vercel.app")}
          className=" rounded-xl py-2.5 mt-3 bg-neutral-900 flex justify-center text-base "
        >
          More by babyo7_
        </p> */}
        {/* <SponsorsComp /> */}
        {!track && (
          <SpotifyTransfer close={close} className="text-start px-4" />
        )}
        <div className="animate-fade-up">
          <p
            onClick={() =>
              (window.location.href = "mailto:yfw111realone@gmail.com")
            }
            className=" animate-fade-up rounded-xl py-2.5 mt-3 bg-neutral-900 flex px-4 text-base "
          >
            Feedback & Suggestion
          </p>
        </div>
        <div className="animate-fade-up">
          <p
            onClick={() => window.open("https://tanmay-seven.vercel.app/")}
            className=" animate-fade-up rounded-xl py-2.5 mt-3 bg-neutral-900 flex px-4 text-base "
          >
            Connect with Me
          </p>
        </div>
        <DialogClose ref={close}></DialogClose>
        <DrawerFooter className="animate-fade-up items-center w-full px-0">
          <div className="flex space-x-2 w-full items-center">
            <Token />
            <div className="w-full">
              <p
                onClick={handleReset}
                className=" font-semibold rounded-xl animate-fade-up  py-2.5 mt-3 flex justify-center bg-red-500 text-base "
              >
                Log out
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
