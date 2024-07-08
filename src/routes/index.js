import { Router } from 'express'
import productsRouter from './api/products.router.js'
import cartsRouter from './api/carts.router.js'
import viewsRouter from './views.router.js'
import { sessionsRouter } from './api/sessions.router.js'

import UserRepository from '../repositories/user.repository.js'
import { UsersDaoMongo } from '../dao/usersDao.mongo.js'
UsersDaoMongo

export const userService = new UserRepository(new UsersDaoMongo)
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