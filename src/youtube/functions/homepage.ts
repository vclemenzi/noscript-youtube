import axios from "axios";
import { next } from "./next";

export async function homepage() {
  const content = await axios.get(`https://www.youtube.com/?hl=en`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
    },
  });

  const html = content.data;

  let contents: any;

  try {
    contents = html.split("var ytInitialData = ")[1].split(";</script>")[0];
    contents =
      JSON.parse(contents).contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
        .richGridRenderer.contents;
  } catch {
    return [];
  }

  if (
    !contents ||
    !contents.length ||
    !contents.find((x: any) => Object.keys(x)[0] === "richItemRenderer")
  )
    return [];
  contents = contents
    .filter((a: any) => Object.keys(a)[0] === "richItemRenderer")
    .map((m: any) => m.richItemRenderer.content.videoRenderer);

  return next(contents, { homepage: true });
}
