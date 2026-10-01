import { AlertCircle, Phone, Mail } from "lucide-react";

interface FormDisabledNoticeProps {
  formType: "contact" | "rental" | "investment" | "careers";
}

export default function FormDisabledNotice({ formType }: FormDisabledNoticeProps) {
  const messages = {
    contact: {
      title: "Contact Form Temporarily Unavailable",
      description: "We're currently setting up our online contact system to serve you better.",
    },
    rental: {
      title: "Rental Inquiry Form Coming Soon",
      description: "Our online rental inquiry system is being prepared for launch.",
    },
    investment: {
      title: "Investment Inquiry Form Coming Soon",
      description: "Our online investment inquiry system is being prepared for launch.",
    },
    careers: {
      title: "Online Applications Coming Soon",
      description: "Our online job application system is being prepared for launch.",
    },
  };

  const message = messages[formType];

  return (
    <div className="relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 rounded-xl flex items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-indigo-200">
          <div className="text-center">
            {/* Icon */}
            <div className="mx-auto w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-indigo-600" />
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{message.title}</h3>

            {/* Description */}
            <p className="text-lg text-gray-700 mb-8">{message.description}</p>

            {/* Divider */}
            <div className="w-24 h-1 bg-linear-to-r from-indigo-600 to-purple-600 mx-auto mb-8 rounded-full"></div>

            {/* Contact Alternatives */}
            <div className="space-y-6">
              <p className="text-gray-800 font-semibold text-lg">
                In the meantime, please contact us directly:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Phone */}
                <a
                  href="tel:+966123456789"
                  className="flex items-center justify-center gap-3 bg-white hover:bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 font-medium">Call Us</p>
                    <p className="text-lg font-bold text-indigo-600" dir="ltr">
                      +966 12 345 6789
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@alamermall.com"
                  className="flex items-center justify-center gap-3 bg-white hover:bg-purple-50 border-2 border-purple-200 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 font-medium">Email Us</p>
                    <p className="text-base font-bold text-purple-600 break-all">
                      info@alamermall.com
                    </p>
                  </div>
                </a>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t-2 border-indigo-100">
                <p className="text-sm text-gray-600">
                  Our team is available Sunday - Thursday, 9:00 AM - 9:00 PM (AST)
                </p>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="mt-8 bg-white/50 rounded-xl p-4">
              <p className="text-sm text-gray-700 italic">
                Thank you for your patience as we enhance our online services to better serve you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
