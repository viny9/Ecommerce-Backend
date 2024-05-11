import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from 'src/database/repositorys/cart.repository';
import { GetCartDto } from './dto/get-cart.dto';
import { CartEntity } from './entitys/cart.entity';
import { ProductEntity } from 'src/modules/product/entitys/product.entity';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';

@Injectable()
export class CartService {
  constructor(private repository: CartRepository) {}

  async findUserCart(id: string): Promise<GetCartDto> {
    const cart: CartEntity = await this.repository.findCartByUserId(id);
    if (!cart) throw new NotFoundException('Unable to find user with this id');

    return CartEntity.toDto(cart);
  }

  async addItemInCart(id: string, productId: string) {
    const exists = await this.repository.findCartProductById(id, productId);
    if (exists) throw new AlredyExistsException('Product alredy in cart');

    const cart = await this.repository.addCartItem(id, productId);
    return ProductEntity.toDto(cart.product);
  }

  async removeItemFromCart(id: string, productId: string) {
    const exists = await this.repository.findCartProductById(id, productId);
    if (!exists)
      throw new NotFoundException('Unable to find a cart product with this id');

    const cart = await this.repository.removeCartItem(id, productId);
    return ProductEntity.toDto(cart.product);
  }
}
