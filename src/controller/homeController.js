
import db from '../models/index'
import { createNewUse,getDataUser,editUserById , putCRUD,deleteCRUD} from '../services/services'

const getHomePage =async (req,res)=>{
   try{
    const data = await db.User.findAll()
    return res.render('homePage.ejs', {
        data:JSON.stringify(data)
    })
   }catch(e){

   }
}

const CRUDuser =async (req, res)=>{
   
    try{
        const data = await db.User.findAll()
       
        return res.render('F_User.ejs',{data:JSON.stringify(data)})
    }catch(e){
        console.log(e)
    }
   
}
const postCrud =async (req,res)=>{
    const messger = await createNewUse(req.body)
    return res.send('post crud form server')
    
}
const displayUser = async (req,res) =>{
  const data =  await  getDataUser()
  console.log('-----------------')
  console.log(data)
  console.log('------------------')
  return res.render('display_CRUD.ejs',{
      dataTable:data
  })
}
let editCrud = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await editUserById(userId);
        // check user data not found
        return res.render('edit_CRUD.ejs', {
            user: userData
        })

    } else {

        return res.send('User not found')
    }

}
const putCrud =async (req,res)=>{
    const  dataPut = req.body
    const dataUserAll= await putCRUD(dataPut)
    return res.render('display_CRUD.ejs',{
        dataTable:dataUserAll
    })
}
const deleteCrud = async (req,res)=>{
    const idDelete = await req.query.id
    if(idDelete){
        await deleteCRUD(idDelete)
        return res.send('delete done !')
    }else{
        return res.send('not fund data')
    }
    
}

module.exports= {
    CRUDuser:CRUDuser,
    postCrud :postCrud ,
    getHomePage:getHomePage,
    displayUser:displayUser,
    editCrud:editCrud,
    putCrud:putCrud,
    deleteCrud:deleteCrud
}
