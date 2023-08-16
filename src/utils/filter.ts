export function filter(type: string): string {
  switch (type) {
    case "playlist":
      return "EgIQAw%253D%253D";
    case "video":
      return "EgIQAQ%253D%253D";
    case "channel":
      return "EgIQAg%253D%253D";
    case "film":
      return "EgIQBA%253D%253D";
    default:
      throw new TypeError(`Invalid filter type "${type}"!`);
  }
}
