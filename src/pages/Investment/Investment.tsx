import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  TrendingUp,
  Users,
  Building2,
  CheckCircle2,
  Mail,
  Phone,
  User,
  MessageSquare,
  Send,
  BarChart3,
  Target,
  Award,
  Zap,
  Calendar,
  ShoppingBag,
} from "lucide-react";

interface InvestmentOpportunity {
  id: string;
  title: string;
  type: string;
  description: string;
  investment: string;
  returns: string;
  term: string;
  icon: React.ReactNode;
}

export default function Investment() {
  const { t } = useTranslation(["pages", "common", "forms"]);

  // Form submission temporarily disabled
  const FORM_DISABLED = true;
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    investmentInterest: "",
    investmentAmount: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lock body scroll when form is open
  useEffect(() => {
    if (showInquiryForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showInquiryForm]);

  // Handle request information button click
  const handleRequestInfo = () => {
    // Form temporarily disabled - do nothing
    return;
  };

  // Performance metrics based on actual company
  const metrics = [
    {
      icon: <Calendar className="w-8 h-8" />,
      value: "60+ Years",
      label: "Operating Excellence",
      growth: "Since 1963",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      value: "4 Divisions",
      label: "Business Segments",
      growth: "Retail, F&B, Mall, Bakery",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      value: "15+ Stores",
      label: "Retail Locations",
      growth: "Across Al-Ahsa",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "1M+",
      label: "Annual Customers",
      growth: "Growing Steadily",
      color: "from-orange-500 to-red-500",
    },
  ];

  // Investment opportunities
  const opportunities: InvestmentOpportunity[] = [
    {
      id: "mall-expansion",
      title: "Mall Phase 2 Expansion",
      type: "Real Estate Development",
      description:
        "Expansion of Alamer Mall with additional retail space, entertainment zones, and premium dining areas to meet growing demand in Al-Ahsa region.",
      investment: "SAR 30M - 100M",
      returns: "Projected 14-18% IRR",
      term: "7-10 years",
      icon: <Building2 className="w-12 h-12" />,
    },
    {
      id: "retail-partnership",
      title: "Retail Store Partnership",
      type: "Strategic Partnership",
      description:
        "Partner with us to open and operate premium retail stores within our established mall and shopping centers across Al-Ahsa.",
      investment: "SAR 5M - 25M",
      returns: "12-16% Annual Returns",
      term: "5-7 years",
      icon: <Target className="w-12 h-12" />,
    },
    {
      id: "fnb-expansion",
      title: "F&B Concept Development",
      type: "Food & Beverage",
      description:
        "Join our growing food and beverage portfolio. Opportunities for restaurant concepts, cafes, and quick-service establishments.",
      investment: "SAR 3M - 15M",
      returns: "15-20% ROI",
      term: "4-6 years",
      icon: <Award className="w-12 h-12" />,
    },
    {
      id: "technology",
      title: "Digital Transformation",
      type: "Technology Investment",
      description:
        "Investment in retail technology, e-commerce platforms, mobile apps, and smart mall systems to enhance customer experience.",
      investment: "SAR 2M - 10M",
      returns: "18-25% ROI",
      term: "3-5 years",
      icon: <Zap className="w-12 h-12" />,
    },
  ];

  // Success stories
  const successStories = [
    {
      partner: "Regional F&B Group",
      investment: "SAR 8M",
      returns: "17% Annual ROI",
      year: "2020",
      description:
        "Restaurant partnership in Alamer Mall exceeded initial projections with strong customer traffic and repeat business.",
    },
    {
      partner: "Retail Fashion Brand",
      investment: "SAR 5M",
      returns: "19% Annual ROI",
      year: "2021",
      description:
        "Premium fashion outlet achieved profitability within first year, benefiting from high foot traffic and loyal customer base.",
    },
    {
      partner: "Entertainment Operator",
      investment: "SAR 12M",
      returns: "21% Annual ROI",
      year: "2022",
      description:
        "Family entertainment center became the most visited attraction in the mall, driving overall mall traffic.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual email service
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (import.meta.env.DEV) {
        console.info("Investment inquiry:", formData);
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setShowInquiryForm(false);
        setSubmitSuccess(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          investmentInterest: "",
          investmentAmount: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error:", error);
      }
      alert("There was an error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-normal text-gray-900 mb-4">Inquiry Received!</h2>
          <p className="text-base font-normal text-gray-700 mb-6">
            Thank you for your interest in investing with Abdullah Ali AlAmer & Brothers Trading
            Company. Our business development team will contact you within 24-48 hours.
          </p>
          <div className="bg-indigo-50 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-normal text-indigo-800">
              A confirmation has been sent to <strong>{formData.email}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-indigo-900 via-purple-900 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <BarChart3 className="w-16 h-16" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-light mb-6">
              {t("pages:investment.hero.title")}
            </h1>
            <p className="text-lg sm:text-xl font-normal text-gray-100 max-w-3xl mx-auto mb-8">
              {t("pages:investment.hero.subtitle")}
            </p>
            <p className="text-base font-normal text-indigo-200 max-w-2xl mx-auto mb-12">
              {t("pages:investment.hero.description")}
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleRequestInfo}
                className="bg-white text-indigo-900 hover:bg-indigo-50 px-8 py-4 rounded shadow-md hover:shadow-lg text-sm font-medium uppercase tracking-wide transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-900"
              >
                {t("pages:investment.hero.cta")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <div
                className={`bg-linear-to-br ${metric.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4 shadow-md`}
              >
                {metric.icon}
              </div>
              <div className="text-3xl font-normal text-gray-900 mb-1">{metric.value}</div>
              <div className="text-gray-700 font-medium mb-2">{metric.label}</div>
              <div className="text-sm text-green-600 font-medium">{metric.growth}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Heritage */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-normal text-gray-900 mb-6">
                Abdullah Ali AlAmer & Brothers Trading Company
              </h2>
              <p className="text-base font-normal text-gray-700 mb-6">
                Founded in <strong>1963</strong> by Ali bin Hamad bin Ali Al-Amer, our company has
                grown from a single food retail establishment to become one of the most respected
                commercial groups in the Eastern Province.
              </p>
              <p className="text-base font-normal text-gray-700 mb-6">
                Based in Al-Ahsa, the Palm Oasis and land of prosperity, we have built our
                reputation on providing quality products, exceptional service, and sustainable
                business practices.
              </p>
              <div className="bg-indigo-50 rounded-lg p-6 shadow-sm">
                <h3 className="font-medium text-indigo-900 mb-3">Our Vision</h3>
                <p className="text-indigo-800 text-sm font-normal">
                  Aligned with Saudi Vision 2030, we aim to be a trusted partner in nourishing our
                  customers, communities, and stakeholders through modern retail solutions, healthy
                  and delicious products, and integrated lifestyle offerings.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-100 shadow-sm">
                <div className="text-4xl font-normal text-indigo-600 mb-2">4</div>
                <div className="text-gray-700 font-medium">Business Divisions</div>
                <ul className="text-sm text-gray-600 mt-3 space-y-1">
                  <li>• Alamer Market</li>
                  <li>• Alamer Mall</li>
                  <li>• Alamer Bakery</li>
                  <li>• Wholesale</li>
                </ul>
              </div>
              <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-100 shadow-sm">
                <div className="text-4xl font-normal text-green-600 mb-2">2022</div>
                <div className="text-gray-700 font-medium">Mall Opening</div>
                <p className="text-sm font-normal text-gray-700 mt-3">
                  Launched Alamer Mall on King Abdullah Road, Al-Hofuf
                </p>
              </div>
              <div className="bg-linear-to-br from-orange-50 to-red-50 rounded-lg p-6 border-2 border-orange-100 shadow-sm">
                <div className="text-4xl font-normal text-orange-600 mb-2">15+</div>
                <div className="text-gray-700 font-medium">Locations</div>
                <p className="text-sm font-normal text-gray-700 mt-3">
                  Retail stores across Al-Ahsa region
                </p>
              </div>
              <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-100 shadow-sm">
                <div className="text-4xl font-normal text-purple-600 mb-2">1M+</div>
                <div className="text-gray-700 font-medium">Customers</div>
                <p className="text-sm font-normal text-gray-700 mt-3">Serving families annually</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Invest */}
      <div className="py-20 bg-linear-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal text-gray-900 mb-4">Why Invest with Us?</h2>
            <p className="text-xl font-normal text-gray-700">
              Six decades of proven success and sustainable growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Established Market Leader",
                description:
                  "Founded in 1963, we are Al-Ahsa's largest and most trusted commercial group with deep community roots.",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Proven Track Record",
                description:
                  "60+ years of consistent growth and profitability across economic cycles, demonstrating resilience and expertise.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Growing Customer Base",
                description:
                  "Serving over 1 million customers annually with high loyalty and repeat business in the expanding Al-Ahsa market.",
              },
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Diversified Portfolio",
                description:
                  "Multiple revenue streams: supermarkets, mall operations, bakeries, and wholesale, reducing investment risk.",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Family Leadership",
                description:
                  "Led by Ahmad Abdulaziz Al Amer, continuing the founder's vision with modern management practices.",
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Strategic Location",
                description:
                  "Prime locations in Al-Ahsa, the Palm Oasis, serving a population of over 1 million with limited competition.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out group"
              >
                <div className="bg-indigo-100 group-hover:bg-indigo-600 w-16 h-16 rounded-lg flex items-center justify-center text-indigo-600 group-hover:text-white mb-4 transition-colors duration-300 ease-in-out shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-normal text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-base font-normal text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Opportunities */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal text-gray-900 mb-4">
              Current Investment Opportunities
            </h2>
            <p className="text-xl font-normal text-gray-700">
              Join us in our continued expansion and growth
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out border border-gray-100"
              >
                <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-medium text-indigo-200 mb-2 uppercase tracking-widest">
                        {opp.type}
                      </div>
                      <h3 className="text-2xl font-normal mb-2">{opp.title}</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                      {opp.icon}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-base font-normal text-gray-700 mb-6">{opp.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-widest">
                        Investment
                      </div>
                      <div className="font-medium text-gray-900 text-sm">{opp.investment}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-widest">
                        Returns
                      </div>
                      <div className="font-medium text-green-600 text-sm">{opp.returns}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-widest">
                        Term
                      </div>
                      <div className="font-medium text-gray-900 text-sm">{opp.term}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        setShowAuthModal(true);
                        return;
                      }
                      setFormData((prev) => ({
                        ...prev,
                        investmentInterest: opp.title,
                      }));
                      setShowInquiryForm(true);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded shadow-md hover:shadow-lg text-sm font-medium uppercase tracking-wide transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Request Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-20 bg-linear-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal text-gray-900 mb-4">Partnership Success Stories</h2>
            <p className="text-xl font-normal text-gray-700">
              Proven results with our investment partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-normal text-gray-900 mb-1">{story.partner}</h3>
                    <div className="text-sm font-normal text-gray-700">
                      Partnership since {story.year}
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    {story.returns}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-medium text-indigo-600 mb-1">
                    {story.investment}
                  </div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    Total Investment
                  </div>
                </div>

                <p className="text-base font-normal text-gray-700">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-normal mb-4">Ready to Partner with Us?</h2>
          <p className="text-lg font-normal text-indigo-100 mb-8">
            Join 60+ years of commercial excellence in Al-Ahsa
          </p>
          <button
            onClick={handleRequestInfo}
            className="px-8 py-4 bg-white text-indigo-900 hover:bg-indigo-50 rounded shadow-md hover:shadow-lg text-sm font-medium uppercase tracking-wide transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-900"
          >
            Schedule a Meeting
          </button>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {/* Form temporarily disabled */}
      {false && showInquiryForm && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowInquiryForm(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-linear-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-lg shadow-md">
              <h2 className="text-2xl font-normal">Investment Inquiry</h2>
              <p className="text-indigo-100 mt-1 text-sm font-normal">
                Our business development team will contact you shortly
              </p>
            </div>

            <div className="overflow-y-auto flex-1">
              {!isAuthenticated && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 m-6 mb-0">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <svg
                        className="h-5 w-5 text-amber-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-800">
                        <strong className="font-semibold">Please log in</strong> to submit your
                        investment inquiry. Your information will be automatically filled from your
                        profile.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out"
                      placeholder="Habib Coe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out"
                      placeholder="habib@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out"
                      placeholder="+966 50 123 4567"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out"
                    placeholder="Your Company LLC"
                  />
                </div>

                {/* Investment Interest */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
                    Investment Interest *
                  </label>
                  <select
                    name="investmentInterest"
                    required
                    value={formData.investmentInterest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out"
                  >
                    <option value="">Select opportunity</option>
                    {opportunities.map((opp) => (
                      <option key={opp.id} value={opp.title}>
                        {opp.title}
                      </option>
                    ))}
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                {/* Investment Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
                    Investment Amount Range
                  </label>
                  <select
                    name="investmentAmount"
                    value={formData.investmentAmount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out"
                  >
                    <option value="">Select range</option>
                    <option value="0-5m">SAR 0 - 5M</option>
                    <option value="5-15m">SAR 5M - 15M</option>
                    <option value="15-30m">SAR 15M - 30M</option>
                    <option value="30-50m">SAR 30M - 50M</option>
                    <option value="50m+">SAR 50M+</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-300 ease-in-out"
                      placeholder="Tell us about your investment goals..."
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded text-sm font-medium uppercase tracking-wide hover:bg-gray-50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded font-medium text-sm uppercase tracking-wide transition-all duration-300 ease-in-out flex items-center justify-center gap-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Inquiry
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
