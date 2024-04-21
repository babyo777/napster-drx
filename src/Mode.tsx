import App from "./App";
import Auth from "./Auth";
import { useEffect, useState } from "react";

function Mode() {
  const [online, setOnline] = useState<boolean>(false);
  const [offline, setOffline] = useState<boolean>(false);
  useEffect(() => {
    const online = navigator.onLine;
    if (online) {
      setOnline(online);
    } else {
      setOffline(true);
    }
  }, [online]);

  if (online) {
    return <Auth />;
  }
  if (offline) {
    return <App />;
  }
}

export default Mode;
