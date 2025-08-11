"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { quizes, topics } from "@/assets/assets";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronRight, Brain } from "lucide-react";

const Explore: React.FC = () => {
  const t = useTranslations("explore");

  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4" id="explore">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Section - Quizzes */}
          <motion.div 
            className="w-full lg:w-2/5 bg-gradient-to-br from-primary_blue to-deep_blue p-8 text-white"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary_green/20 rounded-full">
                <Brain className="w-6 h-6 text-primary_green" />
              </div>
              <h3 className="text-2xl font-bold">{t("getquiz")}</h3>
            </div>
            
            <div className="space-y-4">
              {quizes.map((quiz, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={quiz.link}
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary_green/30 rounded-full blur-md group-hover:blur-lg transition-all" />
                        <Image
                          src={quiz.icon}
                          alt={quiz.question}
                          width={40}
                          height={40}
                          className="relative z-10 rounded-full"
                        />
                      </div>
                      <p className="text-white group-hover:text-primary_green transition-colors font-medium">
                        {t(quiz.question)}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary_green group-hover:translate-x-1 transition-all" />
                  </Link>
                  {index < quizes.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Section - Topics */}
          <motion.div 
            className="w-full lg:w-3/5 p-8"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center lg:text-left">
              {t("mhealth")}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {topics.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href="/conditions" 
                    className="group block text-center p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="relative mb-4">
                      <motion.div
                        className="absolute inset-0 bg-primary_green/10 rounded-2xl blur-lg group-hover:bg-primary_green/20 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="relative z-10 w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                        <Image
                          src={topic.icon}
                          alt={topic.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-700 group-hover:text-primary_blue transition-colors">
                      {t(topic.title)}
                    </h4>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Explore;
