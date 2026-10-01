import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logger from "../../../utils/logger";

export default function Footer() {
  const { t } = useTranslation("common");
  const currentYear = new Date().getFullYear();
  const socialMediaRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  logger.info("Footer render, isVisible:", isVisible);

  const quickLinks = [
    { label: "nav.home", path: "/" },
    { label: "nav.events", path: "/events" },
    { label: "nav.stores", path: "/stores" },
    { label: "nav.dining", path: "/restaurants" },
    { label: "nav.entertainment", path: "/entertainment" },
    { label: "nav.hypermarket", path: "/hypermarket" },
    { label: "nav.map", path: "/maps" },
    { label: "nav.gallery", path: "/gallery" },
    { label: "nav.about", path: "/about" },
  ];

  const businessLinks = [
    { label: "nav.rentalOpportunities", path: "/rental" },
    {
      label: "nav.investmentOpportunities",
      path: "/investment",
    },
    { label: "nav.careers", path: "/careers" },
  ];

  const supportLinks = [
    { label: "nav.customerService", path: "/customer-service" },
    { label: "nav.faq", path: "/faq" },
    { label: "nav.contact", path: "/contact" },
  ];

  const socialMedia = [
    {
      name: "Instagram",
      url: "https://instagram.com/alamermall",
      svg: (
        <svg
          className="relative z-10"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 51 51"
          fill="none"
        >
          <path
            d="M17.4456 25.7808C17.4456 21.1786 21.1776 17.4468 25.7826 17.4468C30.3875 17.4468 34.1216 21.1786 34.1216 25.7808C34.1216 30.383 30.3875 34.1148 25.7826 34.1148C21.1776 34.1148 17.4456 30.383 17.4456 25.7808ZM12.9377 25.7808C12.9377 32.8708 18.6883 38.618 25.7826 38.618C32.8768 38.618 38.6275 32.8708 38.6275 25.7808C38.6275 18.6908 32.8768 12.9436 25.7826 12.9436C18.6883 12.9436 12.9377 18.6908 12.9377 25.7808ZM36.1342 12.4346C36.1339 13.0279 36.3098 13.608 36.6394 14.1015C36.9691 14.595 37.4377 14.9797 37.9861 15.2069C38.5346 15.4342 39.1381 15.4939 39.7204 15.3784C40.3028 15.2628 40.8378 14.9773 41.2577 14.5579C41.6777 14.1385 41.9638 13.6041 42.0799 13.0222C42.1959 12.4403 42.1367 11.8371 41.9097 11.2888C41.6828 10.7406 41.2982 10.2719 40.8047 9.94202C40.3112 9.61218 39.7309 9.436 39.1372 9.43576H39.136C38.3402 9.43613 37.5771 9.75216 37.0142 10.3144C36.4514 10.8767 36.1349 11.6392 36.1342 12.4346ZM15.6765 46.1302C13.2377 46.0192 11.9121 45.6132 11.0311 45.2702C9.86323 44.8158 9.02993 44.2746 8.15381 43.4002C7.27768 42.5258 6.73536 41.6938 6.28269 40.5266C5.93928 39.6466 5.53304 38.3214 5.42217 35.884C5.3009 33.2488 5.27668 32.4572 5.27668 25.781C5.27668 19.1048 5.3029 18.3154 5.42217 15.678C5.53324 13.2406 5.94248 11.918 6.28269 11.0354C6.73736 9.86816 7.27888 9.03536 8.15381 8.15976C9.02873 7.28416 9.86123 6.74216 11.0311 6.28976C11.9117 5.94656 13.2377 5.54056 15.6765 5.42976C18.3133 5.30856 19.1054 5.28436 25.7826 5.28436C32.4598 5.28436 33.2527 5.31056 35.8916 5.42976C38.3305 5.54076 39.6539 5.94976 40.537 6.28976C41.7049 6.74216 42.5382 7.28536 43.4144 8.15976C44.2905 9.03416 44.8308 9.86816 45.2855 11.0354C45.6289 11.9154 46.0351 13.2406 46.146 15.678C46.2673 18.3154 46.2915 19.1048 46.2915 25.781C46.2915 32.4572 46.2673 33.2466 46.146 35.884C46.0349 38.3214 45.6267 39.6462 45.2855 40.5266C44.8308 41.6938 44.2893 42.5266 43.4144 43.4002C42.5394 44.2738 41.7049 44.8158 40.537 45.2702C39.6565 45.6134 38.3305 46.0194 35.8916 46.1302C33.2549 46.2514 32.4628 46.2756 25.7826 46.2756C19.1024 46.2756 18.3125 46.2514 15.6765 46.1302ZM15.4694 0.932162C12.8064 1.05336 10.9867 1.47536 9.39755 2.09336C7.75177 2.73156 6.35853 3.58776 4.9663 4.97696C3.57406 6.36616 2.71955 7.76076 2.08097 9.40556C1.46259 10.9948 1.04034 12.8124 0.919069 15.4738C0.795795 18.1394 0.767578 18.9916 0.767578 25.7808C0.767578 32.57 0.795795 33.4222 0.919069 36.0878C1.04034 38.7494 1.46259 40.5668 2.08097 42.156C2.71955 43.7998 3.57426 45.196 4.9663 46.5846C6.35833 47.9732 7.75177 48.8282 9.39755 49.4682C10.9897 50.0862 12.8064 50.5082 15.4694 50.6294C18.138 50.7506 18.9893 50.7808 25.7826 50.7808C32.5759 50.7808 33.4286 50.7526 36.0958 50.6294C38.759 50.5082 40.5774 50.0862 42.1676 49.4682C43.8124 48.8282 45.2066 47.9738 46.5989 46.5846C47.9911 45.1954 48.8438 43.7998 49.4842 42.156C50.1026 40.5668 50.5268 38.7492 50.6461 36.0878C50.7674 33.4202 50.7956 32.57 50.7956 25.7808C50.7956 18.9916 50.7674 18.1394 50.6461 15.4738C50.5248 12.8122 50.1026 10.9938 49.4842 9.40556C48.8438 7.76176 47.9889 6.36836 46.5989 4.97696C45.2088 3.58556 43.8124 2.73156 42.1696 2.09336C40.5775 1.47536 38.7588 1.05136 36.0978 0.932162C33.4306 0.810962 32.5779 0.780762 25.7846 0.780762C18.9913 0.780762 18.138 0.808962 15.4694 0.932162Z"
            fill="url(#paint0_radial_7092_54379)"
          />
          <path
            d="M17.4456 25.7808C17.4456 21.1786 21.1776 17.4468 25.7826 17.4468C30.3875 17.4468 34.1216 21.1786 34.1216 25.7808C34.1216 30.383 30.3875 34.1148 25.7826 34.1148C21.1776 34.1148 17.4456 30.383 17.4456 25.7808ZM12.9377 25.7808C12.9377 32.8708 18.6883 38.618 25.7826 38.618C32.8768 38.618 38.6275 32.8708 38.6275 25.7808C38.6275 18.6908 32.8768 12.9436 25.7826 12.9436C18.6883 12.9436 12.9377 18.6908 12.9377 25.7808ZM36.1342 12.4346C36.1339 13.0279 36.3098 13.608 36.6394 14.1015C36.9691 14.595 37.4377 14.9797 37.9861 15.2069C38.5346 15.4342 39.1381 15.4939 39.7204 15.3784C40.3028 15.2628 40.8378 14.9773 41.2577 14.5579C41.6777 14.1385 41.9638 13.6041 42.0799 13.0222C42.1959 12.4403 42.1367 11.8371 41.9097 11.2888C41.6828 10.7406 41.2982 10.2719 40.8047 9.94202C40.3112 9.61218 39.7309 9.436 39.1372 9.43576H39.136C38.3402 9.43613 37.5771 9.75216 37.0142 10.3144C36.4514 10.8767 36.1349 11.6392 36.1342 12.4346ZM15.6765 46.1302C13.2377 46.0192 11.9121 45.6132 11.0311 45.2702C9.86323 44.8158 9.02993 44.2746 8.15381 43.4002C7.27768 42.5258 6.73536 41.6938 6.28269 40.5266C5.93928 39.6466 5.53304 38.3214 5.42217 35.884C5.3009 33.2488 5.27668 32.4572 5.27668 25.781C5.27668 19.1048 5.3029 18.3154 5.42217 15.678C5.53324 13.2406 5.94248 11.918 6.28269 11.0354C6.73736 9.86816 7.27888 9.03536 8.15381 8.15976C9.02873 7.28416 9.86123 6.74216 11.0311 6.28976C11.9117 5.94656 13.2377 5.54056 15.6765 5.42976C18.3133 5.30856 19.1054 5.28436 25.7826 5.28436C32.4598 5.28436 33.2527 5.31056 35.8916 5.42976C38.3305 5.54076 39.6539 5.94976 40.537 6.28976C41.7049 6.74216 42.5382 7.28536 43.4144 8.15976C44.2905 9.03416 44.8308 9.86816 45.2855 11.0354C45.6289 11.9154 46.0351 13.2406 46.146 15.678C46.2673 18.3154 46.2915 19.1048 46.2915 25.781C46.2915 32.4572 46.2673 33.2466 46.146 35.884C46.0349 38.3214 45.6267 39.6462 45.2855 40.5266C44.8308 41.6938 44.2893 42.5266 43.4144 43.4002C42.5394 44.2738 41.7049 44.8158 40.537 45.2702C39.6565 45.6134 38.3305 46.0194 35.8916 46.1302C33.2549 46.2514 32.4628 46.2756 25.7826 46.2756C19.1024 46.2756 18.3125 46.2514 15.6765 46.1302ZM15.4694 0.932162C12.8064 1.05336 10.9867 1.47536 9.39755 2.09336C7.75177 2.73156 6.35853 3.58776 4.9663 4.97696C3.57406 6.36616 2.71955 7.76076 2.08097 9.40556C1.46259 10.9948 1.04034 12.8124 0.919069 15.4738C0.795795 18.1394 0.767578 18.9916 0.767578 25.7808C0.767578 32.57 0.795795 33.4222 0.919069 36.0878C1.04034 38.7494 1.46259 40.5668 2.08097 42.156C2.71955 43.7998 3.57426 45.196 4.9663 46.5846C6.35833 47.9732 7.75177 48.8282 9.39755 49.4682C10.9897 50.0862 12.8064 50.5082 15.4694 50.6294C18.138 50.7506 18.9893 50.7808 25.7826 50.7808C32.5759 50.7808 33.4286 50.7526 36.0958 50.6294C38.759 50.5082 40.5774 50.0862 42.1676 49.4682C43.8124 48.8282 45.2066 47.9738 46.5989 46.5846C47.9911 45.1954 48.8438 43.7998 49.4842 42.156C50.1026 40.5668 50.5268 38.7492 50.6461 36.0878C50.7674 33.4202 50.7956 32.57 50.7956 25.7808C50.7956 18.9916 50.7674 18.1394 50.6461 15.4738C50.5248 12.8122 50.1026 10.9938 49.4842 9.40556C48.8438 7.76176 47.9889 6.36836 46.5989 4.97696C45.2088 3.58556 43.8124 2.73156 42.1696 2.09336C40.5775 1.47536 38.7588 1.05136 36.0978 0.932162C33.4306 0.810962 32.5779 0.780762 25.7846 0.780762C18.9913 0.780762 18.138 0.808962 15.4694 0.932162Z"
            fill="url(#paint1_radial_7092_54379)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_7092_54379"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(7.41436 51.017) scale(65.31 65.2708)"
            >
              <stop offset="0.09" stopColor="#FA8F21" />
              <stop offset="0.78" stopColor="#D82D7E" />
            </radialGradient>
            <radialGradient
              id="paint1_radial_7092_54379"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(31.1086 53.257) scale(51.4733 51.4424)"
            >
              <stop offset="0.64" stopColor="#8C3AAA" stopOpacity="0" />
              <stop offset="1" stopColor="#8C3AAA" />
            </radialGradient>
          </defs>
        </svg>
      ),
      bgColor: "bg-gradient-to-tr from-red-50 to-pink-50",
      hoverShadow: "hover:shadow-red-200",
    },
    {
      name: "Snapchat",
      url: "https://www.snapchat.com/add/alamermall",
      svg: (
        <img
          src="/images/socials/snapchat-logo.svg"
          alt="Snapchat"
          className="relative z-10 w-6 h-6"
        />
      ),
      bgColor: "bg-[#FFFC00]",
      hoverShadow: "hover:shadow-yellow-200",
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@alamermall",
      svg: (
        <svg
          className="relative z-10"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="28"
          viewBox="0 0 42 47"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30.6721 17.4285C33.7387 19.6085 37.4112 20.7733 41.1737 20.7592V13.3024C40.434 13.3045 39.6963 13.2253 38.9739 13.0663V19.0068C35.203 19.0135 31.5252 17.8354 28.4599 15.6389V30.9749C28.4507 33.4914 27.7606 35.9585 26.4628 38.1146C25.165 40.2706 23.3079 42.0353 21.0885 43.2215C18.8691 44.4076 16.37 44.9711 13.8563 44.852C11.3426 44.733 8.90795 43.9359 6.81055 42.5453C8.75059 44.5082 11.2295 45.8513 13.9333 46.4044C16.6372 46.9576 19.4444 46.6959 21.9994 45.6526C24.5545 44.6093 26.7425 42.8312 28.2864 40.5436C29.8302 38.256 30.6605 35.5616 30.6721 32.8018V17.4285ZM33.3938 9.82262C31.8343 8.13232 30.8775 5.97386 30.6721 3.68324V2.71387H28.5842C28.8423 4.16989 29.4039 5.5553 30.2326 6.78004C31.0612 8.00479 32.1383 9.04144 33.3938 9.82262ZM11.645 36.642C10.9213 35.6957 10.4779 34.5653 10.365 33.3793C10.2522 32.1934 10.4746 30.9996 11.0068 29.9338C11.5391 28.8681 12.3598 27.9731 13.3757 27.3508C14.3915 26.7285 15.5616 26.4039 16.7529 26.4139C17.4106 26.4137 18.0644 26.5143 18.6916 26.7121V19.0068C17.9584 18.9097 17.2189 18.8682 16.4794 18.8826V24.8728C14.9522 24.39 13.2992 24.4998 11.8492 25.1803C10.3992 25.8608 9.25851 27.0621 8.65394 28.5454C8.04937 30.0286 8.02524 31.6851 8.58636 33.1853C9.14748 34.6855 10.2527 35.9196 11.6823 36.642H11.645Z"
            fill="#EE1D52"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.4589 15.5892C31.5241 17.7857 35.2019 18.9638 38.9729 18.9571V13.0166C36.8243 12.5623 34.8726 11.4452 33.3927 9.82262C32.1372 9.04144 31.0601 8.00479 30.2315 6.78004C29.4029 5.5553 28.8412 4.16989 28.5831 2.71387H23.09V32.8018C23.0849 34.1336 22.6629 35.4304 21.8831 36.51C21.1034 37.5897 20.0051 38.3981 18.7425 38.8217C17.4798 39.2453 16.1162 39.2629 14.8431 38.872C13.57 38.4811 12.4512 37.7012 11.6439 36.642C10.3645 35.9965 9.3399 34.9387 8.7354 33.6394C8.1309 32.3401 7.98177 30.875 8.31208 29.4805C8.64239 28.0861 9.43286 26.8435 10.556 25.9535C11.6791 25.0634 13.0693 24.5776 14.5023 24.5745C15.1599 24.5766 15.8134 24.6772 16.4411 24.8728V18.8826C13.7288 18.9477 11.0946 19.8033 8.86172 21.3444C6.62887 22.8855 4.89458 25.0451 3.87175 27.5579C2.84892 30.0708 2.58205 32.8276 3.10392 35.49C3.62579 38.1524 4.91367 40.6045 6.80948 42.5453C8.90731 43.9459 11.3458 44.7512 13.8651 44.8755C16.3845 44.9997 18.8904 44.4383 21.1158 43.2509C23.3413 42.0636 25.2031 40.2948 26.5027 38.133C27.8024 35.9712 28.4913 33.4973 28.4962 30.9749L28.4589 15.5892Z"
            fill="#000"
          />
        </svg>
      ),
      bgColor: "bg-gray-100",
      hoverShadow: "hover:shadow-gray-300",
    },
  ];

  // Intersection Observer for scroll-triggered animation on mobile
  useEffect(() => {
    logger.info("Setting up observer, ref:", socialMediaRef.current);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Toggle based on whether element is in viewport
          logger.info("Social media visibility:", entry.isIntersecting);
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    if (socialMediaRef.current) {
      observer.observe(socialMediaRef.current);
      logger.info("Observer attached");
    } else {
      logger.info("Ref is null!");
    }

    return () => {
      if (socialMediaRef.current) {
        observer.unobserve(socialMediaRef.current);
      }
    };
  }, []);

  const copyrightText = t("footer.copyright").replace("{{year}}", String(currentYear));

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="relative overflow-hidden">
        <img
          src="/images/alamerMall/ai-business-partnership.png"
          alt="Alamer Mall"
          className="h-72 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/75 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#fedd3d]">
                Al Amer Mall
              </p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
                A destination built for visitors, brands and partners.
              </h2>
              <Link
                to="/rental"
                className="mt-6 inline-flex rounded-full bg-[#ef7622] px-6 py-3 font-bold text-white transition hover:bg-[#d86518]"
              >
                Explore Business Opportunities
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Alamer Mall</h3>
            <p className="text-sm font-normal mb-4">{t("footer.location")}</p>
            <div className="space-y-2 text-sm font-normal">
              <a
                href="https://maps.app.goo.gl/duMw7y1F68JHAzFq8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-white transition-colors duration-300 ease-in-out"
              >
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Almubaraz, AlAhsa, Alsharqiyah, Saudi Arabia</span>
              </a>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 shrink-0 mt-0.5" />
                <a
                  href="tel:0135822220"
                  className="hover:text-white transition-colors duration-300"
                  dir="ltr"
                >
                  013 582 2220
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 shrink-0 mt-0.5" />
                <span dir="ltr">info@alamermall.com</span>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-gray-700 mt-3">
                <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium mb-1">Working Hours:</p>
                  <p>Sat-Thu: 6 AM - 2:30 AM</p>
                  <p>Fri: 9-10:30 AM, 1 PM - 2:30 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links - Has 2 columns inside */}
          <div>
            <h3 className="text-white font-medium text-lg mb-4">{t("footer.quickAccess")}</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-normal">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  {link.comingSoon ? (
                    <span className="opacity-50 cursor-not-allowed inline-flex items-start gap-0.5">
                      {t(link.label)}
                      <span className="text-[8px] bg-yellow-500 text-white px-1 py-0.5 rounded-full font-medium -mt-0.5">
                        {t("common.comingSoon")}
                      </span>
                    </span>
                  ) : (
                    <Link
                      to={link.path}
                      className="hover:text-white transition-colors duration-300 ease-in-out"
                    >
                      {t(link.label)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Business & Careers */}
          <div>
            <h3 className="text-white font-medium text-lg mb-4">{t("nav.business")}</h3>
            <ul className="space-y-2 text-sm font-normal">
              {businessLinks.map((link) => (
                <li key={link.path}>
                  {link.comingSoon ? (
                    <span className="opacity-50 cursor-not-allowed inline-flex items-start gap-0.5">
                      {t(link.label)}
                      <span className="text-[8px] bg-yellow-500 text-white px-1 py-0.5 rounded-full font-medium -mt-0.5">
                        {t("common.comingSoon")}
                      </span>
                    </span>
                  ) : (
                    <Link
                      to={link.path}
                      className="hover:text-white transition-colors duration-300 ease-in-out"
                    >
                      {t(link.label)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support & Social */}
          <div>
            <h3 className="text-white font-medium text-lg mb-4">{t("footer.support")}</h3>
            <ul className="space-y-2 text-sm font-normal mb-6">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media - Animated Buttons */}
            <h4 className="text-white font-medium text-sm mb-3 uppercase tracking-widest">
              {t("footer.followUs")}
            </h4>
            <div ref={socialMediaRef} className="flex flex-wrap gap-3">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 flex items-center justify-center ${social.bgColor} rounded-md shadow-md shadow-transparent transition-all duration-300 ${social.hoverShadow}`}
                  aria-label={social.name}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-normal">
            <p>{copyrightText}</p>
            <div className="flex gap-6">
              <Link
                to="/privacy-policy"
                className="hover:text-white transition-colors duration-300 ease-in-out"
              >
                {t("footer.privacyPolicy")}
              </Link>
              <Link
                to="/terms-of-service"
                className="hover:text-white transition-colors duration-300 ease-in-out"
              >
                {t("footer.termsOfService")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
