import { Product } from '@models/Product';

export type IDatabase = {
  products: Product[]
}
const data: IDatabase = {
  products: [
    new Product('9e0dea19-7914-49ee-ab90-8d25bf11fe5c', 'produto 1', 10),
    new Product('41369a91-8c03-4634-8e34-68b949a69e7b', 'produto 2', 10)
  ]
};

const getProduct = (productId: string): Product => {
  const productIndex = data.products.findIndex(product => product.getId() === productId)
  if (productIndex < 0)
    throw new Error('Product Not Found')

  return data.products[productIndex]
}

const getProducts = (): Product[] => {
  return data.products
}

const setProduct = (productId: string, product: Product): Product => {
  const productIndex = data.products.findIndex(prd => prd.getId() === productId)
  if (productIndex < 0)
    throw new Error('Product Not Found')

  data.products[productIndex] = product
  return product
}





export default { data, getProduct, setProduct, getProducts }