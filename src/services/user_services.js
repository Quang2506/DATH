import db from '../models/index'
import bcrypt from 'bcryptjs'
var salt = bcrypt.genSaltSync(10);

const handleUserLogin = (email,password) =>{
     return new Promise(async(resolve,reject)=>{
        try{
            const userData = {};
   
            const isExit  = await checkUserLogin(email)
            if(isExit){
                const user = await db.User.findOne({
                    where:{email:email},
                    raw:true
                })
                if(user){
                    const cheackPass =await true //bcrypt.compare(password,user.password)
                    if(cheackPass){
                        userData.errCode=0
                        userData.errMessage='ok'
                        userData.user=user
                    }else{
                        userData.errCode=3
                        userData.errMessage='not found passWord'
                    }

                }else{
                    userData.errCode= 2
                    userData.errMessage='not found user'
                }
              
            }else{
                userData.errCode  = 1 ;
                userData.errMessage = `your email isn't exist in your system .`
                
               
            }
            resolve(userData)
        }catch(e){
            reject(e)
        }
     })
}

const checkUserLogin = (emailUser) =>{
    return new Promise( async (resolve,reject)=>{
        try{
            const user =await db.User.findOne({
                where:{email:emailUser}
            })
            if(user){
                resolve(true)
            }
            else{
                resolve(false)
            }

        }catch(e){
            reject(e)
        }
    }

    )

}

const getAllUser=  (idUser) => {
    
    return new Promise(async (resolve,reject)=>{
        try{
          
            if(idUser==='ALL'){
               const user = await db.User.findAll({
                    attributes:{
                        exclude:['password']
                    }
                })
                resolve(user)
            }
            if(idUser && idUser!=='ALL'){

               const user = await db.User.findOne({
                    where:{id:idUser},
                    attributes:{
                        exclude:['password']
                    }
                })
                resolve(user)
            }
            
          
        }catch(e){
            reject(e)
        }
    })
}
const createUser = (data) =>{
    return new Promise (async(resolve,reject)=>{
        try{
            
            const check = await checkUserLogin(data.email)
            if(check){
                resolve({
                    errCode:1,
                    message:'your email is already in user'
                })
            }else{
                const hashUserPassWorkFromBcrypt = await hashUserPassWork(data.password)
            await db.User.create({
                email: data.email,
                password: hashUserPassWorkFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                
            })
            resolve({
                errCode:0,
                message:'ok'
            
            })
            }
            

            
        }catch(e){
            reject(e)
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
const deleteUser = (idUser)=>{
   
    return new Promise(async (resolve,reject)=>{
        try{
            const user =await db.User.findOne({
                where:{id:idUser}
            })

            if(!user){
                resolve({
                    errCode:2,
                    message:'user not found'
                })
    
            }
           
                await db.User.destroy({
                    where:{id:idUser}
                });
                resolve({
                    errCode:0,
                    message:`the user is deleted`
                })
          
           
        }catch(e){
            reject(e)
        }
    })
}
const updateUser =(data)=>{
    return new Promise( async(resolve,reject)=>{
        try{
            if(!data.id){
                resolve({
                    errCode:2,
                    message:'missing required parameters'
                })
            }
            const updateId =await db.User.findOne({
                where:{id:data.id},
                raw:false
            })
            if(updateId){
                updateId.firstName = data.firstName
             updateId.lastName = data.lastName
             updateId.address= data.address
             updateId.phonenumber=data.phonenumber
             updateId.gender = data.gender
             await updateId.save()
            
            //  await db.User.save({
            //     firstName : data.firstName,
            //     lastName : data.lastName,
            //     address: data.address,
            //     phonenumber:data.phonenumber,
            //     gender : data.gender,
               
            //  })
             
             resolve({
                 errCode:0,
                 message:'Update the User succeeds'
             })
            }else{
                resolve({
                    errCode:1,
                    errMessage:'User not found'
                })
            }
        }catch(e){
            reject(e)
        }
    })
}
module.exports ={
    handleUserLogin:handleUserLogin,
    getAllUser:getAllUser,
    createUser:createUser,
    deleteUser:deleteUser,
    updateUser:updateUser
}