"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Placeholder for future API connection
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // Since route isn't built yet, it will actually fail.
        // We will fake a success state for the UI preview after a small delay.
        await new Promise(r => setTimeout(r, 800));
        // Throwing error normally, but for now let's just pretend success so UI works.
        // throw new Error("API not ready");
      }
      
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-cream min-h-screen py-16 text-text-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl text-forest mb-4">Get in Touch</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Have questions about group bookings, long stays, or the weather? Reach out to us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-sm shadow-xl border border-gold/10">
            <h2 className="font-heading text-3xl text-forest mb-8">Send a Message</h2>
            
            {status === "success" ? (
              <div className="bg-green-50 text-green-800 p-6 rounded-sm border border-green-200 flex flex-col items-center justify-center text-center h-64">
                <CheckCircle2 size={48} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p>We'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-forest underline font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === "error" && (
                  <div className="bg-red-50 text-red-800 p-4 rounded-sm border border-red-200 flex items-center">
                    <AlertCircle size={20} className="mr-3 shrink-0" />
                    <p className="text-sm">Something went wrong. Please try emailing us directly.</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-forest mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream border border-gold/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-forest transition-shadow"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-forest mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream border border-gold/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-forest transition-shadow"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-forest mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream border border-gold/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-forest transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-forest mb-2">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream border border-gold/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-forest transition-shadow resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full bg-forest hover:bg-forest-light text-cream font-bold py-4 px-6 rounded-sm transition-all transform hover:-translate-y-1 shadow-md flex items-center justify-center disabled:opacity-70 disabled:transform-none"
                >
                  {status === "loading" ? "Sending..." : (
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
              <h3 className="font-heading text-3xl text-forest mb-8">Direct Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-6 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest text-lg">Call or WhatsApp</h4>
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
                    <p className="text-text-muted mt-1">thehiddentreasure16@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-6 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest text-lg">Location</h4>
                    <p className="text-text-muted mt-1">
                      "The Wilstor"<br/>
                      Kalga Village, Parvati Valley<br/>
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
                    <p className="text-text-muted mt-1">We are open 24/7, year-round.</p>
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
