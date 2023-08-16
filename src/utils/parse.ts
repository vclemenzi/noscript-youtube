import type { Channel } from "../youtube/types/Channel";
import type { Playlist } from "../youtube/types/Playlist";
import type { Video } from "../youtube/types/Video";

export function parseDuration(duration: string): number {
  duration ??= "0:00";
  const args = duration.split(":");
  let dur = 0;

  switch (args.length) {
    case 3:
      dur = parseInt(args[0]) * 60 * 60 * 1000 + parseInt(args[1]) * 60 * 1000 + parseInt(args[2]) * 1000;
      break;
    case 2:
      dur = parseInt(args[0]) * 60 * 1000 + parseInt(args[1]) * 1000;
      break;
    default:
      dur = parseInt(args[0]) * 1000;
  }

  return dur;
}
