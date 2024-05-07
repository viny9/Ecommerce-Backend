import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from 'src/database/repositorys/order.repository';
import { Orders } from './entitys/order.entity';
import { GetOrderDto } from './dto/get-order.dto';
import { GetProductDto } from 'src/modules/product/dto/get-product.dto';
import { GetCategoryDto } from 'src/modules/category/dto/get-category.dto';
import { ImgDto } from 'src/modules/product/dto/img.dto';
import { CategoryEntity } from '../category/entitys/category.entity';
import { Product, Category } from '@prisma/client';

@Injectable()
// Create later the methos of admin update the status
export class OrderService {
  constructor(private repository: OrderRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = Orders.toEntity(createOrderDto);
    const res = await this.repository.save(order);

    const products = res.products.map((element) => {
      const product = element.product;
      const categoryDto = CategoryEntity.toDto(product.category);

      const imgsDto = product.imgs.map((img) => {
        return new ImgDto(img.id, img.imgUrl);
      });

      return new GetProductDto(
        product.id,
        product.name,
        product.price,
        imgsDto,
        categoryDto,
      );
    });

    return new GetOrderDto(
      order.id,
      order.amountTotal,
      order.paymentMethod,
      order.paymentStatus,
      order.shippingCost,
      products,
      order.installments,
    );
  }

  async findAll() {
    const res = await this.repository.findAll();

    return res.map((order) => {
      const products = order.products.map((element) => {
        const product = element.product;
        const categoryDto = CategoryEntity.toDto(product.category);

        const imgsDto = product.imgs.map((img) => {
          return new ImgDto(img.id, img.imgUrl);
        });

        return new GetProductDto(
          product.id,
          product.name,
          product.price,
          imgsDto,
          categoryDto,
        );
      });

      return new GetOrderDto(
        order.id,
        order.amountTotal,
        order.paymentMethod,
        order.paymentStatus,
        order.shippingCost,
        products,
        order.installments,
      );
    });
  }

  async findAllUserOrders(id: string) {
    const res = await this.repository.findAllByUserId(id);

    return res.map((order) => {
      const products = order.products.map((element) => {
        const product = element.product;
        const categoryDto = CategoryEntity.toDto(product.category);

        const imgsDto = product.imgs.map((img) => {
          return new ImgDto(img.id, img.imgUrl);
        });

        return new GetProductDto(
          product.id,
          product.name,
          product.price,
          imgsDto,
          categoryDto,
        );
      });

      return new GetOrderDto(
        order.id,
        order.amountTotal,
        order.paymentMethod,
        order.paymentStatus,
        order.shippingCost,
        products,
        order.installments,
      );
    });
  }

  async findOne(id: string) {
    const order = await this.repository.findById(id);

    const products = order.products.map((element) => {
      const product = element.product;
      const categoryDto = CategoryEntity.toDto(product.category);
      const imgsDto = product.imgs.map((img) => {
        return new ImgDto(img.id, img.imgUrl);
      });

      return new GetProductDto(
        product.id,
        product.name,
        product.price,
        imgsDto,
        categoryDto,
      );
    });

    return new GetOrderDto(
      order.id,
      order.amountTotal,
      order.paymentMethod,
      order.paymentStatus,
      order.shippingCost,
      products,
      order.installments,
    );
  }

  async updatePaymentStatus(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.repository.updatePaymentStatus(
      id,
      updateOrderDto.paymentStatus,
    );

    const products = order.products.map((element) => {
      const product = element.product;
      const categoryDto = CategoryEntity.toDto(product.category);

      const imgsDto = product.imgs.map((img) => {
        return new ImgDto(img.id, img.imgUrl);
      });

      return new GetProductDto(
        product.id,
        product.name,
        product.price,
        imgsDto,
        categoryDto,
      );
    });

    return new GetOrderDto(
      order.id,
      order.amountTotal,
      order.paymentMethod,
      order.paymentStatus,
      order.shippingCost,
      products,
      order.installments,
    );
  }
}
