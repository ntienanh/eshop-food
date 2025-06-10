import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ShopCreateInput) {
    return this.prisma.shop.create({ data });
  }

  findAll() {
    return this.prisma.shop.findMany();
  }

  findOne(id: number) {
    return this.prisma.shop.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.ShopUpdateInput) {
    return this.prisma.shop.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.shop.delete({ where: { id } });
  }
}
