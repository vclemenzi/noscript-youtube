import { parseDuration } from "../../utils/parse";
import type { Video } from "../types/Video";

export function next(body: any, options: { homepage: boolean } = { homepage: false }): Video[] {
  const results: Video[] = [];
  const home = options.homepage;

  if (typeof body[Symbol.iterator] !== "function") return results;

  for (const result of body) {
    const details = home ? result : result.compactVideoRenderer;

    if (details) {
      try {
        let viewCount = details.viewCountText.simpleText;
        viewCount = (/^\d/.test(viewCount) ? viewCount : "0").split(" ")[0];

        results.push({
          id: details.videoId as string,
          title: details.title.simpleText ?? details.title.runs[0]?.text,
          views: parseInt(viewCount.replace(/,/g, "")) || 0,
          duration: parseDuration(details.lengthText.simpleText) / 1000,
          durationFormatted: "", // Placeholder for formatted duration
          live: false, // Placeholder for live status
          private: false, // Placeholder for private status
          tags: [], // Placeholder for tags
          channel: {
            name: details.shortBylineText.runs[0].text,
            id: details.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.browseId,
            url: `https://www.youtube.com${details.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl}`,
            icon: home
              ? details.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer
                  .thumbnail.thumbnails[0]
              : details.channelThumbnail.thumbnails[0],
            subscribers: "0",
            verified: Boolean(details.ownerBadges[0].metadataBadgeRenderer.tooltip === "Verified"),
          },
          thumbnail: {
            ...details.thumbnail.thumbnails[details.thumbnail.thumbnails.length - 1],
            id: details.videoId,
          },
          uploadedAt: details.publishedTimeText.simpleText,
          likes: 0,
          dislikes: 0,
          description: details.descriptionSnippet?.runs[0]?.text,
          shorts: false,
          unlisted: false,
        });
      } catch {
        continue;
      }
    }
  }

  return results;
}
