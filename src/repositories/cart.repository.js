import CartDTO from "../dto/cart.dto.js"

export default class CartRepository {
    constructor(cartDao){
        this.cartDao = cartDao
    }

    getCarts = async () =>  await this.cartDao.getCarts()
    getCartBy = async filter =>  await this.cartDao.getCartBy(filter)
    createCart = async (cart) => {
        const newCart = new CartDTO(cart)
        return await this.cartDao.createCart(newCart)
    }
    updateCart = async (cid, pid) => await this.cartDao.updateCart(cid, pid)
    addProduct = async (cid, pid) => await this.cartDao.addProduct(cid, pid)
    deleteProduct = async (cid, pid) => await this.cartDao.deleteProduct(cid, pid)
    deleteCart = async cid => await this.cartDao.deleteCart(cid)
}