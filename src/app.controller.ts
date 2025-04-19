import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetEncryptDataDto } from './dto/get-encrypt-data.dto';
import { GetDecryptDataDto } from './dto/get-decrypt-data.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('get-encrypt-data')
  getEncryptData(@Body() body: GetEncryptDataDto): any {
    return this.appService.getEncryptData(body);
  }

  @Post('get-decrypt-data')
  getDecryptData(@Body() body: GetDecryptDataDto): any {
    return this.appService.getDecryptData(body);
  }
}
