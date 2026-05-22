"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  mobileMenuOpen: boolean;
  activeSection: string;
  newsletterEmail: string;
  toastMessage: string | null;
  toastType: "success" | "error" | "info";
}

const initialState: UIState = {
  mobileMenuOpen: false,
  activeSection: "home",
  newsletterEmail: "",
  toastMessage: null,
  toastType: "info",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload;
    },
    setNewsletterEmail(state, action: PayloadAction<string>) {
      state.newsletterEmail = action.payload;
    },
    showToast(state, action: PayloadAction<{ message: string; type?: "success" | "error" | "info" }>) {
      state.toastMessage = action.payload.message;
      state.toastType = action.payload.type ?? "info";
    },
    clearToast(state) {
      state.toastMessage = null;
    },
  },
});

export const {
  setMobileMenuOpen,
  toggleMobileMenu,
  setActiveSection,
  setNewsletterEmail,
  showToast,
  clearToast,
} = uiSlice.actions;

export default uiSlice.reducer;
