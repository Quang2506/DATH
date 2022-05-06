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
const getDataUser = ()=>{
    return new Promise (async (resolve,reject)=>{
        try{
            const dataUser =await db.User.findAll({
                raw:true
            })
            resolve(dataUser)

        }catch(e){
            reject(e)
        }

})
}
const editUserById = (idUser) =>{
    return new Promise (async (resolve, reject)=>{
        try{
        
            const dataUserId =await db.User.findOne({
                where:{id:idUser},
                raw:true
            })
            
         if(dataUserId){
            resolve(dataUserId)
         }else{
             resolve({})
         }
          
        }catch(e){
            reject(e)
        }
    })
}
const putCRUD = (dataPut) =>{
    return new Promise(async (resolve,reject)=>{
        try{
            const updateId =await db.User.findOne({
                where:{id:dataPut.id}
            })

            if(updateId){
             updateId.firstName = dataPut.firstName
             updateId.lastName = dataPut.lastName
             updateId.address= dataPut.address
             updateId.phonenumber=dataPut.phonenumber
             updateId.gender = dataPut.gender
             await updateId.save()
             const getUserAll = db.User.findAll({
                raw:true 
             })
             resolve(getUserAll)
            }else{
                resolve()
            }
        }catch(e){
            reject(e)
        }
    })
}

const deleteCRUD = (iddata)=>{
    return new Promise (async(resolve,reject)=>{
        try{

            const idDelete =await db.User.findOne({
                where:{id:iddata}
            })
            if(idDelete){
               await idDelete.destroy()
                resolve()
            }else{
                resolve({})
            }
        
        }catch(e){
            reject(e)
        }
    })
}

module.exports= {

    createNewUse:createNewUser,
    getDataUser:getDataUser,
    editUserById:editUserById,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD
   
    
}