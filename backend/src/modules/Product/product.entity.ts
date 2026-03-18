import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from 'typeorm';

import { SubCategory } from '../SubCategory/subcategory.entity.js';

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne('SubCategory', (subcategory: SubCategory) => subcategory.products)
    subcategory: SubCategory;
}