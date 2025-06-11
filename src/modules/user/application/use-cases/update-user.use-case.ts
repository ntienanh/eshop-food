import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindOneUserUseCase } from './find-one-user.use-case';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  async execute(id: number, updateUserDto: UpdateUserDto) {
    await this.findOneUserUseCase.execute(id);

    const { shopIds, ...userData } = updateUserDto;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: userData,
    });

    if (shopIds?.length) {
      await this.prisma.userOnShop.deleteMany({ where: { userId: id } });

      await this.prisma.userOnShop.createMany({
        data: shopIds.map((shopId) => ({ userId: id, shopId })),
        skipDuplicates: true,
      });
    }

    return updatedUser;
  }
}
