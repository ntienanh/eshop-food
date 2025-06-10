import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTableDto: CreateTableDto) {
    return this.prisma.table.create({
      data: createTableDto,
    });
  }

  async findAll() {
    return this.prisma.table.findMany({
      include: {
        shop: true,
        cart: true,
      },
    });
  }

  async findOne(id: number) {
    const table = await this.prisma.table.findUnique({
      where: { id },
      include: {
        shop: true,
        cart: true,
      },
    });
    if (!table) throw new NotFoundException('Table not found');
    return table;
  }

  async update(id: number, updateTableDto: UpdateTableDto) {
    await this.findOne(id); // ensure it exists
    return this.prisma.table.update({
      where: { id },
      data: updateTableDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.table.delete({
      where: { id },
    });
  }
}
