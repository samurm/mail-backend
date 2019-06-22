# Mail API

Mail backend with NestJS that uses mailgun and is ready to use other APIs.

## Description

This project is a mail backend using the mailgun API.
It is made so that you can add different mail APIs thanks to the adapter design pattern.
Next I will put how to install it and what are its routes with the format and type of data that has to be sent to the backend and what it returns to you.

## Prerequisites

You need to have npm

[npm](https://www.npmjs.com/get-npm)

You need to have a mailgun account

[mailgun](https://www.mailgun.com/)

## Installation

Create file .env with mailgun keys

```bash
PORT=3000
KEY=your-key
PUB_KEY=you-pub-key
DOMAIN=your-domain
```

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Routes

### List `/list`

- Post `/read`

    - body = { "listName": "your-list-name" }

    - response = { "list": {
        "access_level": "",
        "address": "",
        "created_at": "",
        "description": "",
        "members_count": 0,
        "name": ""
        }
    }

- Post `/member/create`

    name, subscribed and vars are optionals

    - body = {
        "listName": "your-list-name",
        "member": {
            "name": "Bob",
            "subscribed": true,
            "address": "bob@example.com",
            "vars": {
                "example": 0
            }
        }
    }

    - response = {
        "member": {
            "address": "bob@example.com",
            "name": "Bob",
            "subscribed": true,
            "vars": {
                "example": 0
            }
        },
        "message": "Mailing list member has been created"
    }

- Post `/members/create`

    name, subscribed and vars are optionals

    - body = {
        "listName": "your-list-name",
        "members": [
            {
                "name": "Bob",
                "address": "bob@example.com",
                "vars": {
                    "example": 0
                }
            },
            {
                "name": "Bob2",
                "address": "bob2@example.com",
                "vars": {
                    "age": 1
                }
            }
        ],
        "subscribed": true
    }

    - response = { "list": {
            "access_level": "readonly",
            "address": "your-list-name",
            "created_at": "",
            "description": "",
            "members_count": 2,
            "name": ""
        },
        "message": "Mailing list has been updated",
        "task-id": ""
    }

- Post `/members`

    - body = { "listName": "your-list-name" }

    - response = { "items": [
            {
                "address": "bob@gmail.com",
                "name": "Bob",
                "subscribed": true,
                "vars": {
                    "example": 0
                }
            },
            {
                "address": "bob2@example.com",
                "name": "Bob2",
                "subscribed": true,
                "vars": {
                    "age": 1
                }
            }],
        "total_count": 9
    }

- Put `/members`

    updateMember can contain name, address, subscribed or vars

    - body = {
        "listName": "your-list-name",
        "member": "bob@example.com",
        "updateMember": {
            "address": "bob@gmail.com"
        }
    }

    - response = {
        "member": {
            "address": "bob@gmail.com",
            "name": "Bob",
            "subscribed": true,
            "vars": {
                "age": 22
            }
        },
        "message": "Mailing list member has been updated"
    }

- Delete `/member`

    - body = {
        "listName": "your-list-name",
        "member": "bob@example.com"
    }

    - response = {
        "member": {
            "address": "bob@example.com"
        },
        "message": "Mailing list member has been deleted"
    }

### Mail `/mail`

- Post `/send/individual`
    
    You can send plane text, html or a name of a template of your API.

    Then you can send variables in your html with 'recipient-variables' or 
    send variables in your template with 'h:X-Mailgun-Variables'.

    text, html, template, 'recipient-variables', 'h:X-Mailgun-Variables', attachment are optionals.

    Example 1

    - body = {
        "from": "me@samples.mailgun.org",
        "to": "bob@gmail.com",
        "subject": "hi",
        "text": "This is a message"
    }

    Example 2

    - body = {
        "from": "me@samples.mailgun.org",
        "to": "bob@gmail.com",
        "subject": "hi",
        "recipient-variables": {
            "bob@gmail.com" : {"id": "ABC123456789"}
        },
        "html": "<b>%recipient.id%</b>",
        "attachment": "name-file"
    }

    Example 3

    - body = {
        "from": "me@samples.mailgun.org",
        "to": "bob@gmail.com",
        "subject": "hi",
        "h:X-Mailgun-Variables": '{"body": "This is a message"}',
        "template": "name-template",
        "attachment": "name-file"
    }

    - response = {
        "id": "",
        "message": "Queued. Thank you."
    }

- Post `/send/multiple`

    You have the same format as /send/individual, and u can add bcc or cc as array.

    Example 1

    - body = {
        "from": "me@samples.mailgun.org",
        "to": "bob@gmail.com",
        "cc": ["bob@gmail.com", "bob2@gmail.com"],
        "subject": "hi",
        "recipient-variables": {
            "bob@gmail.com" : {"id": "ABC123456789"},
            "bob2@gmail.com" : {"id": "987654321CBA"}
        },
        "html": "<b>%recipient.id%</b>",
        "attachment": "name-file"
    }

    Example 2

    - body = {
        "from": "me@samples.mailgun.org",
        "to": "bob@gmail.com",
        "bcc": ["bob@gmail.com", "bob2@gmail.com"],
        "subject": "hi",
        "recipient-variables": {
            "bob@gmail.com" : {"id": "ABC123456789"},
            "bob2@gmail.com" : {"id": "987654321CBA"}
        },
        "html": "<b>%recipient.id%</b>",
        "attachment": "name-file"
    }


    - response = {
        "id": "",
        "message": "Queued. Thank you."
    }

- Post `/send/validate`

    - body = {
        "mail": "bob@gmail.com"
    }

    - response = {
        "address": "bob@gmail.com",
        "did_you_mean": null,
        "is_disposable_address": false,
        "is_role_address": false,
        "is_valid": true,
        "mailbox_verification": "true",
        "parts": {
            "display_name": null,
            "domain": "gmail.com",
            "local_part": "bob"
        },
        "reason": null
    }

### Upload Files `/`

- Post `/upload`

    - body = {
        "file" : file
    }

    - response = {
        "success": true
    }

## Built With

* [NestJS](https://nestjs.com/) - The web framework used.
* [Mailgun](https://www.mailgun.com/) - API Mail.
