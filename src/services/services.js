import bcrypt from 'bcryptjs'
import db from '../models/index';


var salt = bcrypt.genSaltSync(10);
const createNewUser = async(data) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWordFromBcrypt = await hashUserPassWork(data.password)
            await db.User.create({
                email: data.email,
                password: hashPassWordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('create new user succeed');

        } catch (e) {
            reject(e);
        }
    })
    
   
}

const hashUserPassWork =(password) => {
    return new Promise(async (resolve, reject)=>{
     
       try{
        const hashPasswork = await bcrypt.hashSync(password,salt)
        resolve(hashPasswork)
       }catch(e){
        reject(e)
       }
    })
}

// const getAllUser = ()=>{
//     return new Promise( async (resolve,reject)=>{
//      try {
//         const users = await  db.User().findAll()
//         resolve(users)
//      }catch(e){
//          reject(e)
//      }
//     })
// }

module.exports= {

    createNewUse:createNewUser,
    // getAllUser:getAllUser
    
}