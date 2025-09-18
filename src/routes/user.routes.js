import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Actualizar perfil de usuario
router.put("/profile", authMiddleware, updateUser);

// Eliminar perfil de usuario
router.delete("/profile", authMiddleware, deleteUser);

export default router;
