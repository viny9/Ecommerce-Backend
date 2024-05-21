import { Injectable } from '@nestjs/common';

@Injectable()
export class ImgService {
  create() {
    return 'This action adds a new img';
  }

  findAll() {
    return `This action returns all img`;
  }

  findOne(id: number) {
    return `This action returns a #${id} img`;
  }

  update(id: number) {
    return `This action updates a #${id} img`;
  }

  remove(id: number) {
    return `This action removes a #${id} img`;
  }
}
