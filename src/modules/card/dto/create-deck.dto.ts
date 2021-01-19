import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInstance,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DeckConfDto {}

export class CreateDeckDto {
  @ApiProperty({ type: String, description: 'deck name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ type: String, description: 'deck description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: DeckConfDto })
  @Type(() => DeckConfDto)
  @IsInstance(DeckConfDto)
  conf: DeckConfDto;

  @ApiPropertyOptional({ type: Boolean, description: 'is it shared to public' })
  @IsOptional()
  @IsBoolean()
  isPublic: boolean;
}
