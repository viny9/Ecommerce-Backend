import { Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from 'src/database/repositorys/cart.repository';
import { GetCartDto } from './dto/get-cart.dto';
import { GetProductDto } from 'src/product/dto/get-product.dto';
import { ImgDto } from 'src/product/dto/img.dto';
import { GetCategoryDto } from 'src/category/dto/get-category.dto';

@Injectable()
export class CartService {
  constructor(private repository: CartRepository) {}

  async findOne(id: string) {
    const cart = await this.repository.findCartByUserId(id);

    const products = cart.products.map((product) => {
      const { id, name, price, imgs, category } = product.product;
      const imgsDtoClass = ImgDto.prototype;
      const imgsDto = imgsDtoClass.imgsDtoGenerate(imgs);

      const categoryDto = new GetCategoryDto(category.id, category.name);

      return new GetProductDto(id, name, price, imgsDto, categoryDto);
    });

    return new GetCartDto(cart.id, cart.userId, products);
  }

  async addItemInCart(id: string, updateCartDto: UpdateCartDto) {
    const cartItem = await this.repository.addCartItem(id, updateCartDto);

    const products = cartItem.products.map((product) => {
      const { id, name, price, imgs, category } = product.product;
      const imgsDtoClass = ImgDto.prototype;
      const imgsDto = imgsDtoClass.imgsDtoGenerate(imgs);

      const categoryDto = new GetCategoryDto(category.id, category.name);

      return new GetProductDto(id, name, price, imgsDto, categoryDto);
    });

    return new GetCartDto(cartItem.id, cartItem.userId, products);
  }

  async removeItemFromCart(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.repository.removeCartItem(id, updateCartDto);

    const products = cart.products.map((product) => {
      const { id, name, price, imgs, category } = product.product;
      const imgsDtoClass = ImgDto.prototype;
      const imgsDto = imgsDtoClass.imgsDtoGenerate(imgs);

      const categoryDto = new GetCategoryDto(category.id, category.name);

      return new GetProductDto(id, name, price, imgsDto, categoryDto);
    });

    return new GetCartDto(cart.id, cart.userId, products);
  }
}
