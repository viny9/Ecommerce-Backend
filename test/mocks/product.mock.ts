import { GetProductDto } from 'src/modules/product/dto/get-product.dto';
import { CreateProductDto } from './../../src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { ProductEntity } from 'src/modules/product/entitys/product.entity';

const createFullProductEntity = (product: ProductEntity): ProductEntity => {
  return {
    ...product,
    id: '456',
    imgs: [],
    category: {
      id: product.categoryId,
      name: 'testeCategoria',
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    },
    promotionProduct: null,
    createdAt: new Date(),
    updatedAt: undefined,
    deletedAt: undefined,
  };
};

const createProducts = (): ProductEntity[] => {
  return [
    {
      id: '456',
      name: 'teste1',
      price: 1,
      categoryId: '2',
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    },
    {
      id: '789',
      name: 'teste2',
      price: 2,
      categoryId: '3',
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    },
  ];
};

const createProductsDto = (): GetProductDto[] => {
  return [
    {
      id: '456',
      name: 'teste1',
      price: 1,
      imgs: null,
      category: null,
      promotionalValue: null,
    },
    {
      id: '789',
      name: 'teste2',
      price: 2,
      imgs: null,
      category: null,
      promotionalValue: null,
    },
  ];
};

const createProductDto = (): CreateProductDto => {
  return {
    name: 'teste4',
    price: 1,
    categoryId: '2',
  };
};

const createUpdateProductDto = (): UpdateProductDto => {
  return {
    name: 'teste99',
    price: 99,
  };
};

export const productMock = {
  createProducts,
  createProductDto,
  createProductsDto,
  createUpdateProductDto,
  createFullProductEntity,
};
