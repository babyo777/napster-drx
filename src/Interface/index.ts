interface songs {
  id: number;
  title: string;
  artist: string;
  audio: string;
  cover: string;
}

interface listen {
  $id: string;
  cover: string;
  link: string;
}

interface trending {
  song: string;
}

interface savedPlaylist {
  name: string;
  creator: string;
  link: string;
  for: string | null;
}
export type { songs, listen, trending, savedPlaylist };
