import { Injectable } from '@nestjs/common';
import { UserRole } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async create(data: {
    name: string;
    user_name: string;
    password: string;
    created_by?: number;
    updated_by?: number;
    role: UserRole;
  }) {
    return this.prisma.user.create({ data });
  }
}
