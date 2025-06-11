import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createUserDto: CreateUserDto & { shopIds?: number[] }) {
    const { shopIds, ...rest } = createUserDto;

    return this.prisma.user.create({
      data: {
        ...rest,
        role: rest.role ?? 'USER',
        userOnShops: shopIds
          ? {
              create: shopIds.map((shopId) => ({
                shop: { connect: { id: shopId } },
              })),
            }
          : undefined,
      },
    });
  }
}
