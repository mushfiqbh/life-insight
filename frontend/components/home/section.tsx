"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sections } from "@/assets/assets";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle, Star, Award, Users } from "lucide-react";

const Section = () => {
  const t = useTranslations("section");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-16">
      {/* Promise Section */}
      <motion.div
        className="mb-16"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {t("promise")}
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-primary_green to-primary_blue mx-auto rounded-full" />
        </div>

        <div className="bg-gradient-to-br from-mint_green via-mint_green/80 to-primary_green/20 rounded-3xl p-8 md:p-12 shadow-xl border border-primary_green/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                {t("promiseHead")}
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Join millions who trust our evidence-based content for their mental health journey.
              </p>
              <Link href="/about">
                <motion.button
                  className="bg-primary_green hover:bg-primary_green/90 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("promiseBtn")}
                </motion.button>
              </Link>
            </motion.div>

            {/* Right - Promise Steps */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {sections.promises.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/70 transition-all duration-300"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-primary_green/20 rounded-full blur-lg" />
                    <Image 
                      src={step.img} 
                      alt={t(step.text)}
                      width={60}
                      height={60}
                      className="relative z-10 mx-auto"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-700">{t(step.text)}</h4>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Review Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t("review")}
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-primary_blue to-primary_green mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Expert Profiles */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {sections.reviewBoard.map(({ name, role, image, width }, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href="/about"
                    className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 text-center"
                  >
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-primary_blue/20 rounded-full blur-lg group-hover:blur-xl transition-all" />
                      <Image
                        className="relative z-10 rounded-full shadow-lg group-hover:shadow-xl transition-shadow"
                        src={image}
                        alt={name}
                        width={width || 80}
                        height={80}
                      />
                    </div>
                    <h4 className="font-bold text-gray-800 group-hover:text-primary_blue transition-colors">
                      {name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{role}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="space-y-8"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <div className="text-center lg:text-left">
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                  Why Trust LifeInsight?
                </h4>
                
                <div className="space-y-4">
                  {[
                    { icon: CheckCircle, text: "Medically reviewed content", color: "text-green-600" },
                    { icon: Star, text: "Expert-backed insights", color: "text-yellow-600" },
                    { icon: Award, text: "Award-winning platform", color: "text-blue-600" },
                    { icon: Users, text: "Trusted by millions", color: "text-purple-600" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                      <span className="text-gray-700 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Awards/Badges */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Medical", icon: "🏥" },
                  { label: "Research", icon: "🔬" },
                  { label: "Quality", icon: "⭐" },
                  { label: "Trust", icon: "🛡️" }
                ].map((badge, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center border border-gray-200"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <div className="text-sm font-semibold text-gray-700">{badge.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Awards Section */}
      <motion.div
        className="mt-16"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {t("awards")}
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-primary_blue to-primary_green mx-auto rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {sections.rewards.map(({ title, image }, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative mb-3">
                <div className="absolute inset-0 bg-primary_green/10 rounded-xl blur-lg group-hover:bg-primary_green/20 transition-all" />
                <Image 
                  src={image} 
                  alt={title}
                  width={100} 
                  height={60}
                  className="relative z-10 h-auto group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Section;
