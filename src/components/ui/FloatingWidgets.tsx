"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearToast } from "@/store/uiSlice";
import { useSettings } from "@/components/SettingsContext";

const WHATSAPP_MESSAGE = encodeURIComponent("Hello, I would like to schedule a legal consultation with Armooh-Williams, PLLC.");

export function WhatsAppButton() {
  const { whatsapp } = useSettings();
  const number = whatsapp.replace(/\D/g, "");
  return (
    <motion.a
      href={`https://wa.me/${number}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.5)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.6)] transition-shadow duration-300"
      aria-label="Chat on WhatsApp"
    >
      <Image src="/whatsapp.png" alt="WhatsApp" width={32} height={32} className="object-contain" />
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
    </motion.a>
  );
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollUp}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="fixed bottom-24 right-6 z-50 w-11 h-11 rounded-full bg-teal-950 border border-white/15 hover:border-coral-500/50 hover:bg-teal-900 flex items-center justify-center shadow-luxury-lg transition-colors duration-200"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} className="text-white/70" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

const toastIcons = {
  success: <CheckCircle2 size={18} className="text-teal-400" />,
  error: <AlertCircle size={18} className="text-coral-500" />,
  info: <Info size={18} className="text-teal-300" />,
};

const toastColors = {
  success: "border-teal-500/30 bg-teal-950",
  error: "border-coral-500/30 bg-teal-950",
  info: "border-teal-400/30 bg-teal-950",
};

export function Toast() {
  const dispatch = useAppDispatch();
  const { toastMessage, toastType } = useAppSelector((s) => s.ui);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => dispatch(clearToast()), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dispatch]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`fixed bottom-24 right-6 z-80 flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-luxury-lg ${toastColors[toastType]}`}
        >
          {toastIcons[toastType]}
          <span className="font-body text-sm text-white">{toastMessage}</span>
          <button onClick={() => dispatch(clearToast())} className="ml-2 text-white/40 hover:text-white transition-colors">
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
