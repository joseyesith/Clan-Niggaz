// controllers/admin.controllers.js

import User from "../models/user.model.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // no enviar contraseñas
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// Editar un usuario
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");
    res.json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
