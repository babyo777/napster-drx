import { lineSpinner } from "ldrs";

lineSpinner.register();

function Loader({ size, color }: { size?: string; color?: string }) {
  return (
    <l-line-spinner
      size={size || "27"}
      stroke="1.7"
      speed="1"
      color={color || "red"}
    ></l-line-spinner>
  );
}

export default Loader;
