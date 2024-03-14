import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma.service';

interface RepositoryInteface<T> {
  save(data: Partial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
}

export default abstract class Repository<T> implements RepositoryInteface<T> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly tableName: string,
  ) {}

  async save(data: Partial<T>): Promise<T> {
    return await this.prisma[this.tableName].create({
      data: {
        id: randomUUID(),
        ...data,
      },
    });
  }

  async findAll(): Promise<T[]> {
    return await this.prisma[this.tableName].findMany();
  }

  async findById(id: string): Promise<T> {
    return await this.prisma[this.tableName].findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return await this.prisma[this.tableName].update({
      where: { id },
      data: data,
    });
  }

  async delete(id: string): Promise<T> {
    return await this.prisma[this.tableName].delete({
      where: { id },
    });
  }
}
