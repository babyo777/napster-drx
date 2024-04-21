import Auth from "./Auth";
import Offline from "./Offline/offline";

function Mode() {
  if (navigator.onLine) {
    return <Auth />;
  }
  return <Offline />;
}

export default Mode;
