import CategoriesManager from "./CategoriesManager";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Categories | Admin",
};

export default function CategoriesPage() {
  return <CategoriesManager />;
}
