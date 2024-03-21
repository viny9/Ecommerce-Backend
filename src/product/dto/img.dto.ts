import { ProductImg } from '@prisma/client';

export class ImgDto {
  constructor(
    readonly id?: string,
    readonly url?: string,
  ) {}

  imgsDtoGenerate(imgs: ProductImg[]) {
    return imgs.map((img) => {
      return new ImgDto(img.id, img.imgUrl);
    });
  }
}
