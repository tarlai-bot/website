import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  X,
  Search,
  CheckCircle2,
  Mail,
  Phone,
  Target,
  Heart,
  TrendingUp,
  BookOpen,
  Handshake,
} from "lucide-react";
import type { Job, Filters, FormData } from "../../types/careers.types";

// Validation schema
const applicationSchema = yup
  .object({
    fullName: yup
      .string()
      .required("Full name is required")
      .min(2, "Name must be at least 2 characters"),
    email: yup.string().required("Email is required").email("Please enter a valid email"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number"),
    position: yup.string().required("Position is required"),
    linkedin: yup
      .string()
      .url("Please enter a valid LinkedIn URL")
      .matches(/linkedin\.com/, "Must be a LinkedIn URL")
      .optional(),
    coverLetter: yup.string().optional(),
    resume: yup
      .mixed<FileList>()
      .required("Resume is required")
      .test("fileSize", "File must be less than 5MB", (value) => {
        if (!value || value.length === 0) return false;
        return value[0].size <= 5 * 1024 * 1024;
      })
      .test("fileType", "Only PDF, DOC, and DOCX files are allowed", (value) => {
        if (!value || value.length === 0) return false;
        const validTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        return validTypes.includes(value[0].type);
      }),
  })
  .required();

const Careers = () => {
  const { t } = useTranslation(["pages", "common", "forms"]);

  // Form submission temporarily disabled
  const FORM_DISABLED = true;

  // Sample job data - in production, this would come from API
  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: "Retail Store Manager",
      department: "Retail Operations",
      location: "Alamer Mall, Almubaraz, AlAhsa",
      type: "Full-time",
      deadline: "2025-12-31",
      description:
        "Lead and manage daily retail operations, oversee staff, ensure excellent customer service, and drive sales performance.",
      requirements: [
        "Bachelor's degree in Business Administration or related field",
        "5+ years of retail management experience",
        "Strong leadership and team management skills",
        "Excellent communication skills in Arabic and English",
        "Proven track record of meeting sales targets",
      ],
      responsibilities: [
        "Manage store operations and staff scheduling",
        "Ensure high standards of customer service",
        "Monitor inventory and merchandising",
        "Achieve sales targets and KPIs",
        "Train and develop team members",
      ],
    },
    {
      id: 2,
      title: "Customer Service Representative",
      department: "Customer Service",
      location: "Alamer Mall, Almubaraz, AlAhsa",
      type: "Full-time",
      deadline: "2025-12-15",
      description:
        "Provide exceptional customer service, handle inquiries, resolve complaints, and ensure visitor satisfaction at our information desk.",
      requirements: [
        "High school diploma or equivalent",
        "2+ years in customer service",
        "Fluent in Arabic and English",
        "Excellent interpersonal skills",
        "Professional appearance and demeanor",
      ],
      responsibilities: [
        "Greet and assist mall visitors",
        "Handle customer inquiries and complaints",
        "Provide information about stores and services",
        "Maintain records of customer interactions",
        "Coordinate with mall management on visitor needs",
      ],
    },
    {
      id: 3,
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "Alamer Mall, Almubaraz, AlAhsa",
      type: "Full-time",
      deadline: "2025-12-20",
      description:
        "Support marketing campaigns, manage social media, coordinate events, and help drive mall traffic and tenant sales.",
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "3+ years marketing experience",
        "Strong social media management skills",
        "Creative mindset and attention to detail",
        "Proficiency in design tools (Photoshop, Canva)",
      ],
      responsibilities: [
        "Execute marketing campaigns",
        "Manage social media accounts",
        "Coordinate mall events and promotions",
        "Create marketing materials and content",
        "Analyze campaign performance",
      ],
    },
    {
      id: 4,
      title: "Security Supervisor",
      department: "Security",
      location: "Alamer Mall, Almubaraz, AlAhsa",
      type: "Full-time",
      deadline: "2025-11-30",
      description:
        "Oversee mall security operations, manage security team, ensure safety protocols, and respond to incidents.",
      requirements: [
        "High school diploma with security training",
        "5+ years in security management",
        "Security certification required",
        "Strong leadership and crisis management skills",
        "Physical fitness and alertness",
      ],
      responsibilities: [
        "Supervise security personnel",
        "Monitor surveillance systems",
        "Respond to security incidents",
        "Conduct security audits",
        "Coordinate with local authorities",
      ],
    },
    {
      id: 5,
      title: "Maintenance Technician",
      department: "Facilities",
      location: "Alamer Mall, Almubaraz, AlAhsa",
      type: "Full-time",
      deadline: "2025-12-10",
      description:
        "Perform maintenance and repairs on mall facilities, HVAC systems, electrical, plumbing, and general upkeep.",
      requirements: [
        "Technical diploma in relevant field",
        "3+ years facilities maintenance experience",
        "HVAC and electrical knowledge",
        "Problem-solving skills",
        "Ability to work flexible hours",
      ],
      responsibilities: [
        "Perform preventive maintenance",
        "Repair equipment and systems",
        "Respond to maintenance requests",
        "Maintain maintenance logs",
        "Ensure compliance with safety standards",
      ],
    },
    {
      id: 6,
      title: "Food Court Supervisor",
      department: "Food & Beverage",
      location: "Alamer Mall, Almubaraz, AlAhsa",
      type: "Full-time",
      deadline: "2025-12-25",
      description:
        "Manage food court operations, coordinate with vendors, ensure cleanliness and food safety standards.",
      requirements: [
        "Bachelor's degree or equivalent experience",
        "4+ years in F&B management",
        "Knowledge of food safety regulations",
        "Strong organizational skills",
        "Customer service orientation",
      ],
      responsibilities: [
        "Oversee food court daily operations",
        "Coordinate with food vendors",
        "Ensure hygiene and safety compliance",
        "Manage customer complaints",
        "Monitor quality standards",
      ],
    },
    {
      id: 7,
      title: "Leasing Executive",
      department: "Business Development",
      location: "Alamer Mall, Almubaraz, AlAhsa",
      type: "Full-time",
      deadline: "2026-01-05",
      description:
        "Identify and secure new tenants, negotiate lease agreements, maintain tenant relationships, and achieve occupancy targets.",
      requirements: [
        "Bachelor's degree in Business or Real Estate",
        "3+ years in leasing or sales",
        "Strong negotiation skills",
        "Excellent presentation abilities",
        "Real estate knowledge",
      ],
      responsibilities: [
        "Identify prospective tenants",
        "Conduct site tours",
        "Negotiate lease terms",
        "Maintain tenant database",
        "Prepare leasing reports",
      ],
    },
    {
      id: 8,
      title: "HR Assistant",
      department: "Human Resources",
      location: "Alamer Mall, Almubaraz, AlAhsa",
      type: "Part-time",
      deadline: "2025-12-05",
      description:
        "Support HR operations including recruitment, onboarding, employee records, and administrative tasks.",
      requirements: [
        "Bachelor's degree in HR or related field",
        "1-2 years HR experience",
        "Good computer skills",
        "Attention to detail",
        "Confidentiality and professionalism",
      ],
      responsibilities: [
        "Process job applications",
        "Schedule interviews",
        "Maintain employee records",
        "Assist with onboarding",
        "Handle HR documentation",
      ],
    },
  ]);

  const [filters, setFilters] = useState<Filters>({
    department: "All",
    type: "All",
    search: "",
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(applicationSchema) as any,
  });

  const resumeFile = watch("resume");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedJob]);

  // Get unique departments and types
  const departments: string[] = ["All", ...new Set(jobs.map((job) => job.department))];
  const jobTypes: string[] = ["All", "Full-time", "Part-time"];

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesDepartment = filters.department === "All" || job.department === filters.department;
    const matchesType = filters.type === "All" || job.type === filters.type;
    const matchesSearch =
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.department.toLowerCase().includes(filters.search.toLowerCase());
    return matchesDepartment && matchesType && matchesSearch;
  });

  const handleJobClick = (job: Job): void => {
    setSelectedJob(job);
    setValue("position", job.title);
  };

  const handleCloseModal = (): void => {
    setSelectedJob(null);
    setShowApplicationForm(false);
    setSubmitSuccess(false);
    reset();
  };

  const handleApplyClick = (): void => {
    // Form temporarily disabled - do nothing
    return;
  };

  const onSubmit: SubmitHandler<FormData> = (data): void => {
    if (import.meta.env.DEV) {
      console.info("Form submitted:", data);
    }
    // In production: send to API
    setSubmitSuccess(true);
    setTimeout(() => {
      handleCloseModal();
    }, 3000);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-linear-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/alamerMall/placeholderAlamerMallBanner.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-linear-to-br from-purple-600/90 to-purple-900/90"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 animate-fade-in-up">
            {t("pages:careers.hero.title")}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-normal mb-12 opacity-95">
            {t("pages:careers.hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-normal mb-2">
                {t("pages:careers.stats.employees")}
              </div>
              <div className="text-sm sm:text-base uppercase tracking-wide opacity-90">
                {t("pages:careers.stats.employeesLabel")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-normal mb-2">
                {t("pages:careers.stats.departments")}
              </div>
              <div className="text-sm sm:text-base uppercase tracking-wide opacity-90">
                {t("pages:careers.stats.departmentsLabel")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-normal mb-2">
                {t("pages:careers.stats.excellence")}
              </div>
              <div className="text-sm sm:text-base uppercase tracking-wide opacity-90">
                {t("pages:careers.stats.excellenceLabel")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-center mb-12 text-gray-800 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-linear-to-r after:from-purple-600 after:to-purple-900 after:rounded-full">
            Why Work With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Briefcase,
                title: "Career Growth",
                description: "Continuous learning opportunities and clear career progression paths",
              },
              {
                icon: Heart,
                title: "Health Benefits",
                description: "Comprehensive health insurance and wellness programs",
              },
              {
                icon: Target,
                title: "Performance Rewards",
                description: "Competitive salaries and performance-based bonuses",
              },
              {
                icon: TrendingUp,
                title: "Work-Life Balance",
                description: "Flexible schedules and supportive work environment",
              },
              {
                icon: BookOpen,
                title: "Training Programs",
                description: "Professional development and skill enhancement courses",
              },
              {
                icon: Handshake,
                title: "Team Culture",
                description: "Collaborative environment with diverse, talented professionals",
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-normal text-gray-800 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-base font-normal text-gray-700 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-center mb-12 text-gray-800 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-linear-to-r after:from-purple-600 after:to-purple-900 after:rounded-full">
            Open Positions
          </h2>

          {/* Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-4 mb-12 p-6 sm:p-8 bg-gray-50 rounded-xl">
            <div className="flex flex-col">
              <label
                htmlFor="search"
                className="font-medium text-gray-700 mb-2 text-sm uppercase tracking-widest"
              >
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="search"
                  placeholder="Search by job title or department..."
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="department"
                className="font-medium text-gray-700 mb-2 text-sm uppercase tracking-widest"
              >
                Department
              </label>
              <select
                id="department"
                value={filters.department}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    department: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all bg-white cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="jobType"
                className="font-medium text-gray-700 mb-2 text-sm uppercase tracking-widest"
              >
                Job Type
              </label>
              <select
                id="jobType"
                value={filters.type}
                onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
                className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all bg-white cursor-pointer"
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleJobClick(job)}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-purple-600 flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl sm:text-2xl font-normal text-gray-800 flex-1">
                      {job.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium uppercase tracking-widest whitespace-nowrap shadow-sm ${
                        job.type === "Full-time"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {job.type}
                    </span>
                  </div>

                  <div className="flex-1 space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Building2 className="w-5 h-5 shrink-0" />
                      <span className="text-sm sm:text-base font-normal">{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-5 h-5 shrink-0" />
                      <span className="text-sm sm:text-base font-normal">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-5 h-5 shrink-0" />
                      <span className="text-sm sm:text-base font-normal">
                        Apply by:{" "}
                        {new Date(job.deadline).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-3 sm:py-4 bg-linear-to-r from-purple-600 to-purple-900 text-white rounded shadow-md hover:shadow-lg text-sm font-medium uppercase tracking-wide hover:scale-[1.02] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                    View Details & Apply
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-gray-500 text-lg sm:text-xl">
                No positions found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {/* Form temporarily disabled */}
      {false && selectedJob && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 sm:p-6 animate-fade-in"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col relative animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-all hover:rotate-90 z-20"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            <div className="overflow-y-auto flex-1 p-6 sm:p-10">
              {!showApplicationForm ? (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 pb-6 border-b-2 border-gray-200">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 flex-1">
                      {selectedJob.title}
                    </h2>
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest shadow-sm ${
                        selectedJob.type === "Full-time"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedJob.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm text-gray-700 font-medium uppercase tracking-widest mb-1">
                        Department
                      </span>
                      <span className="text-base sm:text-lg text-gray-800 font-normal">
                        {selectedJob.department}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm text-gray-700 font-medium uppercase tracking-widest mb-1">
                        Location
                      </span>
                      <span className="text-base sm:text-lg text-gray-800 font-normal">
                        {selectedJob.location}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm text-gray-700 font-medium uppercase tracking-widest mb-1">
                        Application Deadline
                      </span>
                      <span className="text-base sm:text-lg text-gray-800 font-normal">
                        {new Date(selectedJob.deadline).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl sm:text-2xl font-normal text-gray-800 mb-4">
                      Job Description
                    </h3>
                    <p className="text-gray-700 font-normal leading-relaxed text-base sm:text-lg">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl sm:text-2xl font-normal text-gray-800 mb-4">
                      Key Responsibilities
                    </h3>
                    <ul className="space-y-3">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-700 font-normal leading-relaxed"
                        >
                          <CheckCircle2 className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" />
                          <span className="text-base sm:text-lg">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl sm:text-2xl font-normal text-gray-800 mb-4">
                      Requirements
                    </h3>
                    <ul className="space-y-3">
                      {selectedJob.requirements.map((req, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-700 font-normal leading-relaxed"
                        >
                          <CheckCircle2 className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" />
                          <span className="text-base sm:text-lg">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-center pt-8 border-t-2 border-gray-200">
                    <button
                      onClick={handleApplyClick}
                      className="px-8 sm:px-12 py-3 sm:py-4 bg-linear-to-r from-purple-600 to-purple-900 text-white rounded shadow-md hover:shadow-lg text-sm font-medium uppercase tracking-wide hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    >
                      Apply Now
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl font-normal text-gray-800 mb-8 pb-6 border-b-2 border-gray-200">
                    Apply for {selectedJob.title}
                  </h2>

                  {!isAuthenticated && (
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
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
                            application. Your information will be automatically filled from your
                            profile.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {submitSuccess && (
                    <div className="bg-green-50 border-2 border-green-200 text-green-800 p-6 sm:p-8 rounded-xl text-center mb-8 shadow-sm">
                      <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-4" />
                      <p className="font-normal text-lg sm:text-xl mb-2">
                        Your application has been submitted successfully!
                      </p>
                      <p className="text-base sm:text-lg font-normal">
                        We'll review your application and contact you soon.
                      </p>
                    </div>
                  )}

                  {!submitSuccess && (
                    <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                          <label
                            htmlFor="fullName"
                            className="font-medium text-gray-700 mb-2 text-sm sm:text-base uppercase tracking-widest"
                          >
                            Full Name <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            {...register("fullName")}
                            placeholder="e.g., Habib Coe"
                            className={`px-4 py-3 border-2 rounded-lg text-base focus:outline-none transition-all ${
                              errors.fullName
                                ? "border-red-500 focus:border-red-600"
                                : "border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10"
                            }`}
                          />
                          {errors.fullName && (
                            <span className="text-red-600 text-sm mt-1">
                              {errors.fullName.message}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="email"
                            className="font-medium text-gray-700 mb-2 text-sm sm:text-base uppercase tracking-widest"
                          >
                            Email <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            {...register("email")}
                            placeholder="habib@example.com"
                            className={`px-4 py-3 border-2 rounded-lg text-base focus:outline-none transition-all ${
                              errors.email
                                ? "border-red-500 focus:border-red-600"
                                : "border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10"
                            }`}
                          />
                          {errors.email && (
                            <span className="text-red-600 text-sm mt-1">
                              {errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                          <label
                            htmlFor="phone"
                            className="font-medium text-gray-700 mb-2 text-sm sm:text-base uppercase tracking-widest"
                          >
                            Phone Number <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            {...register("phone")}
                            placeholder="+966 XX XXX XXXX"
                            className={`px-4 py-3 border-2 rounded-lg text-base focus:outline-none transition-all ${
                              errors.phone
                                ? "border-red-500 focus:border-red-600"
                                : "border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10"
                            }`}
                          />
                          {errors.phone && (
                            <span className="text-red-600 text-sm mt-1">
                              {errors.phone.message}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="position"
                            className="font-medium text-gray-700 mb-2 text-sm sm:text-base uppercase tracking-widest"
                          >
                            Position
                          </label>
                          <input
                            type="text"
                            id="position"
                            {...register("position")}
                            readOnly
                            className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-gray-50 cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="linkedin"
                          className="font-medium text-gray-700 mb-2 text-sm sm:text-base uppercase tracking-widest"
                        >
                          LinkedIn Profile (Optional)
                        </label>
                        <input
                          type="url"
                          id="linkedin"
                          {...register("linkedin")}
                          placeholder="https://linkedin.com/in/habib-coe"
                          className={`px-4 py-3 border-2 rounded-lg text-base focus:outline-none transition-all ${
                            errors.linkedin
                              ? "border-red-500 focus:border-red-600"
                              : "border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10"
                          }`}
                        />
                        {errors.linkedin && (
                          <span className="text-red-600 text-sm mt-1">
                            {errors.linkedin.message}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="resume"
                          className="font-medium text-gray-700 mb-2 text-sm sm:text-base uppercase tracking-widest"
                        >
                          Upload Resume/CV <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="file"
                          id="resume"
                          accept=".pdf,.doc,.docx"
                          {...register("resume")}
                          className={`px-4 py-3 border-2 rounded-lg text-base focus:outline-none transition-all ${
                            errors.resume
                              ? "border-red-500 focus:border-red-600"
                              : "border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10"
                          }`}
                        />
                        <small className="text-gray-500 text-sm mt-1">
                          PDF, DOC, or DOCX (Max 5MB)
                        </small>
                        {errors.resume && (
                          <span className="text-red-600 text-sm mt-1">
                            {errors.resume.message as string}
                          </span>
                        )}
                        {resumeFile && resumeFile.length > 0 && (
                          <div className="mt-2 px-4 py-2 bg-green-50 text-green-800 rounded-lg text-sm font-medium flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            {resumeFile[0].name}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="coverLetter"
                          className="font-medium text-gray-700 mb-2 text-sm sm:text-base uppercase tracking-widest"
                        >
                          Cover Letter (Optional)
                        </label>
                        <textarea
                          id="coverLetter"
                          {...register("coverLetter")}
                          rows={6}
                          placeholder="Tell us why you're a great fit for this position..."
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all"
                        ></textarea>
                      </div>

                      <div className="flex flex-col-reverse sm:flex-row gap-4 justify-end pt-8 border-t-2 border-gray-200">
                        <button
                          type="button"
                          onClick={() => setShowApplicationForm(false)}
                          className="px-6 sm:px-8 py-3 bg-gray-200 text-gray-700 rounded shadow-md hover:shadow-lg text-sm font-medium uppercase tracking-wide hover:bg-gray-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="px-6 sm:px-8 py-3 bg-linear-to-r from-purple-600 to-purple-900 text-white rounded shadow-md hover:shadow-lg text-sm font-medium uppercase tracking-wide hover:scale-[1.02] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                        >
                          Submit Application
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact HR Section */}
      <section className="py-16 sm:py-20 bg-linear-to-br from-purple-600 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Questions About Careers?
          </h2>
          <p className="text-lg sm:text-xl mb-12 opacity-95">
            Our HR team is here to help you with any questions about job opportunities at Alamer
            Mall.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 flex-wrap">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-lg">hr@alamermall.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-lg">+966 13 XXX XXXX</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-lg">Sunday - Thursday, 9:00 AM - 5:00 PM</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
