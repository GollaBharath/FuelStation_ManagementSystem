// src/layouts/DashboardLayout.tsx
import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";
import React from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isLoggedIn } = useAuth();
  const [collapsed, setCollapsed] = React.useState(false);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <main
        className={`transition-margin duration-300 ${
          collapsed ? "ml-16" : "ml-48"
        } flex-1 min-h-screen p-6`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
