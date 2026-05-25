import { Helmet } from "react-helmet-async";

function SEO({ title, description, keywords, url }) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="keywords" content={keywords} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
}

export default SEO;
