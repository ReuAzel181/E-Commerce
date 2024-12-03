import { Module } from '@nestjs/common';
import * as express from 'express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersService } from './users/users.service';
import { MiddlewareBuilder } from '@nestjs/core';

@Module({
  controllers: [AppController],
  providers: [UsersService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..',  'public'),
      serveRoot: '/', 
    }),
    CartModule,
    ProductsModule,
    AuthModule,
  ],
})
export class AppModule {}
