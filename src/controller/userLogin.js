import user_services from '../services/user_services'
import db from '../models/index'

const handleLogin=async (req,res)=>{
    const email = req.body.email
    const passwork = req.body.passwork

    if(!email || !passwork ){
        return res.status(500).json({
            errcode:1,
            message: 'missing inputs parameter'
        })
    }
    const dataUser =await user_services.handleUserLogin(email,passwork)
    return res.status(200).json({
        errcode:dataUser.errcode,
        message:dataUser.errMessage,
        user:dataUser.user?dataUser.user:{}
    })
}


const handleGetUser = async (req,res)=>{
    const id = req.query.id
    if(!id) {
        return res.status(200).json({
            errcode:1,
            errMessage:'missing required parametters',
            user:[]
        })
    } 
    const user = await user_services.getAllUser(id)
    return res.status(200).json({
        errcode:0,
        message:'ok',
        user
    })
    
}
const handleCreateUser =async (req,res) =>{
    const data = await user_services.createUser(req.body)
    return res.status(200).json(data)

}
const handleDeleteUser = async (req,res)=>{
  if(!req.body.id){
      return res.status(200).json({
          errcode:1,
          message:"missing required parameters"
      })
  }else{
    const data = await user_services.deleteUser(req.body.id)
    return res.status(200).json({
        data
    })
  }
  
}
const handleEditUser = async (req,res)=>{
    const data = await user_services.updateUser(req.body)
    return  res.status(200).json({data})
    
}
const getAllCode =async (req,res)=>{
    try{
        const data = await db.CodeAll.findAll()
        
        console.log(data)
    }catch(e){
        console.log('e',e)
       return res.status(200).json({
        errcode:-1,
        errMessage:'Error from  Server'
       })

    }
}
module.exports={
    getAllCode:getAllCode,
    handleLogin:handleLogin,
    handleGetUser:handleGetUser,
    handleCreateUser:handleCreateUser,
    handleDeleteUser:handleDeleteUser,
    handleEditUser:handleEditUser,
    getAllCode,getAllCode
    
}