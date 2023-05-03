import db from "../models/index";


const getAllCode = (typeinput)=>{

return new  Promise(async(resolve,rejcet)=>{


    try{
        if(!typeinput){
            resolve({
                errCode:1,
                errMessage:'Missing!'
            })
        }else{
            let res={}
        let allCode = await db.AllCode.findAll({
            where:{type:typeinput}
        });
        res.errCode = 0;
        res.data = allCode;
    resolve(res)

        }
        
    }catch(e){
        rejcet(e)
    }
})
}
module.exports = {
    getAllCode:getAllCode
}