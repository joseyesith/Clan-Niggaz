import { Link } from "react-router-dom";

export function ButtonLink({ to, children, className = "" }) {
  return (
    <Link
      to={to}
      className={`bg-black hover:bg-gray-900 text-white font-semibold py-2 px-5 rounded-md border-none outline-none shadow-none transition duration-300 ${className}`}
    >
      {children}
    </Link>
  );
}
