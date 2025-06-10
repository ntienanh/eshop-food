import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto & { shopIds?: number[] }) {
    const { shopIds, ...rest } = createUserDto;

    const createdUser = await this.prisma.user.create({
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

    return createdUser;
  }

  async findAll() {
    return this.prisma.user.findMany({
      orderBy: { created_at: 'desc' }, // New to old
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userOnShops: {
          include: {
            shop: true, // 👈 Lấy luôn thông tin Shop nếu muốn
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id); // Ensure user exists

    const { shopIds, ...userData } = updateUserDto;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: userData,
    });

    if (shopIds?.length) {
      // Xóa quan hệ cũ
      await this.prisma.userOnShop.deleteMany({
        where: { userId: id },
      });

      // Tạo lại quan hệ mới
      const connectData = shopIds.map((shopId) => ({
        userId: id,
        shopId,
      }));

      await this.prisma.userOnShop.createMany({
        data: connectData,
        skipDuplicates: true,
      });
    }

    return updatedUser;
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure user exists
    return this.prisma.user.delete({ where: { id } });
  }
}
