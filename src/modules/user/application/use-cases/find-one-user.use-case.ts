import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindOneUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userOnShops: {
          include: { shop: true },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
