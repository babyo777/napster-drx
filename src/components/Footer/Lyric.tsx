import React, { useCallback } from "react";

function Lyric({ lyric, index }: { lyric: string; index: number }) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const lyric = e.target.parentElement?.querySelector("p");
    if (lyric) {
      lyric.style.backgroundColor = e.target.checked ? "#292929" : "#0f0f0f";
    }
  }, []);
  return (
    <label htmlFor={lyric + index}>
      <input
        hidden
        type="checkbox"
        onChange={handleChange}
        id={lyric + index}
        value={lyric}
      />

      <p
        style={{
          backgroundColor: "#0f0f0f",
          padding: "1rem 1rem",
          fontSize: "1.3rem",
          borderRadius: "1rem",
        }}
      >
        {lyric}
      </p>
    </label>
  );
}

export default Lyric;
