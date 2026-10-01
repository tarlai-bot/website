import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react";

// Form validation schema
const contactSchema = yup
  .object({
    name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
    email: yup.string().required("Email is required").email("Please enter a valid email"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number"),
    subject: yup.string().required("Subject is required"),
    message: yup
      .string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters"),
  })
  .required();

type ContactFormData = yup.InferType<typeof contactSchema>;

export default function ContactUs() {
  const { t } = useTranslation(["pages", "common", "forms"]);

  // Form submission temporarily disabled
  const FORM_DISABLED = true;

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 500;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= heroHeight * 0.5) {
        window.dispatchEvent(new CustomEvent("navColorChange", { detail: { isDark: true } }));
      } else {
        window.dispatchEvent(new CustomEvent("navColorChange", { detail: { isDark: false } }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    if (import.meta.env.DEV) {
      console.info("Contact form submitted:", data);
    }
    // TODO: Integrate with backend API

    setSubmitSuccess(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t("common:common.visitUs"),
      content: "Almubaraz, AlAhsa, Alsharqiyah",
      subContent: t("common:common.saudiArabia") + ", 32241",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      title: t("common:common.callUs"),
      content: "0135822220",
      subContent: t("common:hours.satThu"),
      color: "from-green-500 to-green-600",
    },
    {
      icon: Mail,
      title: t("common:common.emailUs"),
      content: "info@alamermall.com",
      subContent: t("common:common.weReplyWithin24Hours"),
      color: "from-purple-500 to-purple-600",
      link: "mailto:info@alamermall.com",
    },
    {
      icon: Clock,
      title: t("common:footer.workingHours"),
      content: t("common:hours.satThu"),
      subContent: t("common:hours.fri"),
      color: "from-orange-500 to-orange-600",
    },
  ];

  const departments = [
    {
      title: t("common:common.generalInquiries"),
      email: "info@alamermall.com",
      phone: "0135822220",
      description: t("common:common.generalQuestionsInfo"),
    },
    {
      title: t("common:common.leasingRentals"),
      email: "leasing@alamermall.com",
      phone: "+966121234568",
      description: t("common:common.retailSpaceInquiries"),
    },
  ];

  const socialMedia = [
    {
      name: "Instagram",
      icon: Instagram,
      handle: "@alamermall",
      url: "https://instagram.com/alamermall",
      color: "hover:bg-pink-100 hover:text-pink-600",
    },
    {
      name: "Email",
      icon: Mail,
      handle: "info@alamermall.com",
      url: "mailto:info@alamermall.com",
      color: "hover:bg-purple-100 hover:text-purple-600",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-linear-to-br from-primary to-primary-hover flex items-center justify-center text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="absolute inset-0 bg-[url('/images/alamerMall/placeholderAlamerMallBanner.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-linear-to-br from-primary/90 to-primary-hover/90"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <MessageSquare className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 animate-fade-in-up">
            {t("pages:contact.hero.title")}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-95 max-w-3xl mx-auto">
            {t("pages:contact.hero.subtitle")}
          </p>
        </div>

        {/* Decorative Wave */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg
            viewBox="0 0 1440 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 520L60 530C120 540 240 560 360 566.7C480 573 600 567 720 563.3C840 560 960 560 1080 566.7C1200 573 1320 587 1380 593.3L1440 600V600H1380C1320 600 1200 600 1080 600C960 600 840 600 720 600C600 600 480 600 360 600C240 600 120 600 60 600H0V520Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 bg-linear-to-br ${info.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-normal text-gray-800 mb-3">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-700 font-semibold hover:text-primary transition-colors block mb-1"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-700 font-semibold mb-1">{info.content}</p>
                )}
                <p className="text-gray-500 text-sm">{info.subContent}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-normal text-gray-800 mb-4">
              {t("pages:contact.visit.title")}
            </h2>
            <p className="text-gray-600 text-lg">{t("pages:contact.visit.subtitle")}</p>
          </div>

          {/* Google Map */}
          <div className="bg-gray-200 rounded-2xl overflow-hidden mb-8 h-[400px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.8543210123456!2d49.5968949!3d25.4231223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e3797fe0bf6d9bb%3A0x53582e0146b3efc6!2sAl%20Amer%20Mall!5e0!3m2!1sen!2ssa!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>

          {/* Directions */}
          <div className="bg-primary/5 rounded-2xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-normal text-gray-800 mb-4">
              {t("pages:contact.directions.title")}
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{t("pages:contact.directions.fromRiyadh")}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{t("pages:contact.directions.fromKhobar")}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{t("pages:contact.directions.parking")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-normal text-gray-800 mb-4">
              {t("pages:contact.departments.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("pages:contact.departments.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-normal text-gray-800 mb-3">{dept.title}</h3>
                <p className="text-gray-700 font-normal mb-6">{dept.description}</p>
                <div className="space-y-3">
                  <a
                    href={`mailto:${dept.email}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="font-semibold" dir="ltr">
                      {dept.email}
                    </span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="font-semibold" dir="ltr">
                      {dept.phone}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-800 mb-4">
            {t("pages:contact.social.title")}
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            {t("pages:contact.social.subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 px-8 py-4 bg-gray-50 rounded-xl font-semibold text-gray-700 transition-all ${social.color} group`}
              >
                <social.icon className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-sm text-gray-500">{social.name}</div>
                  <div className="font-bold">{social.handle}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
