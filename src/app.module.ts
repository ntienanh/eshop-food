import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { ShopModule } from './modules/shop/shop.module';

@Module({
  imports: [PrismaModule, UserModule, ShopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
