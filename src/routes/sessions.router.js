import {Router} from 'express'
import { UsersManagerMongo } from '../dao/usersManagerMongo.js'
import { auth } from '../middlewares/auth.middleware.js'
import { createHash } from '../utils.js'
import { isValidPassword } from '../utils.js'

export const sessionsRouter = Router()

const userService = new UsersManagerMongo()
sessionsRouter.post('/register', async (req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body

        if(!email || !password) return res.status(401).send({status: 'error', error: 'se deben completar todos los datos'})

        const userExists = await userService.getUserBy({email})
        if (userExists) return res.status(401).send({status: 'error', error: 'el usuario ya existe'})

            const newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password)
            }

        const result = await userService.createUser(newUser)
        console.log(result)

        res.send('usuario registrado')
    } catch (error) {
        console.log(error)
    }
    
})

sessionsRouter.post('/login', async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) return res.status(401).send({status: 'error', error: 'se deben completar todos los datos'})

    const userFound = await userService.getUserBy({email})

    if(!userFound) return res.status(400).send({status: 'error', error: 'usuario no encontrado'})

    if(!isValidPassword(password, {password: userFound.password})) return res.status(401).send({status: 'error', error: 'Password incorrecto'})

    req.session.user = {
        email,
        first_name: userFound.first_name ?? null,
        last_name: userFound.last_name ?? null,
        admin: userFound.role === 'admin',
        first_time: true
    }
    res.redirect('/products')
})

sessionsRouter.get('/current', auth, (req, res) => {
    res.send('datos sensibles')
})


sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy( err => {
        if(err) return res.send({status: 'error', error: err})
        else return res.redirect('/')
    })
})



