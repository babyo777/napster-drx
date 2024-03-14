import { lineSpinner } from "ldrs";

lineSpinner.register();

function Loader({
  size,
  color,
  stroke,
  loading,
}: {
  size?: string;
  loading?: boolean;
  color?: string;
  stroke?: string;
}) {
  return (
    <div className="flex flex-col space-y-2 justify-center items-center text-xs font-normal">
      <l-line-spinner
        size={size || "30"}
        stroke={stroke || "1.7"}
        speed="1"
        color={color || "gray"}
      ></l-line-spinner>
      {!loading && <p>Loading...</p>}
    </div>
  );
}

export default Loader;
