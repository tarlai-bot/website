import { Link } from "react-router-dom";
import { Construction, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

interface ComingSoonProps {
  pageName: string;
  description?: string;
}

export default function ComingSoon({ pageName, description }: ComingSoonProps) {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-10 h-10 text-indigo-600" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {pageName}
          </h1>

          <div className="mb-8">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Coming Soon
            </div>

            <p className="text-lg sm:text-xl text-gray-600 mb-4">
              {description || "We're working hard to bring you this page!"}
            </p>

            <p className="text-gray-500">
              This section is currently under development and will be available
              soon.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          Have questions?{" "}
          <Link
            to="/contact"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}

