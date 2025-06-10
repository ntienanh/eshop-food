import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { UserResponseDto } from '../user/inteface';

@Injectable()
export class ShopService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShopDto: CreateShopDto) {
    return this.prisma.shop.create({
      data: createShopDto,
    });
  }

  async findAll() {
    return this.prisma.shop.findMany({
      orderBy: { created_at: 'desc' }, // New to old
    });
  }

  async findOne(id: number) {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
      include: {
        userOnShops: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!shop) throw new NotFoundException('Shop not found');

    return shop;
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    await this.findOne(id); // Ensure shop exists
    return this.prisma.shop.update({
      where: { id },
      data: updateShopDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure shop exists
    return this.prisma.shop.delete({ where: { id } });
  }

  async addUserToShop(shopId: number, userId: number) {
    return this.prisma.userOnShop.create({
      data: {
        shopId,
        userId,
      },
    });
  }
}
