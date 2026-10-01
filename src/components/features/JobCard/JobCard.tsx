import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  description: string;
  postedDate?: string;
  deadline?: string;
}

interface JobCardProps {
  job: Job;
  layout?: "vertical" | "horizontal";
  onClick?: (job: Job) => void;
}

export default function JobCard({
  job,
  layout = "vertical",
  onClick,
}: JobCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(job);
    }
  };

  const isVertical = layout === "vertical";

  // Job type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-[#44273a] text-white";
      case "Part-time":
        return "bg-[#ef7622] text-white";
      case "Contract":
        return "bg-[#fedd3d] text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const content = (
    <div className="p-5 flex flex-col grow">
      {/* Job Type Badge */}
      <span
        className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-widest rounded-full w-fit mb-3 shadow-sm ${getTypeColor(
          job.type
        )}`}
      >
        {job.type}
      </span>

      {/* Job Title */}
      <h3 className="text-xl font-normal text-gray-900 dark:text-white mb-2">
        {job.title}
      </h3>

      {/* Description */}
      <p className="text-sm font-normal text-gray-700 dark:text-gray-400 mb-4 grow">
        {job.description}
      </p>

      {/* Job Details */}
      <div className="space-y-2 mb-4">
        {/* Department */}
        <div className="flex items-center gap-2 text-sm font-normal text-gray-700 dark:text-gray-400">
          <Briefcase className="w-4 h-4" />
          <span>{job.department}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm font-normal text-gray-700 dark:text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>

        {/* Deadline */}
        {job.deadline && (
          <div className="flex items-center gap-2 text-sm font-normal text-gray-700 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Apply by: {new Date(job.deadline).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Apply Now Button */}
      <Link
        to={`/careers/${job.id}`}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium uppercase tracking-wide rounded shadow-md hover:shadow-lg hover:bg-primary-hover transition-all duration-300 ease-in-out w-fit focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        Apply Now
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );

  const cardClasses = `
    bg-white border border-gray-200 rounded-lg shadow-md
    hover:shadow-lg transition-shadow duration-300 ease-in-out
    dark:bg-gray-800 dark:border-gray-700
    ${isVertical ? "max-w-sm" : "flex flex-col md:flex-row md:max-w-2xl"}
  `;

  return <div className={cardClasses}>{content}</div>;
}

