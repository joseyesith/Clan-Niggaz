export function RoomPage() {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
        <h2 className="text-3xl font-bold mb-4 text-black">Nuestro Estudio</h2>
        <p className="text-gray-700 mb-4">
          Bienvenido a nuestro estudio profesional. Ofrecemos un espacio equipado con tecnología de punta para grabaciones, mezclas y producciones musicales.
        </p>
        
        <ul className="list-disc list-inside text-gray-800 mb-6">
          <li>Cabina de grabación insonorizada</li>
          <li>Micrófonos de condensador de alta calidad</li>
          <li>Interfaz de audio Focusrite Scarlett</li>
          <li>Monitores KRK Rokit 5</li>
          <li>Producción y mezcla profesional</li>
          <li>Horario flexible con previa reserva</li>
        </ul>
  
        <p className="text-gray-700">
          Si quieres agendar una sesión, visita la sección de <strong>Reservas</strong>.
        </p>
      </div>
    );
  }
  