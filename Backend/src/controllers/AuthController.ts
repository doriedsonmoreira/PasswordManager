import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError("Please fill all the fields");
    }

    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new BadRequestError("This email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.register({
      name,
      email,
      password: hashedPassword,
    });

    const { password: _, ...user } = newUser;

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please fill all the fields");
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError("Invalid email or password");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new BadRequestError("Invalid email or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? ``, {
      expiresIn: "30m",
    });

    const { password: _, ...userLogged } = user;

    return res.status(200).json({
      user: userLogged,
      token,
    });
  }

  async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}
