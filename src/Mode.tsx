import { useNavigate } from "react-router-dom";
import Auth from "./Auth";
import Offline from "./Offline/offline";
import { useEffect } from "react";

function Mode() {
  const navigate = useNavigate();
  useEffect(() => {
    if (navigator.onLine) {
      navigate("/offline/");
    }
  });
  if (navigator.onLine) {
    return <Auth />;
  }
  return <Offline />;
}

export default Mode;
