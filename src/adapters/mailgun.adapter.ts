import { Injectable, Controller, Body, Res, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import * as mailgun from 'mailgun-js';

@Injectable()
export class MailGunAdapter {
    private mg;
    private mgPublic;

    constructor() {
        this.mg = mailgun({ apiKey: process.env.KEY, domain: process.env.DOMAIN });
        this.mgPublic = mailgun({apiKey: process.env.PUB_KEY, domain: process.env.DOMAIN});
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

    createMembers(listName, membersList, subscribedMembers) {
      return this.list(listName).members().add({members: membersList, subscribed: subscribedMembers});
    }

    listMembers(listName) {
        return this.list(listName).members().list();
    }

    updateMember(listName, member, updateMember) {
        return this.list(listName).members(member).update(updateMember);
    }

    deleteMember(listName, member) {
        return this.list(listName).members(member).delete();
    }

    sendMail(mail) {
        return this.mg.messages().send(mail);
    }

    validateMail(mail) {
        return this.mgPublic.validate(mail);
    }
}
