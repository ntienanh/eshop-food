import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateProductCategoryDto {
  @IsInt()
  shop_id: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
