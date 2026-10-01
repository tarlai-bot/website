import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Scale, FileText, Shield, AlertTriangle, Mail, CheckCircle2 } from "lucide-react";

export default function TermsOfService() {
  const { t } = useTranslation("legal");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-gray-50">
      {/* Header */}
      <section className="bg-linear-to-br from-primary to-primary-hover text-white pt-20 pb-8 sm:pt-26 sm:pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Scale className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6">
            {t("termsOfService.title")}
          </h1>
          <p className="text-lg sm:text-xl text-center opacity-95 max-w-3xl mx-auto">
            {t("termsOfService.intro")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Safe Website Usage */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                    {t("termsOfService.sections.usage.title")}
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{t("termsOfService.sections.usage.items.legitimate")}</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{t("termsOfService.sections.usage.items.noMisuse")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                    {t("termsOfService.sections.content.title")}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t("termsOfService.sections.content.content")}
                  </p>
                </div>
              </div>
            </div>

            {/* Modifications */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                    {t("termsOfService.sections.modifications.title")}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t("termsOfService.sections.modifications.content")}
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                    {t("termsOfService.sections.disclaimer.title")}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t("termsOfService.sections.disclaimer.content")}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                    {t("termsOfService.sections.contact.title")}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t("termsOfService.sections.contact.content")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
