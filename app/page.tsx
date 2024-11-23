import { Metadata } from "next";
import Dashboard from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Smart Auditorium",
  description: "Real-time overview of auditorium occupancy and attendance statistics",
};

export default function Home() {
  return <Dashboard />;
}