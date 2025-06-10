// create-table.dto.ts
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTableDto {
  @IsString()
  name: string;

  @IsString()
  order_number: string;

  @IsString()
  qr_code: string;

  @IsInt()
  shop_id: number;

  @IsOptional()
  @IsInt()
  cart_id?: number;

  @IsOptional()
  @IsInt()
  created_by?: number;
}
