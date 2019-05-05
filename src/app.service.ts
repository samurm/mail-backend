import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  private isAuthEnabled: boolean;
  constructor(config: ConfigService) {
    this.isAuthEnabled = config.get('IS_AUTH_ENABLED') === 'true' ? true : false;
  }
}
