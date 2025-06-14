import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { ShopModule } from './modules/shop/shop.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { TableModule } from './modules/table/table.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ShopModule,
    ProductCategoryModule,
    TableModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
