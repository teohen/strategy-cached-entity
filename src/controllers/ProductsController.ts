import { Product } from '@models/Product'
import { ProductsService } from 'src/services/ProductsService'

export class ProductsController {

  private productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  getProducts(): Array<Product> {
    const products = this.productsService.getDatabase().products
    return products
  }

  getProductsWithDiscount(): Array<Product> {
    return this.productsService.getProductsWithDiscounts()
  }

  setDiscountForProduct(productId: string, discount: number): Product {
    const existentProduct = this.productsService.getProduct(productId)
    const productWithDiscount = this.buildProductWithDiscount(existentProduct, discount)
    return this.productsService.setProduct(productId, productWithDiscount)
  }

  buildProductWithDiscount(product: Product, discount: number): Product {
    const productWithDiscount = new Product(product.getId(), product.getName(), product.getValue())
    productWithDiscount.calculateDiscountedPrice(discount)
    return productWithDiscount
  }
}
