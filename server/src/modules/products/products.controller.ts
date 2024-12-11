import { Controller, Get, Param } from '@nestjs/common';

import products, {Product} from '../../products'; 

@Controller('products')
export class ProductsController {
  constructor() {}

  @Get()
  async index(): Promise<Product[]> {
    return products;
  }
//To get particular Id of product
  @Get(':id')
  async show(@Param('id') id: string): Promise<Product> {
    return products.find((product) => product.id === parseInt(id));
  }
}

