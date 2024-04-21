import { useNavigate } from "react-router-dom";
import Auth from "./Auth";
import { useEffect } from "react";
import Offline from "./Offline/offline";

function Mode() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!navigator.onLine) {
      navigate("/offline/");
    }
  }, [navigate]);
  if (navigator.onLine) {
    return <Auth />;
  } else {
    return <Offline />;
  }
}

export default Mode;
