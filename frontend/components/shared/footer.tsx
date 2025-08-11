"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Heart,
  Shield,
  Award,
  Users
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    resources: [
      { name: "Condition A-Z", href: "/conditions" },
      { name: "Therapy", href: "/therapy" },
      { name: "Living Well", href: "/living-well" },
      { name: "Relationships", href: "/relationships" },
      { name: "Psychology", href: "/psychology" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Press", href: "/press" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Crisis Support", href: "/crisis" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Editorial Process", href: "/editorial" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
    { icon: Youtube, href: "#", name: "YouTube" },
  ];

  const trustIndicators = [
    { icon: Shield, text: "HIPAA Compliant", color: "text-blue-400" },
    { icon: Award, text: "Award Winning", color: "text-yellow-400" },
    { icon: Users, text: "Expert Reviewed", color: "text-green-400" },
    { icon: Heart, text: "Trusted by Millions", color: "text-red-400" },
  ];

  return (
    <footer className="bg-gradient-to-br from-deep_blue via-primary_blue to-deep_blue text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary_green rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-mint_green rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Newsletter Section */}
        <motion.div
          className="py-16 border-b border-white/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Stay Informed About Mental Health
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Get expert insights, latest research, and helpful tips delivered to your inbox weekly.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <form className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 outline-none focus:border-primary_green transition-colors"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="px-8 py-3 bg-primary_green hover:bg-primary_green/90 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="block mb-6">
                <Image
                  src={assets.verywellmind}
                  alt="LifeInsight"
                  width={180}
                  height={60}
                  className="h-12 w-auto hover:opacity-80 transition-opacity"
                />
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your trusted companion for mental health and wellness. Evidence-based content reviewed by experts.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary_green" />
                  <span>123 Wellness Street, Mental Health City</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary_green" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary_green" />
                  <span>support@lifeinsight.com</span>
                </div>
              </div>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold mb-6">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary_green transition-colors duration-300 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary_green transition-colors duration-300 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary_green transition-colors duration-300 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="py-12 border-t border-b border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h4 className="text-center text-xl font-semibold mb-8">Why Trust LifeInsight?</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <indicator.icon className={`w-8 h-8 ${indicator.color} mx-auto mb-3`} />
                  <p className="font-medium">{indicator.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-300">
                © 2024 LifeInsight. All rights reserved.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Content reviewed by licensed mental health professionals.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-300 mr-2">Follow us:</span>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-primary_green hover:border-primary_green transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
