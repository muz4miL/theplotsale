'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C5A880]" />
            <span className="text-[#C5A880] text-[10px] tracking-[0.3em] uppercase font-medium">
              Get In Touch
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C5A880]" />
          </motion.div>

          <h1 className="font-playfair text-5xl md:text-7xl text-white font-light mb-4 leading-tight">
            Reach Us Now
          </h1>

          <p className="font-playfair italic text-2xl text-[#C5A880]/80 mb-6">
            Book An Appointment
          </p>

          <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Our team of experts is ready to assist you with your property needs. 
            Connect with us today and let's begin your journey to exceptional real estate.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-[#111111]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
              <h2 className="font-playfair text-3xl text-white mb-2">Send Us a Message</h2>
              <p className="text-white/50 text-sm mb-8">Fill out the form and we'll be in touch shortly.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-white/70 text-sm mb-2 tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-[#C5A880] text-white/80 placeholder:text-white/20 px-0 py-3 outline-none transition-all duration-500 text-sm font-light tracking-wide"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-white/70 text-sm mb-2 tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-[#C5A880] text-white/80 placeholder:text-white/20 px-0 py-3 outline-none transition-all duration-500 text-sm font-light tracking-wide"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-white/70 text-sm mb-2 tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-[#C5A880] text-white/80 placeholder:text-white/20 px-0 py-3 outline-none transition-all duration-500 text-sm font-light tracking-wide"
                    placeholder="+44 or +92"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-white/70 text-sm mb-2 tracking-wide">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-[#C5A880] text-white/80 placeholder:text-white/20 px-0 py-3 outline-none transition-all duration-500 text-sm font-light tracking-wide"
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-white/70 text-sm mb-2 tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-[#C5A880] text-white/80 placeholder:text-white/20 px-0 py-3 outline-none transition-all duration-500 resize-none text-sm font-light tracking-wide"
                    placeholder="Tell us more about your requirements..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full group relative px-8 py-4 bg-[#C5A880] hover:bg-[#C5A880]/90 text-[#111111] rounded-lg transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative text-sm tracking-[0.2em] uppercase font-semibold z-10">
                      Submit Inquiry
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Office Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            
            {/* Pakistan Office */}
            <div className="bg-[#111111]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-white mb-2">Pakistan Office</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Plot 2, Block C, Etihad Town<br />
                    Main Raiwind Road<br />
                    Lahore, 54000
                  </p>
                </div>
              </div>
            </div>

            {/* UK Office */}
            <div className="bg-[#111111]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-white mb-2">UK Inquiries</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    The Vista Center<br />
                    50 Salisbury road<br />
                    Hounslow, London TW4 6JQ<br />
                    Office number A4-16
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-[#111111]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6">
              
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="font-playfair text-lg text-white mb-2">Phone</h3>
                  <p className="text-white/60 text-sm">
                    PK: <a href="tel:+923211222999" className="hover:text-[#C5A880] transition-colors">(+92) 321-1222999</a>
                  </p>
                  <p className="text-white/60 text-sm">
                    UK: <a href="tel:+447383663339" className="hover:text-[#C5A880] transition-colors">+44 7383663339</a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="font-playfair text-lg text-white mb-2">Email</h3>
                  <a 
                    href="mailto:contact@theplotsale.com" 
                    className="text-white/60 text-sm hover:text-[#C5A880] transition-colors"
                  >
                    contact@theplotsale.com
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="font-playfair text-lg text-white mb-2">Business Hours</h3>
                  <p className="text-white/60 text-sm">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-white/60 text-sm">Sunday: By Appointment</p>
                </div>
              </div>

            </div>

          </motion.div>

        </motion.div>

      </div>
    </main>
  );
}
