import { useRouteError, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import type { RouteError } from "../../types/global.types";

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  const { t } = useTranslation("common");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("common.somethingWrong")}</h1>
        <p className="text-gray-600 mb-2">
          {error?.statusText || error?.message || t("common.errorOccurred")}
        </p>
        <p className="text-sm text-gray-500 mb-8">{t("common.teamNotified")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            {t("nav.home")}
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            {t("common.reload")}
          </button>
        </div>
      </div>
    </div>
  );
}
