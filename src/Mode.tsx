import { useNavigate } from "react-router-dom";
import Auth from "./Auth";
import { useEffect } from "react";

function Mode() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!navigator.onLine) {
      navigate("/offline/");
    }
  });
  if (navigator.onLine) {
    return <Auth />;
  }
}

export default Mode;
