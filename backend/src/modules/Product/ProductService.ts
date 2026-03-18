import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity.js';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async create(productData: Partial<Product>): Promise<Product> {
        const product = this.productRepository.create(productData);
        return this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find({ relations: ['subcategory', 'subcategory.category'] });
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id }, relations: ['subcategory', 'category'] });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async update(id: number, updateData: Partial<Product>): Promise<Product> {
        const product = await this.findOne(id);
        Object.assign(product, updateData);
        return this.productRepository.save(product);
    }

    async delete(id: number): Promise<void> {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }
}