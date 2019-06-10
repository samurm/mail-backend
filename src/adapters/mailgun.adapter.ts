import { Injectable, Controller, Body, Res, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import * as mailgun from 'mailgun-js';

@Injectable()
export class MailGunAdapter {
    private mg;

    constructor() {
        this.mg = mailgun({ apiKey: process.env.KEY, domain: process.env.DOMAIN });
    }

    list(listName) {
        return this.mg.lists(listName);
    }

    listInfo(listName) {
        return this.list(listName).info();
    }

    createMember(listName, member) {
        return this.list(listName).members().create(member);
    }
}
