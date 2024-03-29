const _=require('lodash')
import db from "../models/index"
require('dotenv').config()
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE




const getTopDoctorHomeSv = (limitInput) =>{
    return new Promise(async (resolve,reject)=>{
        try{
            let  users = await db.User.findAll({
                limit:limitInput,
                where:{roleId:'R2'},
                order:[['createdAt','DESC']],
               // raw:true
            })
            resolve({
                errorCode:0,
                data:users
            })
        }catch(e){
            reject(e)
        }
    })
}
const getAllDoctorServices = ()=>{
    return new Promise (async(resolve,reject)=>{
        try{
            let resDoctor = await db.User.findAll({
              where:{roleId:"R2"},
              attributes: { exclude: ['image'] }
            })
           if(resDoctor){
            let resData = {}
            resData.errorCode=0,
            resData.data=resDoctor
              resolve(resData)
              
           }
          

        }catch(e){
            reject(e)
        }
    })
}
const postInfDoctorServices = (data)=>{
    return new Promise (async (resolve,reject)=>{
        try{
          
            if(data.contenHTML||data.contenTEXT){
              await db.Markdown.create({
                contentHTML:data.contenHTML,
                contenMarkDown:data.contenTEXT,
                doctorId:data.doctorId,
                description:data.decription

              })
              resolve({
                errorCode:0,
                message:"create success "
              })
            }else{
                resolve({
                    errorCode:1,
                    message:"missing data  "
                })
            }
        }catch(e){
            console.log(e)
            reject(e)
        }
    })
}
const getDetailDoctorByIdServices = (idInput) =>{
return new Promise (async(resolve,reject)=>{
    try{
        if(!idInput){
            resolve({
                errorCode:3,
                message:'missing id'
            })
        }
      
        const dataDoctor =await db.User.findOne({
            where:{id:idInput},
            attributes:{exclude:[ 'password']},
            include: [{
                model:db.Markdown ,
               
              },
              
            ]
              ,
              raw:true,
              nest:true
 
        })
       

        resolve(dataDoctor)
    }catch(e){
        console.log(e)
    }
})
}

 const updateInfDetailDoctorSv = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
           
            
                let dataMarkdown =await db.Markdown.findOne({
                    where:{doctorId:data.doctorId},
                    raw:false
                })
                console.log(dataMarkdown)
                if(!dataMarkdown){
                    resolve({
                        errorCode:1,
                        message:'missing  detail doctor'
                    })
                }else{
                  
                    dataMarkdown.contentHTML=data.contenHTML,
                    dataMarkdown.contenMarkDown=data.contenTEXT,
                    dataMarkdown.description =data.decription,
                    await dataMarkdown.save()
                   
                    resolve({
                        errorCode:0,
                        message:'update success'
                    })
                }
        }catch(e){

        }
    })
 }
 const creatScheduleDoctorServies = (reqData)=>{
    return new Promise (async (resolve,reject)=>{
        try{
            if(!reqData.arrResult){
                resolve({
                    errorCode:1,
                    message:'missing reqdata'
                })
            }else{
                let  dataSchedule;
                if(reqData.arrResult&& reqData.arrResult.length>0){
                   dataSchedule= reqData.arrResult.map(i=>{
                        i.maxNumber=MAX_NUMBER_SCHEDULE
                    
                        return i
                    })
                }
                
             
               //await db.Schedule.bulkCreate(dataSchedule)
               
             
               let  dataModels =await db.Schedule .findAll({
                    where:{doctorId:reqData.doctorId },
                    attributes:["timeType","doctorId",'date','maxNumber'],
                    raw:true
                   })
                   
                   const results = dataSchedule.filter(({ timeType: id1,date:date }) => !dataModels.some(({ timeType: id2,date:date2 }) => id2 === id1&&date===date2));
                   await db.Schedule.bulkCreate(results)
            }
        }catch{

        }

    })

 }
module.exports = {
    getTopDoctorHomeSv:getTopDoctorHomeSv,
    getAllDoctorServices:getAllDoctorServices,
    postInfDoctorServices:postInfDoctorServices,
    getDetailDoctorByIdServices:getDetailDoctorByIdServices,
    updateInfDetailDoctorSv:updateInfDetailDoctorSv,
    creatScheduleDoctorServies:creatScheduleDoctorServies
}