import { Product } from '@models/Product'
import database, { IDatabase } from 'src/databse/database'
import logger from 'src/logger'
export class ProductsService {

  private productsWithDiscounts: Product[]
  constructor() {
    this.productsWithDiscounts = []
  }

  getDatabase(): IDatabase {
    return database.data
  }
  getProduct(productId: string): Product {
    return database.getProduct(productId)
  }
  getProducts(): Product[] {
    logger.info('getting products from the database')
    return database.getProducts()
  }
  setProduct(productId: string, product: Product): Product {
    logger.info('updating product on the database')
    const updatedProduct = database.setProduct(productId, product)
    logger.info('setting product on the cache')
    this.setProductWithDiscountInCache(updatedProduct)
    return updatedProduct
  }

  getProductsWithDiscounts(): Product[] {
    if (!this.isCacheEmpty())
      return this.getProductsInCache()
    return this.getProducts()
  }

  setProductWithDiscountInCache(product: Product): void {
    const cacheProductIndex = this.getProductInCacheIndex(product.getId())
    if (cacheProductIndex > 0)
      this.setProductInCacheIndex(cacheProductIndex, product)
    else
      this.productsWithDiscounts.push(product)
  }

  getProductInCacheIndex(productId: string): number {
    return this.productsWithDiscounts.findIndex(prodWithDiscount => prodWithDiscount.getId() === productId)
  }
  setProductInCacheIndex(productCacheIndex: number, product: Product): void {
    this.productsWithDiscounts[productCacheIndex] = product
  }

  isCacheEmpty(): boolean {
    const isCacheEmpty = !this.productsWithDiscounts.length
    if (isCacheEmpty)
      logger.info('cache empty')
    else
      logger.info('cache NOT empty')

    return isCacheEmpty
  }

  getProductsInCache(): Product[] {
    logger.info('getting products from cache')
    return this.productsWithDiscounts
  }
}