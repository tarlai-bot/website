import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Building2, Mail, Phone, User, MessageSquare, ArrowLeft, Send } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  businessType: string;
  message: string;
}

export default function RentalInquiry() {
  const navigate = useNavigate();

  // Forms are temporarily disabled - redirect back to rental page
  useEffect(() => {
    navigate("/rental", { replace: true });
  }, [navigate]);

  return null;

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    businessType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // If no spaces selected, redirect back
  if (selectedSpaces.length === 0) {
    navigate("/rental");
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Simulate API call to send email
    // In production, this would call your backend API
    try {
      // Prepare email data
      const emailData = {
        to: "rentals@alamermall.com", // Mall rental management email
        subject: "New Rental Inquiry - Alamer Mall",
        body: `
          New Rental Inquiry Received
          
          Contact Information:
          Name: ${formData.fullName}
          Email: ${formData.email}
          Phone: ${formData.phone}
          Company: ${formData.companyName}
          Business Type: ${formData.businessType}
          
          Selected Spaces:
          ${selectedSpaces.join(", ")}
          
          Message:
          ${formData.message}
          
          Submitted on: ${new Date().toLocaleString()}
        `,
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In production, send to backend
      if (import.meta.env.DEV) {
        console.info("Email would be sent:", emailData);
      }

      setSubmitSuccess(true);

      // Redirect to rental page after 3 seconds
      setTimeout(() => {
        navigate("/rental");
      }, 3000);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error submitting form:", error);
      }
      alert("There was an error submitting your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Inquiry Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in Alamer Mall. Our rental management team will review your
            inquiry and contact you within 24-48 hours.
          </p>
          <div className="bg-indigo-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-indigo-800">
              A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>
          </div>
          <button
            onClick={() => navigate("/rental")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Rental Opportunities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/rental")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Spaces
        </button>

        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white mb-8">
          <Building2 className="w-12 h-12 mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Request Rental Information</h1>
          <p className="text-indigo-100">
            Fill out the form below and our team will get back to you soon
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="habib coe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="habib@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="+966 50 123 4567"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Your Company LLC"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    required
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select business type</option>
                    <option value="fashion">Fashion & Apparel</option>
                    <option value="electronics">Electronics</option>
                    <option value="food">Food & Beverage</option>
                    <option value="beauty">Beauty & Cosmetics</option>
                    <option value="jewelry">Jewelry & Accessories</option>
                    <option value="home">Home & Furniture</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="services">Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      placeholder="Tell us more about your business plans..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - Selected Spaces */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Selected Spaces</h3>
              <div className="space-y-3">
                {selectedSpaces.map((spaceId: string, index: number) => (
                  <div
                    key={spaceId}
                    className="bg-indigo-50 border border-indigo-200 rounded-lg p-3"
                  >
                    <p className="text-sm font-semibold text-indigo-900">Space {index + 1}</p>
                    <p className="text-xs text-indigo-700">ID: {spaceId}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">What happens next?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">1.</span>
                    <span>We review your inquiry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">2.</span>
                    <span>Our team contacts you within 24-48 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">3.</span>
                    <span>Schedule a viewing of the space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">4.</span>
                    <span>Discuss terms and lease agreement</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white text-center">
                <p className="text-sm font-semibold mb-1">Need immediate assistance?</p>
                <p className="text-xs text-indigo-100 mb-3">Call our rental team</p>
                <a
                  href="tel:+966121234568"
                  className="text-lg font-bold hover:text-indigo-100 transition-colors"
                >
                  +966 12 345 6789
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
