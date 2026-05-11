import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  @HttpCode(HttpStatus.OK)
  check(): { status: string; service: string; timestamp: string } {
    return {
      status: "ok",
      service: "vitalium-whatsapp",
      timestamp: new Date().toISOString(),
    };
  }
}
