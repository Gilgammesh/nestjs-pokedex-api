import { IsInt, IsString, IsPositive, Min, IsNotEmpty, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  @IsNotEmpty()
  no: number;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.toLowerCase())
  name: string;
}
