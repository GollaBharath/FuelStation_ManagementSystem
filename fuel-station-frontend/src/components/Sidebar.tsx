// src/components/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { Menu, LayoutDashboard, Fuel, BarChart3 } from "lucide-react";

// ✅ Define props interface
interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

// ✅ Accept props using SidebarProps
const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-purple-800 text-white"
      : "text-purple-100 hover:bg-purple-700";

  const links = [
    { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { to: "/fuel-entry", label: "Fuel Entry", Icon: Fuel },
    { to: "/reports", label: "Reports", Icon: BarChart3 },
  ];

  return (
    <div
      className={`fixed top-12 left-0 h-screen bg-purple-900 flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-48"
      }`}
    >
      <div className="flex items-center justify-between p-2">
        {!collapsed && (
          <h1 className="text-sm font-semibold text-white">Menu</h1>
        )}
        <button onClick={onToggle} className="p-1 text-white">
          <Menu size={16} />
        </button>
      </div>

      <nav className="mt-4 flex-1 flex flex-col space-y-1">
        {links.map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${isActive(to)}`}
          >
            {collapsed && <Icon size={16} />}
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
