import { User } from "@prisma/client";

type UserLogged = Omit<User, "password">;

declare global {
  namespace Express {
    export interface Request {
      user?: UserLogged;
    }
  }
}
