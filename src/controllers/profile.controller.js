import { handleSuccess } from "../Handlers/responseHandlers.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "Este es un perfil público.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}

import { findUserById, saveUser, removeUser } from "../services/user.service.js";
import bcrypt from "bcrypt";

export async function updateProfile(req, res) {
  try {
  const userId = req.user.sub;
  const { email, password } = req.body;
  const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
  await saveUser(user);
    return res.status(200).json({ message: "Perfil actualizado" });
  } catch (error) {
    return res.status(500).json({ message: "Error inesperado en la actualizacion de perfil", error: error.message });
  }
}

export async function deleteProfile(req, res) {
  try {
  const userId = req.user.sub;
  const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  await removeUser(user);
    return res.status(200).json({ message: "Perfil eliminado, trágicamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar perfil", error: error.message });
  }
}
