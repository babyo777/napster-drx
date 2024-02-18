import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className=" relative  w-full">
      <div className="fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Page not found
      </div>
      <NavLink to={"/"}>
        <IoIosArrowBack className="h-7 w-7  my-5 mx-4  backdrop-blur-md text-black bg-white/70 rounded-full p-1" />
      </NavLink>
    </div>
  );
}

export default NotFound;
