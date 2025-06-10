import { IsEnum, IsInt, IsString } from 'class-validator';
import { ShopStatus } from '@prisma/client';

export class CreateShopDto {
  @IsInt()
  user_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(ShopStatus)
  status: ShopStatus;

  @IsString()
  address: string;

  @IsString()
  thumbnail: string;

  @IsInt()
  table_quantity: number;
}
