import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  content: string;
}
export default function SEO(props: SEOProps) {
  const { title, content } = props;
  const location = useLocation();
  return (
    <Helmet key={location.pathname}>
      <title>{title}</title>
      <meta name="description" content={content} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={content} />
      <meta
        property="og:image"
        content="https://dev.checkuree.com/images/logos/checkuree_logo.svg"
      />
      <meta property="og:url" content="https://dev.checkuree.com" />
    </Helmet>
  );
}
