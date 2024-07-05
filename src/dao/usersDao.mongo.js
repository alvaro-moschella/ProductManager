import { userModel } from "../models/users.models.js"

export class UsersDaoMongo {
    constructor() {
      this.userModel = userModel
    }

    async getUsers({limit = 10, numPage=1}) {
        const users =  await this.userModel.paginate({}, {limit, page: numPage, sort: {price: -1}, lean: true })
        return users
    }
  
    async createUser(newUser) {
        return await this.userModel.create(newUser)
    }
  s
    async getUserBy(filter) {
      return this.userModel.findOne( filter );
    }
  
    async getUserByEmail(email) {
      return this.users.find((user) => user.email === email);
    }  

    async updateUser(uid, userToUpdate) {
      return this.userModel.findByIdAndUpdate({_id: uid}, userToUpdate)
    }
    
    async deleteUser(uid){        
      return await this.userModel.deleteOne({_id: uid})        
  }
  }

