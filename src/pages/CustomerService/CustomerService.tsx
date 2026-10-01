import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logger from "../../utils/logger";
import {
  Headphones,
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Info,
  Users,
  Gift,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  HelpCircle,
  Heart,
  Coffee,
  Zap,
  ParkingCircle,
  MoveVertical,
  ArrowUpDown,
  Accessibility,
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

export default function CustomerService() {
  const { t } = useTranslation(["pages", "common", "forms"]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema) as any,
  });

  // Scroll to top on mount
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
    logger.info("Form submitted:", data);
    // TODO: Integrate with backend API
    setSubmitSuccess(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const services = useMemo(
    () => [
      // Mall Services from Services page
      {
        icon: ParkingCircle,
        title: t("pages:services.list.parking"),
        description: t("pages:services.descriptions.parking"),
        color: "from-blue-500 to-blue-600",
      },
      {
        icon: MoveVertical,
        title: t("pages:services.list.elevators"),
        description: t("pages:services.descriptions.elevators"),
        color: "from-indigo-500 to-indigo-600",
      },
      {
        icon: ArrowUpDown,
        title: t("pages:services.list.escalators"),
        description: t("pages:services.descriptions.escalators"),
        color: "from-purple-500 to-purple-600",
      },
      {
        icon: Accessibility,
        title: t("pages:services.list.disabledParking"),
        description: t("pages:services.descriptions.disabledParking"),
        color: "from-teal-500 to-teal-600",
      },
      {
        icon: Heart,
        title: t("pages:services.list.prayer"),
        description: t("pages:services.descriptions.prayer"),
        color: "from-green-500 to-green-600",
      },
      {
        icon: Coffee,
        title: t("pages:services.list.foodCourt"),
        description: t("pages:services.descriptions.foodCourt"),
        color: "from-amber-500 to-amber-600",
      },
      {
        icon: ShieldCheck,
        title: t("pages:services.list.security"),
        description: t("pages:services.descriptions.security"),
        color: "from-gray-600 to-gray-700",
      },
    ],
    [t]
  );

  const contactInfo = [
    {
      icon: Phone,
      title: t("common:common.phone"),
      content: "0135822220",
      link: "tel:0135822220",
    },
    {
      icon: Mail,
      title: t("common:common.email"),
      content: "info@alamermall.com",
      link: "mailto:info@alamermall.com",
    },
    {
      icon: Clock,
      title: t("common:footer.workingHours"),
      content: `${t("common:hours.satThu")} | ${t("common:hours.fri")}`,
      link: null,
    },
    {
      icon: MapPin,
      title: t("common:common.location"),
      content: `Almubaraz, AlAhsa, Alsharqiyah, ${t("common:common.saudiArabia")}`,
      link: null,
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
          <Headphones className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 animate-fade-in-up">
            {t("pages:customerService.hero.title")}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-normal mb-8 opacity-95 max-w-3xl mx-auto">
            {t("pages:customerService.hero.subtitle")}
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

      {/* Services Grid */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-800 mb-4">
              {t("common:common.ourServices")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("common:common.comprehensiveServices")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-linear-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-normal text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 font-normal leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-800 mb-4">
              {t("common:common.getInTouch")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("common:common.multipleWays")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-primary/5 transition-colors"
              >
                <info.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-normal text-gray-800 mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-600 hover:text-primary transition-colors"
                    dir="ltr"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-600" dir="ltr">
                    {info.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 sm:py-20 bg-linear-to-br from-primary to-primary-hover text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("common:common.lookingForQuickAnswers")}
          </h2>
          <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
            {t("common:common.checkOurFAQ")}
          </p>
          <a
            href="/faq"
            className="inline-block px-8 py-4 bg-white text-primary rounded-lg text-sm font-medium uppercase tracking-wide shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          >
            {t("common:common.visitFAQ")}
          </a>
        </div>
      </section>
    </div>
  );
}
