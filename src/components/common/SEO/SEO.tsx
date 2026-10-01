import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
}

export default function SEO({
  title,
  description,
  keywords,
  image = "/images/alamerMall/alamerMallLogo.png",
  url,
  type = "website",
  noindex = false,
}: SEOProps) {
  const { i18n, t } = useTranslation();

  // Default SEO values from translations
  const siteName = t("common:seo.siteName");
  const defaultTitle = t("common:seo.defaultTitle");
  const defaultDescription = t("common:seo.defaultDescription");
  const defaultKeywords = t("common:seo.defaultKeywords");

  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const baseUrl = "https://www.mall-alamer.com";
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
  const currentUrl = url || `${baseUrl}${currentPath}`;
  const lang = i18n.language || "en";

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Update link tags
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }

      element.href = href;
    };

    // Basic meta tags
    updateMetaTag("description", metaDescription);
    updateMetaTag("keywords", metaKeywords);
    document.documentElement.lang = lang;

    if (noindex) {
      updateMetaTag("robots", "noindex,nofollow");
      updateMetaTag("googlebot", "noindex,nofollow");
    } else {
      updateMetaTag(
        "robots",
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      );
      updateMetaTag("googlebot", "index, follow");
    }

    // Open Graph tags
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", metaDescription, true);
    updateMetaTag("og:image", `${baseUrl}${image}`, true);
    updateMetaTag("og:site_name", siteName, true);
    updateMetaTag("og:locale", lang === "ar" ? "ar_SA" : "en_US", true);
    updateMetaTag("og:locale:alternate", lang === "ar" ? "en_US" : "ar_SA", true);

    // Twitter tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:url", currentUrl);
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", metaDescription);
    updateMetaTag("twitter:image", `${baseUrl}${image}`);

    // Canonical URL
    updateLinkTag("canonical", currentUrl);

    // Alternate language links
    updateLinkTag("alternate", `${baseUrl}${currentPath}`);
  }, [
    fullTitle,
    metaDescription,
    metaKeywords,
    currentUrl,
    currentPath,
    lang,
    image,
    type,
    noindex,
    siteName,
    baseUrl,
  ]);

  return null;
}
