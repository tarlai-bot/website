import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

export default function ComingSoon() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-primary to-secondary rounded-full shadow-lg">
            <Clock className="w-12 h-12 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Coming Soon
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8">
            We're working hard to bring you this exciting new feature. Stay
            tuned!
          </p>

          {/* Description */}
          <p className="text-base text-gray-500 mb-12 max-w-lg mx-auto">
            This page is currently under development. We'll let you know as soon
            as it's ready. In the meantime, feel free to explore our other
            amazing features.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-8 py-3 bg-linear-to-r from-primary to-secondary text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

