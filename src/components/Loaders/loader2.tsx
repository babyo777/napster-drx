import { lineSpinner } from "ldrs";
lineSpinner.register();
function Loader2() {
  return (
    <l-line-spinner
      size="40"
      stroke="3"
      speed="1"
      color="grey"
    ></l-line-spinner>
  );
}

export default Loader2;
