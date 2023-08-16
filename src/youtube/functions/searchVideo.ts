import axios from "axios";
import { getKey } from "../../utils/key";
import { parseDuration } from "../../utils/parse";
import type { Video } from "../types/Video";

// TODO: Make it more clean and type safe

export async function searchVideo(query: string): Promise<Video[]> {
  const key = await getKey(); // Generate youtube api key

  // Make the request
  const response = await axios({
    url: "https://www.youtube.com/youtubei/v1/search",
    method: "POST",
    headers: {
      cookie: 'CONSENT=PENDING%2B984',
      'Content-Type': 'application/json'
    },
    params: {
      key: key
    },
    data: {
      query: query,
      filter: "EgIQAQ%253D%253D",
      context: {
        client: {
          utcOffsetMinutes: 0,
          gl: "US",
          hl: "en",
          clientName: "WEB",
          clientVersion: "1.20220406.00.00",
          originalUrl: `https://www.youtube.com/`
        },
      },
    }
  });

  // Parse the videos and return
  const videos: any[] = response.data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;

  return videos.map((data: any) => {
    if (!data.videoRenderer) return;

    return {
      id: data.videoRenderer.videoId,
      title: data.videoRenderer.title.runs[0].text,
      description: data.videoRenderer.descriptionSnippet && data.videoRenderer.descriptionSnippet.runs[0] ? data.videoRenderer.descriptionSnippet.runs[0].text : "",
      duration: data.videoRenderer.lengthText ? parseDuration(data.videoRenderer.lengthText.simpleText) : 0,
      thumbnail: {
        id: data.videoRenderer.videoId,
        url: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].url,
        height: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].height,
        width: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].width
      },
      channel: {
        id: data.videoRenderer.ownerText.runs[0].navigationEndpoint.browseEndpoint.browseId || null,
        name: data.videoRenderer.ownerText.runs[0].text || null,
        icon: {
          url: data.videoRenderer.channelThumbnail?.thumbnails?.[0]?.url || data.videoRenderer.channelThumbnailSupportedRenderers?.channelThumbnailWithLinkRenderer?.thumbnail?.thumbnails?.[0]?.url,
          width: data.videoRenderer.channelThumbnail?.thumbnails?.[0]?.width || data.videoRenderer.channelThumbnailSupportedRenderers?.channelThumbnailWithLinkRenderer?.thumbnail?.thumbnails?.[0]?.width,
          height: data.videoRenderer.channelThumbnail?.thumbnails?.[0]?.height || data.videoRenderer.channelThumbnailSupportedRenderers?.channelThumbnailWithLinkRenderer?.thumbnail?.thumbnails?.[0]?.height
        },
        verified: Boolean((data.videoRenderer.ownerBadges && data.videoRenderer.ownerBadges[0])?.metadataBadgeRenderer?.style?.toLowerCase().includes("verified"))
      },
      uploadedAt: data.videoRenderer.publishedTimeText?.simpleText ?? null,
      views: data.videoRenderer.viewCountText?.simpleText?.replace(/[^0-9]/g, "") ?? 0
    }
  }).filter((e) => e != undefined);
}
