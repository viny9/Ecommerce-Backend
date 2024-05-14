import {
  Address,
  Card,
  Cart,
  CartItem,
  Category,
  List,
  ListItem,
  Order,
  OrderItem,
  PrismaClient,
  Product,
  Promotion,
  PromotionProduct,
} from '@prisma/client';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();
prisma.$connect();

const deleteAllDatas = async () => {
  await prisma.address.deleteMany();
  await prisma.promotionProduct.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.listItem.deleteMany();
  await prisma.list.deleteMany();
  await prisma.card.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
};

deleteAllDatas();

const users = async () => {
  return [
    {
      id: randomUUID(),
      name: 'teste',
      email: 'teste@gmail.com',
      phone: '22222222222',
      password: await hash('123456', 10),
      isAdmin: false,
      stripeId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },

    {
      id: randomUUID(),
      name: 'Vinícius',
      email: 'viniolicar2004@gmail.com',
      phone: '11111111111',
      password: await hash('123456', 10),
      isAdmin: true,
      stripeId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },

    {
      id: randomUUID(),
      name: 'teste2',
      email: 'teste42@gmail.com',
      phone: '33333333333',
      password: await hash('123456', 10),
      isAdmin: false,
      stripeId: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const categorys = async (): Promise<Category[]> => {
  return [
    {
      id: randomUUID(),
      name: 'Eletronicos',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      name: 'Comidas',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      name: 'Bebidas',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const products = async (): Promise<Product[]> => {
  return [
    {
      id: randomUUID(),
      name: 'Mouse',
      price: 123.21,
      categoryId: await categorys[0]?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      name: 'Henekein',
      price: 7.99,
      categoryId: await categorys[2]?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      name: 'Pringles',
      price: 12.0,
      categoryId: await categorys[1]?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      name: 'Teclado Mecanico',
      price: 150.0,
      categoryId: await categorys[0]?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const usersList = async (): Promise<List[]> => {
  return [
    {
      id: randomUUID(),
      userId: await users[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      userId: await users[1].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      userId: await users[2].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const user3ListItems = async (): Promise<ListItem[]> => {
  return [
    {
      listId: await usersList[2].id,
      productId: await products[1].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      listId: await usersList[2].id,
      productId: await products[2].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const usersCart = async (): Promise<Cart[]> => {
  return [
    {
      id: randomUUID(),
      userId: await users[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      userId: await users[1].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      userId: await users[2].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const user1CartItems = async (): Promise<CartItem[]> => {
  return [
    {
      cartId: await usersCart[0].id,
      productId: await products[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      cartId: await usersCart[0].id,
      productId: await products[3].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const addresses = async (): Promise<Address[]> => {
  return [
    {
      id: randomUUID(),
      cep: '11111111',
      city: 'teste',
      state: 'te',
      number: 1,
      neighborhood: 'dasdq',
      extra: '',
      userId: await users[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      orderId: null,
    },
    {
      id: randomUUID(),
      cep: '22222222',
      city: 'teste',
      state: 'te',
      number: 2,
      neighborhood: 'dasdq',
      extra: 'Teste de extra',
      userId: await users[1].id,
      orderId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      cep: '33333333',
      city: 'teste',
      state: 'te',
      number: 33,
      neighborhood: 'dasdq',
      extra: '',
      userId: await users[2].id,
      orderId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const cards = async (): Promise<Card[]> => {
  return [
    {
      id: randomUUID(),
      userId: await users[0].id,
      brand: 'visa',
      expMounth: 1,
      expYear: 30,
      lastFourNumber: 1111,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      userId: await users[1].id,
      brand: 'visa',
      expMounth: 2,
      expYear: 25,
      lastFourNumber: 2222,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      userId: await users[2].id,
      brand: 'Master Card',
      expMounth: 5,
      expYear: 30,
      lastFourNumber: 3333,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const orders = async (): Promise<Order[]> => {
  return [
    {
      id: randomUUID(),
      shippingCost: 3.0,
      amountTotal: 200.99,
      paymentMethod: 'CARD',
      installments: 2,
      paymentStatus: 'PAYD',
      userId: await users[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: randomUUID(),
      shippingCost: 3.0,
      amountTotal: 1000.99,
      paymentMethod: 'BOLETO',
      installments: null,
      paymentStatus: 'UNPAYD',
      userId: await users[2].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const user1OrderItems = async (): Promise<OrderItem[]> => {
  return [
    {
      orderId: await orders[0].id,
      productId: await products[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      orderId: await orders[0].id,
      productId: await products[3].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      orderId: await orders[1].id,
      productId: await products[2].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const promotions = async (): Promise<Promotion[]> => {
  return [
    {
      id: randomUUID(),
      name: '3 por 10',
      description: 'Na compra de 3 itens sai apenas 10 reais',
      startAt: new Date(),
      endAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const promotionItems = async (): Promise<PromotionProduct[]> => {
  return [
    {
      productId: await products[0].id,
      percentage: 50,
      promotionId: await promotions[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];
};

const main = async (): Promise<void> => {
  await prisma.user.createMany({
    data: await users(),
  });

  await prisma.category.createMany({
    data: await categorys(),
  });

  await prisma.product.createMany({
    data: await products(),
  });

  await prisma.list.createMany({
    data: await usersList(),
  });

  await prisma.listItem.createMany({
    data: await user3ListItems(),
  });

  await prisma.cart.createMany({
    data: await usersCart(),
  });

  await prisma.cartItem.createMany({
    data: await user1CartItems(),
  });

  await prisma.address.createMany({
    data: await addresses(),
  });

  await prisma.card.createMany({
    data: await cards(),
  });

  await prisma.order.createMany({
    data: await orders(),
  });

  await prisma.orderItem.createMany({
    data: await user1OrderItems(),
  });

  await prisma.promotion.createMany({
    data: await promotions(),
  });

  await prisma.promotionProduct.createMany({
    data: await promotionItems(),
  });
};

main()
  .catch((e) => console.log(e))
  .finally(async () => await prisma.$disconnect());
