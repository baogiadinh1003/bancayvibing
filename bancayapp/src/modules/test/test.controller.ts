import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { HealthDto } from './dto/health.dto';

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('healthz')
  health(): HealthDto {
    return { message: this.testService.health() };
  }
}
