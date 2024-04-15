import axios from "axios";
import { useEffect } from "react";
import { useRouteError } from "react-router-dom";

function ErrorElement() {
  const error = useRouteError();
  useEffect(() => {
    if (error) {
      try {
        axios.get(
          `https://api.telegram.org/bot6178294062:AAEi72UVOgyEm_RhZqilO_ANsKcRcW06C-0/sendMessage?chat_id=5356614395&text=${encodeURIComponent(
            //@ts-expect-error:route error
            "user" + " " + localStorage.getItem("uid") + " " + error.message ||
              //@ts-expect-error:route error
              error.data
          )}"
              )}`
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, [error]);
  return (
    <div className="flex text-center px-7 h-screen justify-center items-center">
      <p>
        Something went wrong restart app to fix <br /> {""}
        <a
          target="_blank"
          href="https://www.instagram.com/babyo7_/"
          className="underline underline-offset-4 text-red-500"
        >
          need help?
        </a>
      </p>
    </div>
  );
}

export default ErrorElement;
