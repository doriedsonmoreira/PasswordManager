import { Request, Response, NextFunction } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import { UserRepository } from "../repositories/UserRepository";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userRepository = new UserRepository();

  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Dont have authorization");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Token not provided");
  }

  const { id } = jwt.verify(token, process.env.JWT_PASS ?? ``) as JwtPayload;

  const user = await userRepository.findById(id.toString());

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  const { password: _, ...userLogged } = user;

  req.user = userLogged;

  next();
};
