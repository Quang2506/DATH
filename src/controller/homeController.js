
import db from '../models/index'
import { createNewUse,getAllUser } from '../services/services'

const getHomePage = (req,res)=>{
    return res.render('homePage.ejs')
}

const CRUDuser =async (req, res)=>{
   
    try{
        const data = await db.User.findAll()
        console.log(data)
        return res.render('F_User.ejs',{data:JSON.stringify(data)})
    }catch(e){
        console.log(e)
    }
   
}
const postCrud =async (req,res)=>{
    const messger = await createNewUse(req.body)
    console.log(messger)
    return res.send('post crud form server')
    
}

// const displayUser = async(req,res)=>{
//     const data =await getAllUser()
//     console.log('-------------------------------------');
//     console.log(data);
//     console.log('-------------------------------------');
//     return res.send('display')
// }

module.exports= {
    CRUDuser:CRUDuser,
    postCrud :postCrud ,
    getHomePage:getHomePage,
    // displayUser:displayUser
    

}
