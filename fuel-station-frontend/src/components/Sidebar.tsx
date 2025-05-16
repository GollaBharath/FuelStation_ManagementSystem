import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  Fuel,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/useAuth";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { role } = useAuth();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    Reports: false,
  });

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-purple-800 text-white"
      : "text-purple-100 hover:bg-purple-700";

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const links = [
    { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { to: "/fuel-entry", label: "Fuel Entry", Icon: Fuel },
  ];

  const dropdowns = [
    {
      label: "Reports",
      Icon: BarChart3,
      children: [
        { to: "/reports/daily", label: "Daily Report" },
        { to: "/reports/credits", label: "Credits & Dues" },
      ],
    },
  ];

  return (
    <div
      className={`fixed top-12 left-0 h-[calc(100vh-3rem)] overflow-hidden bg-purple-900 flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-36"
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

      <nav className="mt-4 flex-1 flex flex-col space-y-1 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-purple-800 pr-1">
        {role === "admin" && (
          <Link
            to="/admin-settings"
            className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${isActive(
              "/admin-settings"
            )}`}
          >
            {collapsed ? <Settings size={16} /> : <span>Admin Settings</span>}
          </Link>
        )}

        {/* Regular links */}
        {links.map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${isActive(to)}`}
          >
            {collapsed ? <Icon size={16} /> : <span>{label}</span>}
          </Link>
        ))}

        {/* Dropdowns */}
        {dropdowns.map(({ label, Icon, children }) => (
          <div key={label} className="flex flex-col">
            <button
              onClick={() => toggleDropdown(label)}
              className={`flex items-center justify-between px-2 py-2 rounded text-sm w-full ${
                openDropdowns[label]
                  ? "bg-purple-800 text-white"
                  : "text-purple-100 hover:bg-purple-700"
              }`}
            >
              <span className="flex items-center gap-2">
                {collapsed ? (
                  <div className="flex flex-flow-row">
                  <Icon size={16} />
                  <ChevronDown size={16} />
                  </div>
                ) : (
                  <>
                    {/* <Icon size={16} /> */}
                    {label}
                  </>
                )}
              </span>
              {!collapsed && (
                <span className="ml-auto">
                  {openDropdowns[label] ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </span>
              )}
            </button>

            {!collapsed && openDropdowns[label] && (
              <div className="ml-6 mt-1 flex flex-col space-y-1">
                {children.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    className={`text-sm px-2 py-1 rounded ${
                      isActive(child.to)
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
