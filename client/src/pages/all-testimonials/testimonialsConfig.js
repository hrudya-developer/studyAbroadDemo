import fallbackImage from "../../assets/avatarFallback.png";

export const API_URL =
  "https://overseas.technocitysolutions.com/public/api/getTestimonial";

export const IMAGE_BASE_URL =
  "https://overseas.technocitysolutions.com/public/images/testimonial/";

export const TESTIMONIALS_PER_PAGE = 6;

export const getTestimonialImage = (image) =>
  image
    ? `${IMAGE_BASE_URL}${image}`
    : fallbackImage;

export const getSafeText = (
  value,
  fallback = ""
) => {
  if (
    typeof value !== "string" &&
    typeof value !== "number"
  ) {
    return fallback;
  }

  return String(value).trim() || fallback;
};