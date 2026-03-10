import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TestService {
  private readonly logger = new Logger(TestService.name);

  health(): string {
    this.logger.log('Server is running');
    return 'Server is running';
  }
}
