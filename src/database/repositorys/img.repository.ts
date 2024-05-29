import { Injectable } from '@nestjs/common';
import Repository from './abstract.repository';
import { ProductImg } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ImgRepository extends Repository<ProductImg> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'product');
  }

  async findProductImgById(id: string, productId: string) {
    return await this.prisma.productImg.findUnique({
      where: {
        id,
        productId,
      },
    });
  }

  async findAllProductImgs(productId: string) {
    return await this.prisma.productImg.findMany({
      where: {
        productId,
      },
    });
  }

  async addProductImgs(imgs: ProductImg[]) {
    return await this.prisma.productImg.createMany({
      data: imgs,
    });
  }

  async deleteImgsFromProduct(imgs: string[]) {
    imgs.forEach(async (img) => {
      await this.prisma.productImg.delete({
        where: { id: img },
      });
    });
  }

  async deleteAllImgsFromProduct(productId: string) {
    return await this.prisma.productImg.deleteMany({
      where: { productId },
    });
  }
}
