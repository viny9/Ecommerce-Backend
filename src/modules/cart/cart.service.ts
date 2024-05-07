import { Injectable } from '@nestjs/common';
import { CartRepository } from 'src/database/repositorys/cart.repository';
import { GetCartDto } from './dto/get-cart.dto';
import { Carts } from './entitys/cart.entity';
import { Products } from 'src/modules/product/entitys/product.entity';

@Injectable()
export class CartService {
  constructor(private repository: CartRepository) {}

  async findOne(id: string): Promise<GetCartDto> {
    const cart: Carts = await this.repository.findCartByUserId(id);
    if (!cart) throw new Error('Nenhum usuário foi encontrado com esse nome');

    return Carts.toCartDto(cart);
  }

  async addItemInCart(id: string, productId: string) {
    const exists = await this.repository.findCartProductById(id, productId);
    if (exists) throw new Error('Produto já está no carrinho');

    const cart = await this.repository.addCartItem(id, productId);
    return Products.toProductDto(cart.product);
  }

  async removeItemFromCart(id: string, productId: string) {
    const exists = await this.repository.findCartProductById(id, productId);
    if (!exists)
      throw new Error('Nenhum produto com esse id foi encontrado no carrinho');

    const cart = await this.repository.removeCartItem(id, productId);
    return Products.toProductDto(cart.product);
  }
}
