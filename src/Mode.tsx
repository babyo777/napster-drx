import Auth from "./Auth";
import { useEffect, useState } from "react";
import Check from "./components/Check";

function Mode() {
  const [online, setOnline] = useState<boolean>(false);
  useEffect(() => {
    const online = navigator.onLine;
    setOnline(online);
  }, [online]);

  if (online) {
    return <Auth />;
  } else {
    return <Check />;
  }
}

export default Mode;
