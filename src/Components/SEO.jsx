import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Arbito",
  description = "Empowering students with real-world skills through mentorship, projects, and hands-on experience.",
  image = "/img/arbito-logo-only.png",
  url = "https://yourdomain.com/",
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={url} />
    <html lang="en" />

    {/* Open Graph */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Helmet>
);

export default SEO;
