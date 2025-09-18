// No se requiere lógica de notas
import { findUserByEmail, findUserById, saveUser, removeUser } from "../services/user.service.js";
import { handleSuccess, handleErrorClient } from "../Handlers/responseHandlers.js";

// Solo controladores de usuario

// Controladores de usuario fuera de la clase
export async function updateUser(req, res) {
  try {
    const changes = req.body;
    const id = req.user.sub;
    if (!changes || Object.keys(changes).length === 0) {
      return handleErrorClient(res, 400, "Datos para actualizar necesarios");
    }
  const user = await findUserById(id);
    if (!user) {
      return handleErrorClient(res, 404, "Usuario no encontrado");
    }
    // Solo permitir actualizar email y password
    if (changes.email) user.email = changes.email;
    if (changes.password) {
      const bcrypt = await import('bcrypt');
      user.password = await bcrypt.default.hash(changes.password, 10);
    }
  await saveUser(user);
    handleSuccess(res, 200, "Perfil actualizado sin complicaciones", { id: user.id, email: user.email });
  } catch (error) {
    handleErrorClient(res, 500, error.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.user.sub;
  const user = await findUserById(id);
    if (!user) {
      return handleErrorClient(res, 404, "Usuario no encontrado");
    }
  await removeUser(user);
    handleSuccess(res, 200, "Perfil eliminado, trágicamente", { id });
  } catch (error) {
    handleErrorClient(res, 500, error.message);
  }
}
