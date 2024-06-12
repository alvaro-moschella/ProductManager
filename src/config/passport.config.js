import passport from "passport"
import local from "passport-local"
import { UsersManagerMongo } from "../dao/usersManagerMongo.js"
import CartManagerMongo from "../dao/cartsManagerMongo.js"
import { createHash, isValidPassword } from '../utils.js'
import GithubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy
const userService = new UsersManagerMongo()
const cartService = new CartManagerMongo()

export const initPassport = () => {
    passport.use('github', new GithubStrategy({
        clientID:'Iv23liELtWQXbHlrVr9F',
        clientSecret:'6cc4ce61f84d10e4029166bf90e1b689ab10416c',
        callbackURL:'http://localhost:8080/api/sessions/githubcallback'

    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userService.getUserBy({email: profile._json.email})
            if (!user) {
                let newCart = await cartService.createCart()
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    email: profile._json.email,
                    password: '',
                    cartID: newCart._id
                }
                let result = await userService.createUser(newUser)
                done(null, result)
            } else {
                done(null, user)
            }

        } catch (error) {
            return done(error)
        }
    }))


    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done)=>{
        try {
            const user = await userService.getUserBy({_id: id})
            done(null, user)
        } catch (error) {
            return done(error)
        }
    })

        passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req, username, password, done)=>{
        const {first_name, last_name} = req.body

        try {
            let userFound = await userService.getUserBy({email: username})
            if(userFound) {
                console.log('el usuario ya existe')
                return done(null, false)
            }
            let newCart = await cartService.createCart()
            let newUser = {
                first_name,
                last_name,
                email: username,
                password: createHash(password),
                cartID: newCart._id
            }
            let result = await userService.createUser(newUser)
            return done(null, result)
        } catch (error) {
            return done('error al registrar el usuario '+error)
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done)=>{
        try {
            const user = await userService.getUserBy({email: username})
            if (!user) {
                console.log('usuario no encontrado')
                return done(null, false)
            }
            if (!isValidPassword(password, {password: user.password})) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
}