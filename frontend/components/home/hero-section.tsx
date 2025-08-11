"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Mic } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleVoiceSearch = () => {
    // Voice search implementation would go here
    // For now, just toggle the listening state for visual feedback
    setIsListening(!isListening);
    setTimeout(() => setIsListening(false), 2000);
  };
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-deep_blue via-primary_blue to-deep_blue">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary_green/20 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-48 h-48 bg-mint_green/20 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary_red/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {/* Main Heading */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <motion.p
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Discover expert-backed insights, personalized guidance, and a
              supportive community for your mental health journey.
            </motion.p>
          </motion.div>

          {/* AI-Powered Search Bar */}
          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-2 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 pl-4">
                    <Sparkles className="w-5 h-5 text-primary_green animate-pulse" />
                    <span className="text-sm font-medium text-white/80">
                      AI Search
                    </span>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask about anxiety, depression, stress management..."
                    className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-lg py-4 px-2"
                  />
                  <div className="flex items-center gap-2 pr-2">
                    <button
                      type="button"
                      onClick={handleVoiceSearch}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        isListening
                          ? "bg-primary_red text-white animate-pulse"
                          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                    <button
                      type="submit"
                      disabled={!searchQuery.trim()}
                      className="bg-primary_green hover:bg-primary_green/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Suggestions */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {[
                  "Managing stress at work",
                  "Anxiety symptoms",
                  "Depression support",
                  "Sleep disorders",
                  "Relationship issues",
                ].map((suggestion, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
