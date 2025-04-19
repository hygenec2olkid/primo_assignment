import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetEncryptDataDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 2000)
  @ApiProperty({ example: 'data information' })
  payload: string;
}
