import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex h-screen">
      {/* Lado Izquierdo: Formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-white text-black rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6 text-red-700">Iniciar sesión</h1>

          {loginErrors.map((error, i) => (
            <Message message={error} key={i} />
          ))}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo electrónico:</Label>
              <Input
                type="email"
                name="email"
                placeholder="tucorreo@dominio.com"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Contraseña:</Label>
              <Input
                type="password"
                name="password"
                placeholder="********"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full mt-4">
              Ingresar
            </Button>
          </form>

          <p className="mt-4 text-center">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-red-500 hover:text-red-700 font-semibold">
              Regístrate
            </Link>
          </p>
        </div>
      </div>

      {/* Lado Derecho: Imagen o información */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-red-700 text-white text-center p-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">¿Aún no tienes cuenta?</h2>
          <p className="mb-6">Regístrate para acceder a nuestro estudio</p>
          <Link
            to="/register"
            className="border-2 border-white py-2 px-6 rounded hover:bg-white hover:text-red-700 transition font-semibold"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
