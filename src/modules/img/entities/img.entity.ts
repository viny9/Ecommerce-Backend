import { ProductImg } from '@prisma/client';
import { ImgDto } from '../dto/img.dto';
import { randomUUID } from 'crypto';

export class ImgEntity implements ProductImg {
  id: string;
  imgUrl: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(
    img: Express.Multer.File,
    productId: string,
  ): ImgEntity {
    return Object.assign(new ImgEntity(), {
      id: randomUUID(),
      imgUrl: `${process.env.IMG_BASE_URL}/${img.filename}`,
      productId,
    });
  }

  public static toEntityArray(
    img: Express.Multer.File[],
    productId: string,
  ): ImgEntity[] {
    return img.map((img) => {
      return Object.assign(new ImgEntity(), {
        id: randomUUID(),
        imgUrl: `${process.env.IMG_BASE_URL}/${img.filename}`,
        productId,
      });
    });
  }

  public static toDto(img: ProductImg): ImgDto {
    return {
      id: img.id,
      url: img.imgUrl,
    };
  }

  public static toDtoArray(img: ProductImg[]): ImgDto[] {
    return img.map((img) => {
      return {
        id: img.id,
        url: img.imgUrl,
      };
    });
  }
}
