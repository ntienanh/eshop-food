import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductCategoryDto) {
    return this.prisma.productCategory.create({
      data: {
        ...data,
        description: data.description ?? '',
      },
    });
  }

  findAll() {
    return this.prisma.productCategory.findMany();
  }

  findOne(id: number) {
    return this.prisma.productCategory.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateProductCategoryDto) {
    return this.prisma.productCategory.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.productCategory.delete({ where: { id } });
  }
}
