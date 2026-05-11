import { IsString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

// ==============================
// Estrutura do webhook Meta/WhatsApp
// Ref: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples
// ==============================

export class WhatsappTextDTO {
  @IsString()
  body: string;
}

export class WhatsappMessageDTO {
  @IsString()
  id: string;

  @IsString()
  from: string; // número do remetente (E.164 sem +)

  @IsString()
  timestamp: string;

  @IsString()
  type: string; // 'text', 'image', 'audio', etc.

  @IsOptional()
  @ValidateNested()
  @Type(() => WhatsappTextDTO)
  text?: WhatsappTextDTO;
}

export class WhatsappContactDTO {
  @IsString()
  wa_id: string;
}

export class WhatsappValueDTO {
  @IsString()
  messaging_product: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhatsappMessageDTO)
  messages?: WhatsappMessageDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhatsappContactDTO)
  contacts?: WhatsappContactDTO[];
}

export class WhatsappChangeDTO {
  @ValidateNested()
  @Type(() => WhatsappValueDTO)
  value: WhatsappValueDTO;

  @IsString()
  field: string;
}

export class WhatsappEntryDTO {
  @IsString()
  id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhatsappChangeDTO)
  changes: WhatsappChangeDTO[];
}

export class WhatsappWebhookDTO {
  @IsString()
  object: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhatsappEntryDTO)
  entry: WhatsappEntryDTO[];
}
