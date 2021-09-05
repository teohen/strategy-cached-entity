import { ProductsController } from '@controllers/ProductsController'
import Router, { IRouter, Request, Response } from 'express'
import logger from 'src/logger'


const routes: IRouter = Router()

const productsController = new ProductsController()

routes.get('/products', (req: Request, res: Response) => {
  logger.info('getting all products')

  try {
    const products = productsController.getProducts()

    return res.json(products)
  } catch (err) {
    logger.error(`Error trying to get products with discounts. Error: ${err.message}`)
    return res.sendStatus(500)
  }
})

routes.get('/products/discounts', (req: Request, res: Response) => {
  logger.info('getting products with discounts')
  try {
    const products = productsController.getProductsWithDiscount()
    return res.json(products)
  } catch (err) {
    logger.error(`Error trying to get products with discounts. Error: ${err.message}`)
    return res.sendStatus(500);
  }
})

routes.post('/products/:id/discount', (req: Request, res: Response) => {
  logger.info('setting a discount for a product')
  const productId = req.params.id

  const discount = req.body.discount

  try {
    const productWithDiscount = productsController.setDiscountForProduct(productId, discount)
    return res.status(200).json(productWithDiscount)
  } catch (err) {
    logger.error(`Error trying to get products with discounts. Error: ${err.message}`)
    return res.sendStatus(500)
  }
});


export default routes
