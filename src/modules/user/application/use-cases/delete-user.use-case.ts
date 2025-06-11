import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindOneUserUseCase } from './find-one-user.use-case';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  async execute(id: number) {
    await this.findOneUserUseCase.execute(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
