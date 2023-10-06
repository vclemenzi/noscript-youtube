import axios from "axios";

export async function getKey(): Promise<string> {
  const content = await axios.get("https://www.youtube.com/?hl=en", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
    },
  });

  const key =
    content.data.split('INNERTUBE_API_KEY":"')[1]?.split('"')[0] ??
    content.data.split('innertubeApiKey":"')[1]?.split('"')[0];

  return key ?? "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
}
