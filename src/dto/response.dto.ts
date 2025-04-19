export type EncryptedResponse = {
  data1: string;
  data2: string;
};

export type DecryptedResponse = {
  payload: string;
};

export class ResponseDto {
  successful: boolean;
  error_code: number;
  data: EncryptedResponse | DecryptedResponse | null;
}
