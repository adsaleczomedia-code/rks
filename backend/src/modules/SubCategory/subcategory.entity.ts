import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany
} from 'typeorm';

import type { Category } from '../Category/category.entity.js';
import type { Product } from '../Product/product.entity.js';

@Entity('subcategories')
export class SubCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne('Category', (category: Category) => category.subcategories)
    category: Category;

    @OneToMany('Product', 'subcategory')
    products: Product[];
}