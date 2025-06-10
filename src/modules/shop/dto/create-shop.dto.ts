import {
  IsString,
  IsInt,
  IsEnum,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { ShopStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateShopDto {
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

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsInt()
  updated_by?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Type(() => Number)
  userIds?: number[];
}
