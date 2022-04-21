
import db from '../models/index'


const getHomePage =async (req, res)=>{
   
    try{
        const data = await db.User.findAll()
        console.log(data)
        return res.render('homePage.ejs',{data:JSON.stringify(data)})
    }catch(e){
        console.log(e)
    }
   
}
const postCrud = (req,res)=>{
    console.log(req.body)
    return res.send('post crud form')
}
module.exports= {
    getHomePage:getHomePage,
    postCrud :postCrud 
}
