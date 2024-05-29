import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/database.module';
import { ProductRepository } from 'src/database/repositorys/product.repository';
import { ImgService } from 'src/modules/img/img.service';
import { ProductEntity } from 'src/modules/product/entitys/product.entity';
import { ProductService } from 'src/modules/product/product.service';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';
import { productMock } from 'test/mocks/product.mock';

describe('Product service', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;

  const productsMock = productMock.createProducts();
  const createProductDtoMock = productMock.createProductDto();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [ProductService, ImgService],
    }).compile();

    productService = moduleRef.get<ProductService>(ProductService);
    productRepository = moduleRef.get<ProductRepository>(ProductRepository);
  });

  describe('newProduct', () => {
    beforeEach(() => {
      jest.spyOn(productRepository, 'checkIfExists').mockResolvedValue(false);
      jest
        .spyOn(productRepository, 'save')
        .mockImplementation(async (newProduct: ProductEntity) => {
          const createdProduct =
            productMock.createFullProductEntity(newProduct);

          productsMock.push(createdProduct);

          return createdProduct;
        });
    });

    afterAll(() => {
      productsMock.pop();
    });

    it('Should create and return a product on Dto format', async () => {
      const product = await productService.newProduct(createProductDtoMock);
      const newProductInListDto = ProductEntity.toDto(
        productsMock[productsMock.length - 1],
      );

      expect(product).toEqual(newProductInListDto);
    });

    it('Should return an AlredyExistsException if checkIfExists return true ', async () => {
      jest.spyOn(productRepository, 'checkIfExists').mockResolvedValue(true);

      const productError = productService.newProduct(createProductDtoMock);
      expect(productError).rejects.toThrow('Product alredy exists');
      expect(productError).rejects.toBeInstanceOf(AlredyExistsException);
    });
  });

  describe('findAllProducts', () => {
    beforeEach(() => {
      jest.spyOn(productRepository, 'findAll').mockResolvedValue(productsMock);
    });

    it('Should return all products in Dto format', async () => {
      const products = await productService.findAllProducts();

      expect(products).toEqual(productMock.createProductsDto());
    });

    it('Should pass a wrong id and return an NotFoundException', async () => {
      const userError = productService.findProductById('3');

      expect(userError).rejects.toThrow('Unable to find product with this id');
      expect(userError).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('findProductById', () => {
    beforeEach(() => {
      jest
        .spyOn(productRepository, 'findById')
        .mockImplementation(async (id: string) =>
          productsMock.find((product) => product.id === id),
        );
    });

    it('Should return product in Dto format by id', async () => {
      const product = await productService.findProductById('456');

      expect(product).toEqual(ProductEntity.toDto(productsMock[0]));
    });

    it('Should pass a wrong id and return an NotFoundException', async () => {
      const userError = productService.findProductById('3');

      expect(userError).rejects.toThrow('Unable to find product with this id');
      expect(userError).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
