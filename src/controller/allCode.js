import allCode_services from '../services/allCode_services'





//getAllcode 

const  getAllCode = async (req , res)=>{
 try{
   let data = await allCode_services.getAllCode(req.query.type);
 
   return res.status(200).json(data);
 }catch(e){
    console.log(e);
    return res.status(200).json({
        errCode: -1,
        errMessage:'error from sever'
    })
 }
}


module.exports = {
    getAllCode:getAllCode,
}