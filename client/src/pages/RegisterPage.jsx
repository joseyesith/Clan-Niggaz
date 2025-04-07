import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex h-screen">
      {/* Lado Izquierdo: Formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-white text-black rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6 text-red-700">Registro</h1>

          {registerErrors.map((error, i) => (
            <Message message={error} key={i} />
          ))}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username">Nombre de usuario:</Label>
              <Input
                type="text"
                name="username"
                placeholder="Escribe tu nombre"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Correo electrónico:</Label>
              <Input
                name="email"
                placeholder="tucorreo@dominio.com"
                {...register("email")}
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
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmar contraseña:</Label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="********"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
              Registrarse
            </Button>
          </form>

          <p className="mt-4 text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-red-500 hover:text-red-700 font-semibold">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>

      {/* Lado Derecho: Imagen de fondo y texto */}
      <div
        className="hidden md:flex w-1/2 items-center justify-center bg-cover bg-center text-white text-center p-10"
        style={{ backgroundImage: "url('/tete.jpg')" }} // asegúrate de que esté en public/
      >
        <div className="bg-red-700 bg-opacity-80 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">¿Ya tienes una cuenta?</h2>
          <p className="mb-6">Inicia sesión para acceder al estudio</p>
          <Link
            to="/login"
            className="border-2 border-white py-2 px-6 rounded hover:bg-white hover:text-red-700 transition font-semibold"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
