import type { Channel } from "./Channel";
import type { Thumbnail } from "./Thumbnail";

export interface Video {
  id?: string;
  title?: string;
  description?: string;
  durationFormatted: string;
  duration: number;
  uploadedAt?: string;
  views: number;
  thumbnail?: Thumbnail;
  channel?: Channel;
  videos?: Video[];
  likes: number;
  dislikes: number;
  live: boolean;
  private: boolean;
  tags: string[];
  shorts: boolean;
  unlisted: boolean;
}
