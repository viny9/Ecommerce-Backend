import { ProductImg } from '@prisma/client';
import { ImgDto } from '../dto/img.dto';

export class ImgEntity implements ProductImg {
  id: string;
  imgUrl: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(img: ImgDto, productId: string): ImgEntity {
    return Object.assign(new ImgEntity(), {
      ...img,
      productId,
    });
  }

  public static toEntityArray(img: ImgDto[], productId: string): ImgEntity[] {
    return img.map((img) => {
      return Object.assign(new ImgEntity(), {
        id: img.id,
        imgUrl: img.url,
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
