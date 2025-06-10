import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { cart_id, note, items } = createOrderDto;

    return this.prisma.order.create({
      data: {
        cart: { connect: { id: cart_id } },
        note,
        items: {
          create: items.map((item) => ({
            product: { connect: { id: item.product_id } },
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({ include: { items: true } });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException(`Order #${id} not found`);

    const data: any = { ...updateOrderDto };

    if (updateOrderDto.cart_id) {
      data.cart = { connect: { id: updateOrderDto.cart_id } };
      delete data.cart_id;
    }

    return this.prisma.order.update({
      where: { id },
      data,
    });
  }
}
