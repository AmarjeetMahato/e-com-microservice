
import { IProductInterface } from "@/common/product/interface/product.interface";
import { IProductItemInterface } from "@/common/product/interface/productItem.interface";
import { ProductRepository } from "@/common/product/repository/product.repository";
import { ProductItemRepository } from "@/common/product/repository/productItem.repository";
import { ProductItemServiceImpl } from "@/common/product/services/productItemServiceImpl";
import { ProductServiceImpl } from "@/common/product/services/productServiceImpl";
import { db } from "@/config/db";
import { container } from "tsyringe";

container.register("Db", { useValue: db});


container.register<IProductInterface>("IProductInterface", {useClass: ProductRepository,});
container.register<ProductServiceImpl>(ProductServiceImpl, { useClass: ProductServiceImpl });

container.register<IProductItemInterface>("IProductItemInterface",{useClass:ProductItemRepository});
container.register<ProductItemServiceImpl>("ProductItemServiceImpl", { useClass: ProductItemServiceImpl});