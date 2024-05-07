import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma.service';

interface RepositoryInteface<T> {
  save(data: Partial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
}

export default abstract class Repository<T, U = any>
  implements RepositoryInteface<T>
{
  constructor(
    protected readonly prisma: PrismaService,
    private readonly tableName: string,
    private readonly includes?: U,
  ) {}

  async checkIfExists(field: string, data: any): Promise<boolean> {
    const check = await this.prisma[this.tableName].findUnique({
      where: { [field]: data },
    });

    if (check) return true;

    return false;
  }

  async save(data: Partial<T>): Promise<T> {
    return this.prisma[this.tableName].create({
      data: {
        id: randomUUID(),
        ...data,
      },
      include: this.includes,
    });
  }

  async findAll(): Promise<T[]> {
    return await this.prisma[this.tableName].findMany({
      include: this.includes,
    });
  }

  async findById(id: string): Promise<T> {
    return await this.prisma[this.tableName].findUnique({
      where: { id },
      include: this.includes,
    });
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return await this.prisma[this.tableName].update({
      where: { id },
      data: data,
      include: this.includes,
    });
  }

  async delete(id: string): Promise<T> {
    return await this.prisma[this.tableName].delete({
      where: { id },
      include: this.includes,
    });
  }
}
