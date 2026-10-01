import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ChevronDown,
  Search,
  HelpCircle,
  Clock,
  MapPin,
  CreditCard,
  ShoppingBag,
  Car,
  Users,
  Phone,
} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function FAQ() {
  const { t, i18n } = useTranslation(["pages", "common"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<number[]>([]);

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

  // Reset category to "All" when language changes
  useEffect(() => {
    setSelectedCategory("All");
  }, [i18n.language]);

  const categories = useMemo(
    () => [
      { name: "All", icon: HelpCircle, label: t("pages:faq.categories.all") },
      {
        name: t("pages:faq.categories.general"),
        icon: HelpCircle,
        label: t("pages:faq.categories.general"),
      },
      {
        name: t("pages:faq.categories.shopping"),
        icon: ShoppingBag,
        label: t("pages:faq.categories.shopping"),
      },
      {
        name: t("pages:faq.categories.parking"),
        icon: Car,
        label: t("pages:faq.categories.parking"),
      },
      {
        name: t("pages:faq.categories.services"),
        icon: Users,
        label: t("pages:faq.categories.services"),
      },
    ],
    [t]
  );

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: t("pages:faq.questions.q1.question"),
      answer: t("pages:faq.questions.q1.answer"),
      category: t("pages:faq.categories.general"),
    },
    {
      id: 2,
      question: t("pages:faq.questions.q2.question"),
      answer: t("pages:faq.questions.q2.answer"),
      category: t("pages:faq.categories.parking"),
    },
    {
      id: 3,
      question: t("pages:faq.questions.q3.question"),
      answer: t("pages:faq.questions.q3.answer"),
      category: t("pages:faq.categories.services"),
    },
    {
      id: 4,
      question: t("pages:faq.questions.q4.question"),
      answer: t("pages:faq.questions.q4.answer"),
      category: t("pages:faq.categories.shopping"),
    },
    {
      id: 5,
      question: t("pages:faq.questions.q5.question"),
      answer: t("pages:faq.questions.q5.answer"),
      category: t("pages:faq.categories.services"),
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-linear-to-br from-secondary to-secondary-hover flex items-center justify-center text-white overflow-hidden">
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
        <div className="absolute inset-0 bg-linear-to-br from-secondary/90 to-secondary-hover/90"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <HelpCircle className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 animate-fade-in-up">
            {t("pages:faq.hero.title")}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-95 max-w-3xl mx-auto">
            {t("pages:faq.hero.subtitle")}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t("pages:faq.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 text-lg border-2 border-white focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
              />
            </div>
          </div>
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
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b-2 border-gray-200 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium uppercase transition-all ${
                  selectedCategory === category.name
                    ? "bg-secondary text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                        <HelpCircle className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-normal text-gray-800 mb-1">{faq.question}</h3>
                        <span className="text-sm text-secondary font-semibold">{faq.category}</span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-400 shrink-0 transition-transform ${
                        openItems.includes(faq.id) ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openItems.includes(faq.id) && (
                    <div className="px-6 pb-6 pt-2 animate-fade-in">
                      <div className="pl-14 pr-4">
                        <p className="text-gray-700 font-normal leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-normal text-gray-800 mb-2">
                {t("pages:faq.noResults")}
              </h3>
              <p className="text-gray-600 mb-6">{t("pages:faq.noResultsDescription")}</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-3 bg-secondary text-white rounded-lg text-sm font-medium uppercase tracking-wide shadow-md hover:shadow-lg hover:bg-secondary-hover transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                {t("pages:faq.clearFilters")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-normal text-gray-800 mb-4">
              {t("pages:faq.stillHaveQuestions")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("pages:faq.stillHaveQuestionsDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <Phone className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-xl font-normal text-gray-800 mb-2">{t("pages:faq.callUs")}</h3>
              <p className="text-gray-700 font-normal mb-4">{t("pages:faq.callUsDesc")}</p>
              <a
                href="tel:0135822220"
                className="text-secondary font-semibold hover:underline"
                dir="ltr"
              >
                +966 13 582 2220
              </a>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-xl font-normal text-gray-800 mb-2">{t("pages:faq.visitUs")}</h3>
              <p className="text-gray-700 font-normal mb-4">{t("pages:faq.visitUsDesc")}</p>
              <a href="/contact" className="text-secondary font-semibold hover:underline">
                {t("pages:faq.getDirections")}
              </a>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <Clock className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-xl font-normal text-gray-800 mb-2">
                {t("pages:faq.openingHours")}
              </h3>
              <p className="text-gray-700 font-normal mb-4">{t("pages:faq.openingHoursDesc")}</p>
              <p className="text-secondary font-semibold">{t("pages:faq.openingHoursTime")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-20 bg-linear-to-br from-secondary to-secondary-hover text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-normal mb-4">{t("pages:faq.needMoreHelp")}</h2>
          <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
            {t("pages:faq.needMoreHelpDesc")}
          </p>
          <a
            href="/customer-service"
            className="inline-block px-8 py-4 bg-white text-secondary rounded-lg text-sm font-medium uppercase tracking-wide shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary"
          >
            {t("pages:faq.contactCustomerService")}
          </a>
        </div>
      </section>
    </div>
  );
}
