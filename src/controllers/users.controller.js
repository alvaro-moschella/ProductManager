import { userService } from "../service/index.js"

class UserController {
    constructor(){
        this.userService = userService
    }

    getUsers = async (req, res) =>{    
        try {  
            const { limit=5, page=1 }= req.query            
            const result = await this.userService.getUsers(parseInt(limit), parseInt(page))   
            res.status(200).send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            res.status(500).json('Error al traer los usuarios')
        }
    }
    getUser = async (req, res) => {
        try {
            const {uid} = req.params
            const result = await this.userService.getUserBy({_id: uid})
            res.status(200).send({
                status: 'success',
                payload: result
            })            
        } catch (error) {
            res.status(500).json('Error al traer el usuario')
        }
    }

    createUser = async (req, res) => {
        const { first_name, last_name, email, password } = req.body
        if(!email) return res.send({status: 'error', error: 'faltan campos'})
        const newUser = {
            first_name,
            last_name,
            email,
            password
        }
        
    
        try {
            const result = await this.userService.createUser(newUser)
            res.status(201).send({ status: 'success', payload: result })
        } catch (error) {
            res.status(500).json('Error al crear el usuario')
        }
    }

    updateUser = async (req, res) => {
        const { uid } = req.params
        const { first_name, last_name, email} = req.body
        
        if(!first_name,!last_name, !email) return res.send({status: 'error', error: 'faltan campos'})
            
        try {
          const result = await this.userService.updateUser(uid, req.body)
            res.send({status: 'success', payload: result})
        } catch (error) {
            res.status(500).json('Error al actualizar el usuario')
        }
    }

    deleteUser = async (req, res) => {
        const { uid } = req.params
        try {
            const result = await this.userService.deleteUser(uid)
            res.status(204).send({status: 'success', payload: result})
        } catch (error) {
            res.status(500).json('Error al eliminar el usuario')
        }
    }
}