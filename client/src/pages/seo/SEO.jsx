import { memo } from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  canonical,
  image = "https://medcityoverseas.com/images/medcity-og-image.webp",
  type = "website",
  keywords = "",
  noIndex = false,
  structuredData,
}) => {
  const robots = noIndex
    ? "noindex,nofollow"
    : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

  return (
    <Helmet prioritizeSeoTags>
      {/* HTML */}
      <html lang="en-IN" />

      {/* Primary SEO */}
      <title>{title}</title>

      <meta charSet="utf-8" />

      <meta
        name="description"
        content={description}
      />

      {keywords && (
        <meta
          name="keywords"
          content={keywords}
        />
      )}

      <meta
        name="robots"
        content={robots}
      />

      <meta
        name="googlebot"
        content={robots}
      />

      <meta
        name="author"
        content="Medcity Study Abroad"
      />

      <meta
        name="theme-color"
        content="#c01f53"
      />

      <link
        rel="canonical"
        href={canonical}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonical}
      />

      <meta
        property="og:site_name"
        content="Medcity Study Abroad"
      />

      <meta
        property="og:locale"
        content="en_IN"
      />

      <meta
        property="og:image"
        content={image}
      />

      <meta
        property="og:image:width"
        content="1200"
      />

      <meta
        property="og:image:height"
        content="630"
      />

      <meta
        property="og:image:alt"
        content="Medcity Study Abroad"
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={image}
      />

      <meta
        name="twitter:image:alt"
        content="Medcity Study Abroad"
      />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default memo(SEO);