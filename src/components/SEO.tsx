import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  content: string;
}
export default function SEO(props: SEOProps) {
  const { title, content } = props;
  const location = useLocation();

  // 환경에 따라 base URL 결정
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? window.location.origin
      : "https://dev.checkuree.com";
  const currentUrl = `${baseUrl}${location.pathname}`;

  return (
    <Helmet key={location.key}>
      <title>{title}</title>
      <meta name="description" content={content} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={content} />

      <meta
        property="og:image"
        content="https://dev.checkuree.com/images/logos/checkuree_logo.svg"
      />
      <meta property="og:url" content={currentUrl} />
    </Helmet>
  );
}
