import { useEffect, useState } from "react";
import Check from "./components/Check";
import authService from "./appwrite/appwriteConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import { v4 } from "uuid";
import { SetLoggedIn } from "./Store/Player";
import Loader2 from "./components/Loaders/loader2";

function Auth() {
  const LoggedIn = useSelector(
    (state: RootState) => state.musicReducer.loggedIn
  );
  const dispatch = useDispatch();
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("authenticating");
  useEffect(() => {
    const authorize = async () => {
      const password = localStorage.getItem("pp");
      const uid = localStorage.getItem("uid");
      const email = localStorage.getItem("em");
      const noPass = v4();
      const noUid = v4();
      if (!password) {
        setStatus("Setting password");
        localStorage.setItem("pp", noPass);
      }
      if (!uid) {
        setStatus("setting uid");
        localStorage.setItem("uid", noUid);
      }
      if (!email) {
        setStatus("setting email");
        localStorage.setItem("em", `${noUid}@napster.com`);
      }

      setStatus("authenticating");
      const isUserLoggedIn = await authService.isUserLoggedIn();
      if (isUserLoggedIn) {
        dispatch(SetLoggedIn(true));
      } else {
        setStatus("creating account");
        if (email && password && uid) {
          const account = await authService.createAccount(uid, email, password);
          if (account) {
            dispatch(SetLoggedIn(true));
          }
        }
      }
    };
    authorize().catch((error) => {
      console.log(error);
      setError(true);
    });
  }, [dispatch]);
  if (error) {
    return (
      <div className=" w-full flex flex-col px-5 font-semibold text-2xl leading-tight tracking-tight animate-fade-up justify-center items-center h-dvh">
        <p>
          Can't Authorize ! Please Contact{" "}
          <a
            href="mailto:yfw111realone@gmail.com"
            className=" underline-offset-2 underline text-red-500"
          >
            @tanmay
          </a>
        </p>
      </div>
    );
  }
  return (
    <>
      {LoggedIn ? (
        <Check />
      ) : (
        <div className=" w-full flex flex-col  leading-tight tracking-tight justify-center items-center h-dvh transition-all duration-500 space-y-3 font-medium text-2xl capitalize">
          <div className="animate-fade-down">
            <Loader2 />
          </div>
          <p className=" animate-fade-up">{status}</p>
        </div>
      )}
    </>
  );
}

export default Auth;
