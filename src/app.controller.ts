import { Controller, Post, UseInterceptors, FileInterceptor, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: __dirname +  '/data',
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }))
  uploadFile(@Res() res): void {
      res.status(200).send({ success : true});
  }
}
