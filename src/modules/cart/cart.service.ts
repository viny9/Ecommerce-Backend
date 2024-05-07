import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from 'src/database/repositorys/cart.repository';
import { GetCartDto } from './dto/get-cart.dto';
import { CartEntity } from './entitys/cart.entity';
import { productEntity } from 'src/modules/product/entitys/product.entity';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';

@Injectable()
export class CartService {
  constructor(private repository: CartRepository) {}

  async findUserCart(id: string): Promise<GetCartDto> {
    const cart: CartEntity = await this.repository.findCartByUserId(id);
    if (!cart)
      throw new NotFoundException(
        'Nenhum usuário foi encontrado com esse nome',
      );

    return CartEntity.toDto(cart);
  }

  async addItemInCart(id: string, productId: string) {
    const exists = await this.repository.findCartProductById(id, productId);
    if (exists) throw new AlredyExistsException('Produto já está no carrinho');

    const cart = await this.repository.addCartItem(id, productId);
    return productEntity.toDto(cart.product);
  }

  async removeItemFromCart(id: string, productId: string) {
    const exists = await this.repository.findCartProductById(id, productId);
    if (!exists)
      throw new NotFoundException(
        'Nenhum produto com esse id foi encontrado no carrinho',
      );

    const cart = await this.repository.removeCartItem(id, productId);
    return productEntity.toDto(cart.product);
  }
}
