import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const isAdmin = user?.role === "admin";

  const navItemStyle =
    "bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-md border-none outline-none shadow-none transition duration-300";

  return (
    <nav className="bg-white my-3 flex justify-between py-5 px-10 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-black">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Clan Niggaz</Link>
      </h1>

      <ul className="flex gap-x-4 items-center">
        <li>
          <Link to="/" className={navItemStyle}>
            Inicio
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li className="text-black font-bold">
              Bienvenido {user.username}
            </li>

            <li>
              <Link to="/add-task" className={navItemStyle}>
                Reservas
              </Link>
            </li>

            <li>
              <Link to="/room" className={navItemStyle}>
                Nuestro Estudio
              </Link>
            </li>

            {isAdmin && (
              <li>
                <Link to="/admin" className={navItemStyle}>
                  Admin
                </Link>
              </li>
            )}

            <li>
              <button onClick={logout} className={navItemStyle}>
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={navItemStyle}>
                Iniciar Sesión
              </Link>
            </li>

            <li>
              <Link to="/register" className={navItemStyle}>
                Registro
              </Link>
            </li>

            <li>
              <Link to="/room" className={navItemStyle}>
                Nuestro Estudio
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
