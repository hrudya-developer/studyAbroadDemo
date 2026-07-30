export const normalizeValue = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

export const joinImageUrl = (
  basePath,
  imageName
) => {
  if (!imageName) return "";

  const image = String(imageName).trim();

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  const base = String(
    basePath || ""
  ).replace(/\/+$/, "");

  const file = image.replace(/^\/+/, "");

  return base
    ? `${base}/${file}`
    : "";
};

export const getYesNoValue = (
  value,
  positiveLabel,
  negativeLabel
) =>
  normalizeValue(value) === "yes"
    ? positiveLabel
    : negativeLabel;

export const getAboutText = ({
  selectedInfo,
  university,
  universityName,
  locationText,
}) => {
  const aboutItem =
    selectedInfo.find((item) =>
      [
        "about",
        "about university",
        "description",
      ].includes(
        normalizeValue(item?.type)
      )
    );

  return (
    aboutItem?.text ||
    aboutItem?.description ||
    university?.about ||
    university?.description ||
    `${universityName} is located in ${locationText}. Explore its courses, ranking, scholarships and admission requirements.`
  );
};

export const getInfoItems = (
  selectedInfo
) =>
  selectedInfo.filter((item) =>
    [
      "info",
      "information",
      "quick info",
    ].includes(
      normalizeValue(item?.type)
    )
  );