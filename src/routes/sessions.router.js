import {Router} from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import passport from 'passport'

export const sessionsRouter = Router()

sessionsRouter.get('/github', passport.authenticate('github', {scope: 'user:email'}), async (req, res)=>{})

sessionsRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    req.session.user = {
        email: req.user.email,
        first_name: req.user.first_name ?? null,
        last_name: null,
        admin: req.user.role === 'admin',
        first_time: true
    }
    res.redirect('/products')
})

 sessionsRouter.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), async (req, res) => {
     res.render('userRegistered')
 })
 sessionsRouter.post('/failregister', async (req, res) => {
     console.log('falló la estrategia')
     res.send({error: 'failed'})
 })

  sessionsRouter.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}),async (req, res) => {
     if(!req.user) return res.status(400).send({status: 'error', error: 'credenciales invalidas'})
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name ?? null,
            last_name: req.user.last_name ?? null,
            admin: req.user.role === 'admin',
            first_time: true
        }
        res.redirect('/products')
 })

 sessionsRouter.post('/faillogin', (req, res) => {
     res.send({error: 'falló el login'})
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



