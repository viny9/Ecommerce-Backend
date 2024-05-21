import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ImgService } from './img.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadImg() {
    return this.imgService.create();
  }

  @Get()
  findAll() {
    return this.imgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.imgService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imgService.remove(+id);
  }
}
