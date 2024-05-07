import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  loginUserService,
  registerUserService,
  getUserByIdService 
} from "../services/user.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

export const registerUser = catchedController(
  async (req: Request, res: Response) => {
    const { email, password, name, address, phone } = req.body;
    const newUser = await registerUserService({
      email,
      password,
      name,
      address,
      phone,
    });

    // Generar token JWT
    const token = jwt.sign({ email: newUser.email }, JWT_SECRET);

    res.status(201).json({ user: newUser, token });
  }
);

export const login = catchedController(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUserService({ email, password });
  res.status(200).send({
    login: true,
    user: user.user,
    token: user.token,
  });
});

export const searchUserById = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id, 10);
  try {
      if (isNaN(userId)) {
          throw new Error("El ID del usuario no es un número válido");
      }
      const user = await getUserByIdService(userId);
      if (!user) {
          throw new Error("No se encontró el usuario con el ID");
      }
      res.status(200).json(user);
  } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(404).json({ error: "Error interno del servidor" });
  }
};