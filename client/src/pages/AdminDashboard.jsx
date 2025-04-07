import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/stats", {
        withCredentials: true,
      });
      setStats(res.data);
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleDelete = async (taskId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta reserva?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/tasks/${taskId}`, {
        withCredentials: true,
      });
      await fetchStats();
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      alert("Ocurrió un error al eliminar la reserva.");
    }
  };

  const openEditModal = (task) => {
    setEditingTask({ ...task });
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:4000/api/tasks/${editingTask._id}`,
        editingTask,
        { withCredentials: true }
      );
      setIsModalOpen(false);
      await fetchStats();
    } catch (error) {
      console.error("Error al editar la reserva:", error);
      alert("Ocurrió un error al editar la reserva.");
    }
  };

  if (!stats) {
    return <p className="text-center mt-10 text-gray-500">Cargando estadísticas...</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-black">Total de Usuarios</h2>
            <p className="text-3xl text-black">{stats.totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-black">Total de Reservas</h2>
            <p className="text-3xl text-black">{stats.totalTasks}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-black">Reservas recientes</h2>
        <ul className="space-y-6">
          {stats.recentTasks.length === 0 ? (
            <p className="text-gray-500">No hay reservas recientes.</p>
          ) : (
            stats.recentTasks.map((task, index) => (
              <li key={index} className="border-b pb-4">
                <div className="text-black space-y-1">
                  <p><strong>Título:</strong> {task.title}</p>
                  <p><strong>Cliente:</strong> {task.clientName}</p>
                  <p><strong>Teléfono:</strong> {task.phone}</p>
                  <p><strong>Servicio:</strong> {task.serviceType}</p>
                  <p><strong>Inicio:</strong> {task.startTime}</p>
                  <p><strong>Duración:</strong> {task.duration}</p>
                  <p><strong>Fecha:</strong> {new Date(task.date).toLocaleDateString()}</p>
                  <p><strong>Asistencia Técnica:</strong> {task.techAssistance ? "Sí" : "No"}</p>
                  <p><strong>Notas:</strong> {task.notes}</p>
                </div>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => openEditModal(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Modal de edición */}
      {isModalOpen && editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-black">Editar Reserva</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={editingTask.title}
                onChange={handleEditChange}
                placeholder="Título"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="clientName"
                value={editingTask.clientName || ""}
                onChange={handleEditChange}
                placeholder="Nombre del cliente"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="phone"
                value={editingTask.phone || ""}
                onChange={handleEditChange}
                placeholder="Teléfono"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="serviceType"
                value={editingTask.serviceType || ""}
                onChange={handleEditChange}
                placeholder="Tipo de servicio"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="time"
                name="startTime"
                value={editingTask.startTime || ""}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="duration"
                value={editingTask.duration || ""}
                onChange={handleEditChange}
                placeholder="Duración"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="date"
                name="date"
                value={editingTask.date?.split("T")[0] || ""}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                name="notes"
                value={editingTask.notes || ""}
                onChange={handleEditChange}
                placeholder="Notas"
                className="w-full border px-3 py-2 rounded"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="techAssistance"
                  checked={editingTask.techAssistance || false}
                  onChange={handleEditChange}
                />
                <span>¿Requiere asistencia técnica?</span>
              </label>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
