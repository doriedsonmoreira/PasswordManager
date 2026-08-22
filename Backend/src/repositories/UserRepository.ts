import prisma from "../lib/prisma";

export class UserRepository {
  async register(data: {
    name: string;
    email: string;
    password: string;
    salt: string;
  }) {
    return await prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }
}
