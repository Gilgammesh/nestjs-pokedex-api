import { IsInt, IsPositive, Min, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class QueryPaginationDto {
  @Transform(({ value }: TransformFnParams) => +value)
  @IsInt()
  @IsPositive()
  @Min(1)
  @IsNotEmpty()
  @IsOptional()
  limit?: number;

  @Transform(({ value }: TransformFnParams) => +value)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  offset?: number;
}
