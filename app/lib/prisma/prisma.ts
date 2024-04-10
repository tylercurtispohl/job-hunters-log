import { PrismaClient } from "@prisma/client";

export class Prisma {
  private static instance: Prisma;
  private prismaClient: PrismaClient;

  private constructor() {
    this.prismaClient = new PrismaClient();
  }

  public static getInstance(): Prisma {
    if (!Prisma.instance) {
      Prisma.instance = new Prisma();
    }

    return Prisma.instance;
  }

  public static getClient(): PrismaClient {
    return this.getInstance().prismaClient;
  }
}
