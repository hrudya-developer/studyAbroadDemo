export const HOME_API_URL =
  "https://overseas.technocitysolutions.com/public/api/getHomeResponses";

export const FALLBACK_IMAGE =
  "/images/german-program-placeholder.webp";

export const getProgramId = (item, index) =>
  item?.id ||
  item?.program_id ||
  `program-${index + 1}`;

export const getProgramName = (item) =>
  item?.name ||
  item?.title ||
  "German Program";

export const isAusbildungProgram = (item) => {
  const content = `
    ${item?.name || ""}
    ${item?.titleWhy || ""}
    ${item?.why || ""}
  `.toLowerCase();

  return content.includes("ausbildung");
};

export const buildImageUrl = (
  basePath,
  image
) => {
  if (!image) return FALLBACK_IMAGE;

  const imageValue = String(image).trim();

  if (/^https?:\/\//i.test(imageValue)) {
    return imageValue;
  }

  const base = String(basePath || "").replace(
    /\/+$/,
    ""
  );

  const file = imageValue.replace(/^\/+/, "");

  return base
    ? `${base}/${file}`
    : FALLBACK_IMAGE;
};

export const getYouTubeVideoId = (
  url = ""
) => {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.hostname.includes("youtu.be")
    ) {
      return parsedUrl.pathname
        .replace("/", "")
        .split("?")[0];
    }

    if (
      parsedUrl.pathname.startsWith(
        "/shorts/"
      )
    ) {
      return (
        parsedUrl.pathname
          .split("/shorts/")[1]
          ?.split("/")[0] || ""
      );
    }

    if (
      parsedUrl.pathname.startsWith(
        "/embed/"
      )
    ) {
      return (
        parsedUrl.pathname
          .split("/embed/")[1]
          ?.split("/")[0] || ""
      );
    }

    return (
      parsedUrl.searchParams.get("v") || ""
    );
  } catch {
    return "";
  }
};

export const getYouTubeThumbnail = (
  video
) => {
  if (video?.thumbnailUrl) {
    return video.thumbnailUrl;
  }

  const videoId = getYouTubeVideoId(
    video?.link
  );

  return videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : FALLBACK_IMAGE;
};