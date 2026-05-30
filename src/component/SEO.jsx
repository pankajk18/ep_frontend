import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Default Title",
  description = "Default description",
  keywords = "",
  image = "",
  url = window.location.href,
  type = "website",
  author = "EmergencyPaisa",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  robots = "index, follow",
}) => {
  return (
    <Helmet>
      {/* Basic */}
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="keywords" content={keywords} />

      <meta name="robots" content={robots} />

      <meta name="author" content={author} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:url" content={url} />

      <meta property="og:image" content={image} />

      <meta property="og:site_name" content="EmergencyPaisa" />

      {/* Article Specific */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {section && <meta property="article:section" content={section} />}

      {tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
