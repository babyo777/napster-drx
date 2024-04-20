import { useEffect, useState } from "react";
import Loader from "./components/Loaders/Loader";

import Check from "./components/Check";
import authService from "./appwrite/appwriteConfig";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import { SetLoggedIn } from "./Store/Player";

function Auth() {
  const LoggedIn = useSelector((state: RootState) => state.musicReducer);
  const dispatch = useDispatch();
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    try {
      const token = localStorage.getItem("uid");
      if (!token) localStorage.setItem("uid", v4());

      authService
        .getUser()
        .then(() => {
          dispatch(SetLoggedIn(true));
        })
        .catch(async (error) => {
          if (token && error) {
            await authService.createAccount(`${token}@napster.com`, token);
            dispatch(SetLoggedIn(true));
          }
        });
    } catch (error) {
      setError(true);
    }
  }, [dispatch]);
  if (error) {
    return (
      <div className=" w-full flex flex-col px-5 font-semibold text-2xl leading-tight tracking-tight justify-center items-center h-dvh">
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
        <div className=" w-full flex flex-col  leading-tight tracking-tight justify-center items-center h-dvh">
          <Loader />
          <p>Authenticating</p>
        </div>
      )}
    </>
  );
}

export default Auth;
