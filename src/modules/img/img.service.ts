import { Injectable } from '@nestjs/common';
import { ImgRepository } from 'src/database/repositorys/img.repository';
import { ImgEntity } from './entities/Img.entity';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';

@Injectable()
export class ImgService {
  constructor(private repository: ImgRepository) {}

  async addImgsToProduct(productId: string, newImgs: Express.Multer.File[]) {
    const imgs = ImgEntity.toEntityArray(newImgs, productId);
    await this.repository.addProductImgs(imgs);

    return 'Images added with sucess';
  }

  async updateProductImgs(
    productId: string,
    newImgs: Express.Multer.File[],
    removedImgs: string[],
  ) {
    if (newImgs) await this.addImgsToProduct(productId, newImgs);
    if (removedImgs) await this.removeProductImgs(productId, removedImgs);

    return 'Product images updated with sucess';
  }

  async removeProductImgs(productId: string, removedImgs?: string[]) {
    await Promise.all(
      removedImgs.map(async (imgId) => {
        const imgExists = await this.repository.findProductImgById(
          imgId,
          productId,
        );

        if (!imgExists)
          throw new AlredyExistsException(
            'Unable to find img with this id to remove',
          );
      }),
    );

    await this.repository.deleteImgsFromProduct(removedImgs);

    return 'Images removed with sucess';
  }

  async removeAllImgsFromProduct(productId: string) {
    await this.repository.deleteAllImgsFromProduct(productId);
  }
}
