import { Injectable } from '@nestjs/common';
import { GetEncryptDataDto } from './dto/get-encrypt-data.dto';

import {
  createCipheriv,
  createDecipheriv,
  privateEncrypt,
  publicDecrypt,
  randomBytes,
} from 'crypto';
import { GetDecryptDataDto } from './dto/get-decrypt-data.dto';
import { ResponseDto } from './dto/response.dto';
import { PRIVATE_KEY, PUBLIC_KEY } from './key';

@Injectable()
export class AppService {
  private publicKey = PUBLIC_KEY;
  private privateKey = PRIVATE_KEY;

  getEncryptData(body: GetEncryptDataDto): ResponseDto {
    const { payload } = body;

    // create AES key
    const aesKey = randomBytes(32); // 256-bit AES key
    const iv = randomBytes(16); // Initialization vector for AES

    // create data2 by encrypt payload
    const cipher = createCipheriv('aes-256-cbc', aesKey, iv);
    let encryptedPayload = cipher.update(
      JSON.stringify(payload),
      'utf8',
      'base64',
    );
    encryptedPayload += cipher.final('base64');
    const data2 = encryptedPayload;

    // create data1
    const encryptedKey = privateEncrypt(
      this.privateKey,
      Buffer.concat([aesKey, iv]),
    );

    const data1 = encryptedKey.toString('base64');

    return {
      successful: true,
      error_code: 201,
      data: { data1, data2 },
    };
  }

  getDecryptData(body: GetDecryptDataDto): ResponseDto {
    const { data1, data2 } = body;

    const decryptedKeyIv = publicDecrypt(
      this.publicKey,
      Buffer.from(data1, 'base64'),
    );

    const aesKey = decryptedKeyIv.slice(0, 32);
    const iv = decryptedKeyIv.slice(32);

    const decipher = createDecipheriv('aes-256-cbc', aesKey, iv);
    let decrypted = decipher.update(data2, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    const payload = JSON.parse(decrypted) as string;

    if (payload) {
      return {
        successful: true,
        error_code: 201,
        data: { payload: payload },
      };
    }

    return { successful: false, error_code: 404, data: null };
  }
}
