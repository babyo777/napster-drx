import { useCallback, useEffect, useState } from "react";
import Check from "./components/Check";
import authService from "./appwrite/appwriteConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import { v4 } from "uuid";
import { SetLoggedIn } from "./Store/Player";
import Loader2 from "./components/Loaders/loader2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Auth() {
  const LoggedIn = useSelector(
    (state: RootState) => state.musicReducer.loggedIn
  );
  const dispatch = useDispatch();
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("authenticating");
  const navigate = useNavigate();
  useEffect(() => {
    const online = navigator.onLine;
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
        const uid = localStorage.getItem("uid");
        setStatus("setting email");
        localStorage.setItem("em", `${uid}@napster.com`);
      }

      const CheckPassword = localStorage.getItem("pp");
      const CheckUid = localStorage.getItem("uid");
      const CheckEmail = localStorage.getItem("em");

      setStatus("authenticating");
      const isUserLoggedIn = await authService.isUserLoggedIn();
      setStatus("Logging in..");
      if (isUserLoggedIn) {
        dispatch(SetLoggedIn(true));
      } else {
        setStatus("Account Not Found");
        if (CheckPassword && CheckUid && CheckEmail) {
          setStatus("creating account");
          const account = await authService.createAccount(
            CheckUid,
            CheckEmail,
            CheckPassword
          );
          setStatus("Account Created");
          setStatus("authenticating");
          if (account) {
            dispatch(SetLoggedIn(true));
          }
        }
      }
    };
    authorize().catch((error) => {
      if (!online) {
        dispatch(SetLoggedIn(true));
        navigate("/offline/");
      } else {
        console.log(error);
        axios.get(
          `https://api.telegram.org/bot6178294062:AAEi72UVOgyEm_RhZqilO_ANsKcRcW06C-0/sendMessage?chat_id=5356614395&text=${encodeURIComponent(
            error + " " + localStorage.getItem("uid") ||
              error.message + " " + localStorage.getItem("uid")
          )}`
        );
        setError(true);
      }
    });
  }, [dispatch, navigate]);

  const handleSwitch = useCallback(async () => {
    const id = prompt("Enter your token");
    if (id) {
      const pass = prompt("Enter your password");
      if (id && pass) {
        try {
          await authService.login(`${id}@napster.com`, pass);
          localStorage.setItem("uid", id);
          localStorage.setItem("pp", pass);
          window.location.reload();
        } catch (error) {
          //@ts-expect-error:ignore
          alert(error.message);
        }
      }
    }
  }, []);

  if (error) {
    return (
      <div className=" w-full flex flex-col px-5 font-semibold text-2xl leading-tight tracking-tight animate-fade-up text-center items-center justify-center h-dvh">
        <p>
          Can't Authorize ! Please Contact{" "}
          <a href="mailto:yfw111realone@gmail.com">
            <span className=" text-red-500">@tanmay </span>{" "}
          </a>
          <span> or try </span>
          <span className="text-red-500 " onClick={handleSwitch}>
            login manually
          </span>
        </p>
      </div>
    );
  }
  return (
    <>
      {LoggedIn ? (
        <Check />
      ) : (
        <div className=" w-full flex flex-col  leading-tight tracking-tight justify-center items-center h-dvh transition-all duration-500 space-y-3 font-medium text-lg capitalize">
          <Loader2 />
          <p>{status}</p>
        </div>
      )}
    </>
  );
}

export default Auth;
