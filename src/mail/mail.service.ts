import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor() {}
    hola() {
        console.log('hola');
    }
}
