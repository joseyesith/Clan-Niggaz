import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.js";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/admin.controllers.js";

const router = Router();

// Ruta de bienvenida al dashboard admin
router.get("/dashboard", auth, isAdmin, (req, res) => {
  res.json({
    message: "Bienvenido al dashboard de administrador",
    user: req.user,
  });
});

// Ruta de estadísticas para el dashboard
router.get("/stats", auth, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();

    const recentTasks = await Task.find()
      .sort({ date: -1 })
      .limit(5)
      .select("cliente telefono date horaInicio duracion servicio asistenciaTecnica notasAdicionales");

    const tasksPerDate = await Task.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ totalUsers, totalTasks, recentTasks, tasksPerDate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener estadísticas" });
  }
});

// 🔒 Rutas de administración de usuarios
router.get("/users", auth, isAdmin, getAllUsers);
router.put("/users/:id", auth, isAdmin, updateUser);
router.delete("/users/:id", auth, isAdmin, deleteUser);

export default router;

