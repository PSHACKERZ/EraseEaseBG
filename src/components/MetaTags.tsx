import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords = 'background removal, image editing, AI background remover, photo editing',
  ogImage = '/og-image.jpg'
}) => {
  const siteUrl = 'https://eraseeasebg.netlify.app'; // Replace with your actual domain
  const { pathname } = useLocation();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title} | EraseEaseBG</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={`${siteUrl}${pathname}`} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Canonical URL */}
      <link rel="canonical" href={`${siteUrl}${pathname}`} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content="English" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />
    </Helmet>
  );
};

export default MetaTags;
