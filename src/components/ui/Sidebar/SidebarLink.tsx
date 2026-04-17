import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  label: string;
}

export const SidebarLink = ({ to, label }: SidebarLinkProps) => {
  const { pathname } = useLocation();
  return (
    <li
      className={`gap-1 text-lg text border-l-2 w-full hover:border-chart-1/90 hover:text-chart-1/90 transition-all ${pathname === to ? "border-chart-1 bg-from-chart-1 to-10% bg-linear-to-r from-chart-1/20 to-transparent text-chart-1" : "border-transparent"} `}
    >
      <Link to={to} className="p-2 w-full block">
        {label}
      </Link>
    </li>
  );
};
