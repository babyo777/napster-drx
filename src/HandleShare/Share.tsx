import { useCallback } from "react";
import { GoShare } from "react-icons/go";
function Share() {
  const handleShare = useCallback(() => {
    navigator.share({
      url: window.location.href,
    });
  }, []);
  return (
    <div className="fade-in">
      <GoShare
        onClick={handleShare}
        className="h-8 w-8 fade-in   backdrop-blur-md text-white bg-black/30 rounded-full p-1.5"
      />
    </div>
  );
}

export default Share;
