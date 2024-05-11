import { Prisma, Product, ProductImg } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import Repository from './abstract.repository';
import { ImgEntity } from 'src/modules/product/entitys/Img.entity';

@Injectable()
export class ProductRepository extends Repository<
  Product,
  Prisma.ProductInclude
> {
  constructor(protected prisma: PrismaService) {
    const includes: Prisma.ProductInclude = {
      imgs: true,
      category: true,
      promotionProduct: true,
    };

    super(prisma, 'product', includes);
  }

  async findProductImgById(id: string, productId: string) {
    return await this.prisma.productImg.findUnique({
      where: {
        id,
        productId,
      },
    });
  }

  async findProductImgByUrl(url: string, productId: string) {
    return await this.prisma.productImg.findUnique({
      where: {
        imgUrl: url,
        productId,
      },
    });
  }

  async addProductImgs(imgs: ProductImg[]) {
    return await this.prisma.productImg.createMany({
      data: imgs,
    });
  }

  async deleteImgsFromProduct(imgs: ImgEntity[]) {
    imgs.forEach(async (imgs) => {
      await this.prisma.productImg.delete({
        where: { id: imgs.id },
      });
    });
  }

  async deleteAllImgsFromProduct(productId: string) {
    return await this.prisma.productImg.deleteMany({
      where: { productId },
    });
  }
}
