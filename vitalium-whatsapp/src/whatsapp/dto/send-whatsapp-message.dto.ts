import { IsString } from "class-validator";

export class SendWhatsappMessageDTO {
  @IsString()
  to: string; // número E.164 sem + (ex: 5511999999999)

  @IsString()
  message: string;
}
