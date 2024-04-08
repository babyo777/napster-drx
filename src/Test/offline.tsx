import React, { useState } from "react";

const Offline = () => {
  const [tracks, setTracks] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      const mp3Files = selectedFiles.filter((file) =>
        file.name.endsWith(".mp3")
      );
      //     const playlist:playlistSongs[] = [
      //       {

      // youtubeId: string;
      // for?: string;
      // title: string;
      // artists: artists[];
      // thumbnailUrl: string;
      //       }
      //     ]
      console.log(mp3Files);

      setTracks(mp3Files);
    }
  };

  return (
    <div>
      <h2>MP3 Tracks:</h2>
      <input type="file" accept=".mp3" multiple onChange={handleFileChange} />
      <ul>
        {tracks.map((track, index) => (
          <audio controls key={index} src={URL.createObjectURL(track)} />
        ))}
      </ul>
    </div>
  );
};

export default Offline;
