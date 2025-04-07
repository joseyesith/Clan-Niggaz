import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-white">
      {/* Sección de Bienvenida */}
      <div className="bg-[url('/tete.jpg')] bg-cover bg-center flex h-[calc(45vh-45px)] items-center justify-center">
        <h1 className="relative text-4xl md:text-5xl font-bold text-center text-white drop-shadow-lg">
          BIENVENIDOS A NUESTRO ESTUDIO
        </h1>
      </div>

      {/* Sección "¿Por qué elegirnos?" */}
      <div className="bg-black text-white p-6 rounded-lg flex flex-col md:flex-row items-center my-6 mx-4 md:mx-12 shadow-md">
        <div className="md:w-1/3">
          <img
            src="/microfono.jpg"
            alt="Micrófono de Estudio"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3 md:ml-6 text-center md:text-left">
          <h2 className="text-2xl font-bold text-red-600">¿POR QUÉ ELEGIRNOS?</h2>
          <p className="mt-3 text-base">
            En nuestro estudio, te sumergimos en un espacio diseñado para inspirarte y llevar tu creatividad al siguiente nivel. Contamos con equipos de última tecnología, una acústica profesional y un ambiente cómodo para que tu experiencia musical sea inigualable.
          </p>
        </div>
      </div>

      {/* Sección "Qué Nos Hace Únicos" */}
      <div className="bg-black text-white p-6 rounded-lg flex flex-col md:flex-row items-center my-6 mx-4 md:mx-12 shadow-md">
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-2xl font-bold text-red-600">QUÉ NOS HACE ÚNICOS</h2>
          <p className="mt-3 text-base">
            Valoramos cada proyecto, ya seas un artista emergente o profesional. Más que un servicio, brindamos una experiencia de producción donde cada detalle cuenta.
          </p>
        </div>
        <div className="md:w-1/3 md:ml-6">
          <img
            src="/equipos de estudio.jpg"
            alt="Equipo de Estudio"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Sección "Sala de Producción" */}
      <div className="bg-black text-white p-6 rounded-lg flex flex-col md:flex-row items-center my-6 mx-4 md:mx-12 shadow-md">
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-2xl font-bold text-red-600">SALA DE PRODUCCIÓN</h2>
          <p className="mt-3 text-base">
            Equipada con software y hardware de buen nivel para edición, mezcla y masterización de tus proyectos. Nuestro estudio está diseñado para que te sientas cómodo mientras creas tu mejor música.
          </p>
          <Link to="/add-task">
            <button className="mt-3 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
              AGENDA TU CITA
            </button>
          </Link>
        </div>
        <div className="md:w-1/3 md:ml-6">
          <img
            src="/sala de estudio.jpg"
            alt="Sala de Producción"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
