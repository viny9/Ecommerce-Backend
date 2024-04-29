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
  User,
} from '@prisma/client';
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

// Terminar integração
const users: User[] = [
  {
    id: randomUUID(),
    name: 'teste',
    email: 'teste@gmail.com',
    phone: '22222222222',
    password: '123456',
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
    password: '123456',
    isAdmin: true,
    stripeId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },

  {
    id: randomUUID(),
    name: 'teste2',
    email: 'teste2@gmail.com',
    phone: '33333333333',
    password: '123456',
    isAdmin: false,
    stripeId: '3',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

const categorys: Category[] = [
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

const products: Product[] = [
  {
    id: randomUUID(),
    name: 'Mouse',
    price: 123.21,
    categoryId: categorys[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    id: randomUUID(),
    name: 'Henekein',
    price: 7.99,
    categoryId: categorys[2].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    id: randomUUID(),
    name: 'Pringles',
    price: 12.0,
    categoryId: categorys[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    id: randomUUID(),
    name: 'Teclado Mecanico',
    price: 150.0,
    categoryId: categorys[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

const usersList: List[] = [
  {
    id: randomUUID(),
    userId: users[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    id: randomUUID(),
    userId: users[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    id: randomUUID(),
    userId: users[2].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

const user3ListItems: ListItem[] = [
  {
    listId: usersList[2].id,
    productId: products[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    listId: usersList[2].id,
    productId: products[2].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

const usersCart: Cart[] = [
  {
    id: randomUUID(),
    userId: users[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    id: randomUUID(),
    userId: users[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    id: randomUUID(),
    userId: users[2].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

const user1CartItems: CartItem[] = [
  {
    cartId: usersCart[0].id,
    productId: products[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    cartId: usersCart[0].id,
    productId: products[3].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

const addresses: Address[] = [
  {
    id: randomUUID(),
    cep: '11111111',
    city: 'teste',
    state: 'te',
    number: 1,
    neighborhood: 'dasdq',
    extra: '',
    userId: users[0].id,
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
    userId: users[1].id,
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
    userId: users[2].id,
    orderId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

const cards: Card[] = [
  {
    id: randomUUID(),
    userId: users[0].id,
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
    userId: users[1].id,
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
    userId: users[2].id,
    brand: 'Master Card',
    expMounth: 5,
    expYear: 30,
    lastFourNumber: 3333,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

const orders: Order[] = [
  {
    id: randomUUID(),
    shippingCost: 3.0,
    amountTotal: 200.99,
    paymentMethod: 'CARD',
    installments: 2,
    paymentStatus: 'PAYD',
    userId: users[0].id,
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
    userId: users[2].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

const user1OrderItems: OrderItem[] = [
  {
    orderId: orders[0].id,
    productId: products[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    orderId: orders[0].id,
    productId: products[3].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    orderId: orders[1].id,
    productId: products[2].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

const promotions: Promotion[] = [
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

const promotionItems: PromotionProduct[] = [
  {
    productId: products[0].id,
    percentage: 50,
    promotionId: promotions[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

const main = async (): Promise<void> => {
  await prisma.user.createMany({
    data: users,
  });

  await prisma.category.createMany({
    data: categorys,
  });

  await prisma.product.createMany({
    data: products,
  });

  await prisma.list.createMany({
    data: usersList,
  });

  await prisma.listItem.createMany({
    data: user3ListItems,
  });

  await prisma.cart.createMany({
    data: usersCart,
  });

  await prisma.cartItem.createMany({
    data: user1CartItems,
  });

  await prisma.address.createMany({
    data: addresses,
  });

  await prisma.card.createMany({
    data: cards,
  });

  await prisma.order.createMany({
    data: orders,
  });

  await prisma.orderItem.createMany({
    data: user1OrderItems,
  });

  await prisma.promotion.createMany({
    data: promotions,
  });

  await prisma.promotionProduct.createMany({
    data: promotionItems,
  });
};

main()
  .catch((e) => console.log(e))
  .finally(async () => await prisma.$disconnect());
