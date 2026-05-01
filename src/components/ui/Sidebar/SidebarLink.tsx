import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  label: string;
}

export const SidebarLink = ({ to, label }: SidebarLinkProps) => {
  const { pathname } = useLocation();
  return (
    <li
      className={`gap-1 text-lg text border-l-2 w-full hover:border-sidebar-primary/90 hover:text-sidebar-primary/90 transition-all pl-4 ${pathname === to ? "border-sidebar-primary bg-from-primary to-10% bg-linear-to-r from-sidebar-primary/20 to-transparent text-sidebar-primary" : "border-transparent"} `}
    >
      <Link to={to} className="p-2 w-full block">
        {label}
      </Link>
    </li>
  );
};
