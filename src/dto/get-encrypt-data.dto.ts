import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetEncryptDataDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 2000)
  payload: string;
}
