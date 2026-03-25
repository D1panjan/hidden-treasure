"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

/** Shape of the contact form data */
type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

/** Shape of validation errors */
type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

/** Validates all form fields and returns error messages */
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.phone || !/^[+]?[\d\s()-]{7,20}$/.test(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  if (data.message && data.message.trim().length > 2000) {
    errors.message = "Message must be under 2000 characters";
  }

  return errors;
}

/** The contact page with validated form + direct contact details */
export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState("");

  /** Handles form submission with validation and API call */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation first
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setServerError(
            "Too many requests. Please try again in a few minutes."
          );
        } else if (data.details) {
          setServerError(data.details.join(". "));
        } else {
          setServerError(
            data.error || "Something went wrong. Please try calling us."
          );
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error("Contact form error:", err);
      setServerError(
        "Network error. Please check your connection or call us directly."
      );
      setStatus("error");
    }
  };

  /** Updates form field values and clears field-level errors on change */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="bg-cream min-h-screen py-16 text-text-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl text-forest mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Have questions about group bookings, long stays, or the weather?
            Reach out to us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-sm shadow-xl border border-gold/10">
            <h2 className="font-heading text-3xl text-forest mb-8">
              Send a Message
            </h2>

            {status === "success" ? (
              <div className="bg-green-50 text-green-800 p-6 rounded-sm border border-green-200 flex flex-col items-center justify-center text-center h-64">
                <CheckCircle2 size={48} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p>We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-forest underline font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {status === "error" && serverError && (
                  <div className="bg-red-50 text-red-800 p-4 rounded-sm border border-red-200 flex items-center">
                    <AlertCircle size={20} className="mr-3 shrink-0" />
                    <p className="text-sm">{serverError}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-forest mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-cream border rounded-sm focus:outline-none focus:ring-2 focus:ring-forest transition-shadow ${
                        errors.name
                          ? "border-red-400"
                          : "border-gold/30"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-forest mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-cream border rounded-sm focus:outline-none focus:ring-2 focus:ring-forest transition-shadow ${
                        errors.phone
                          ? "border-red-400"
                          : "border-gold/30"
                      }`}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-forest mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-cream border rounded-sm focus:outline-none focus:ring-2 focus:ring-forest transition-shadow ${
                      errors.email
                        ? "border-red-400"
                        : "border-gold/30"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-forest mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-cream border rounded-sm focus:outline-none focus:ring-2 focus:ring-forest transition-shadow resize-none ${
                      errors.message
                        ? "border-red-400"
                        : "border-gold/30"
                    }`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-forest hover:bg-forest-light text-cream font-bold py-4 px-6 rounded-sm transition-all transform hover:-translate-y-1 shadow-md flex items-center justify-center disabled:opacity-70 disabled:transform-none"
                >
                  {status === "loading" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details */}
          <div className="flex flex-col justify-center space-y-12 pl-0 lg:pl-10">
            <div>
              <h3 className="font-heading text-3xl text-forest mb-8">
                Direct Contact
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-6 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest text-lg">
                      Call or WhatsApp
                    </h4>
                    <p className="text-text-muted mt-1">+91 89200 18563</p>
                    <a
                      href="https://wa.me/918920018563"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold font-medium mt-2 inline-block hover:underline"
                    >
                      Chat on WhatsApp &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-6 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest text-lg">Email Us</h4>
                    <p className="text-text-muted mt-1">
                      thehiddentreasure16@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-6 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest text-lg">Location</h4>
                    <p className="text-text-muted mt-1">
                      &quot;The Villster&quot;
                      <br />
                      Kalga Village, Parvati Valley
                      <br />
                      Himachal Pradesh 175105
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-6 shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest text-lg">Hours</h4>
                    <p className="text-text-muted mt-1">
                      We are open 24/7, year-round.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
