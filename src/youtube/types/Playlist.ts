import type { Video } from "./Video";
import type { Channel } from "./Channel";
import type { Thumbnail } from "./Thumbnail";

export interface Playlist {
  id?: string;
  title?: string;
  videoCount: number;
  lastUpdate?: string;
  views?: number;
  url?: string;
  link?: string;
  channel?: Channel;
  thumbnail?: Thumbnail;
  videos: Video[];
}
