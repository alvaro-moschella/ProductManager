import { Router } from 'express'
import productsRouter from './api/products.router.js'
import cartsRouter from './api/carts.router.js'
import viewsRouter from './views.router.js'
import { sessionsRouter } from './api/sessions.router.js'

const router = Router()

router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/sessions', sessionsRouter)

router.use('/', viewsRouter);

router.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})

export default router