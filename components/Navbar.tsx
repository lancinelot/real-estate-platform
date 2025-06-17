"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Building2,
  Mail,
  Settings,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Gérer le scroll pour l'effet de transparence
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    {
      label: "Accueil",
      href: "/",
      icon: Home,
      description: "Page d'accueil",
    },
    {
      label: "Propriétés",
      href: "/properties",
      icon: Building2,
      description: "Nos biens immobiliers",
    },
    {
      label: "Contact",
      href: "/contact",
      icon: Mail,
      description: "Contactez-nous",
    },
    {
      label: "Admin",
      href: "/admin",
      icon: Settings,
      description: "Espace administrateur",
      isSpecial: true,
    },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed w-full z-[9999] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-white shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 lg:h-18">
            {/* Logo avec effet hover */}
            <Link href="/" className="group flex items-center space-x-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-110">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity blur-md"></div>
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Lancine Keita
              </span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative group flex items-center px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      item.isSpecial
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105"
                        : isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 mr-2 ${
                        item.isSpecial ? "text-white" : ""
                      }`}
                    />
                    {item.label}

                    {/* Indicateur de page active */}
                    {isActive && !item.isSpecial && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Hamburger Button avec animation et accessibilité améliorée */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              title={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                  className="absolute h-0.5 w-6 bg-current transform transition-all duration-300 origin-center"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute h-0.5 w-6 bg-current transform transition-all duration-300"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                  className="absolute h-0.5 w-6 bg-current transform transition-all duration-300 origin-center"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={closeMenu}
              />

              {/* Menu Panel */}
              <motion.div
                id="mobile-menu"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-50"
              >
                <div className="flex flex-col h-full">
                  {/* Header du menu mobile */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-800">
                      Menu
                    </span>
                    <button
                      onClick={closeMenu}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Fermer le menu"
                      title="Fermer le menu"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Navigation mobile */}
                  <nav className="flex-1 px-4 py-6">
                    <div className="space-y-2">
                      {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = isActiveLink(item.href);

                        return (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link
                              href={item.href}
                              onClick={closeMenu}
                              className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                                item.isSpecial
                                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                                  : isActive
                                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                              }`}
                            >
                              <div className="flex items-center">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                                    item.isSpecial
                                      ? "bg-white/20"
                                      : isActive
                                      ? "bg-blue-100"
                                      : "bg-gray-100 group-hover:bg-blue-100"
                                  }`}
                                >
                                  <Icon
                                    className={`w-5 h-5 ${
                                      item.isSpecial
                                        ? "text-white"
                                        : isActive
                                        ? "text-blue-600"
                                        : "text-gray-600 group-hover:text-blue-600"
                                    }`}
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {item.label}
                                  </div>
                                  <div
                                    className={`text-sm ${
                                      item.isSpecial
                                        ? "text-white/80"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                              <ChevronRight
                                className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                                  item.isSpecial
                                    ? "text-white/60"
                                    : "text-gray-400"
                                }`}
                              />
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </nav>

                  {/* Footer du menu mobile */}
                  <div className="p-6 border-t border-gray-100">
                    <div className="text-center text-sm text-gray-500">
                      © 2024 Lancine Keita
                      <br />
                      Tous droits réservés
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer pour éviter que le contenu soit caché sous la navbar fixe */}
      <div className="h-16 lg:h-18" />
    </>
  );
}
