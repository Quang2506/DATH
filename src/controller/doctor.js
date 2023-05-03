
import doctor from '../services/doctor_services'

const getTopDoctorHome = async (req, res) => {
    try {
        let limit = req.query.limit
        if (!limit) limit = 10
        let responsive = await doctor.getTopDoctorHomeSv(+limit)
        return res.status(200).json(responsive)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}
const getAllDoctor = async (req, res) => {
    try {
        let resData = await doctor.getAllDoctorServices()
        return res.status(200).json({
            resData
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from, server'
        })
    }
}
const postInfDoctor = async (req, res) => {
    try {
        let reqBody = req.body

        let responsive = await doctor.postInfDoctorServices(reqBody)
        return res.status(200).json( responsive )
    } catch (e) {
        return res.status(200).json({
            errorCode: -1,
            massage: 'error from server'
        })
    }

}
const getDoctorDetailById = async(req,res)=>{
    try{
        let idQueryReq = req.query.id
        if(!idQueryReq){
            return res.status(200).json({
                errorCode:-1,
                message:'missing id'
            })
        }
        let dataDoctor = await doctor.getDetailDoctorByIdServices(idQueryReq)
    
        return res.status(200).json({
            errorCode:0,
            data:dataDoctor
        })
    }catch(e){
     return res.status(200).json({
        errorCode:1,
        message:'missing req'
     })
    }
}

const updateDetailDoctorCtrl =async (req,res)=>{
    try{
        let reqData = req.body
        let resServices = await doctor.updateInfDetailDoctorSv(reqData)
        return res.status(200).json(resServices)
        

    }catch(e){
        return res.status(200).json({
            errorCode:-1,
            message:'error from server'
        })
    }
}
module.exports = {
    getAllDoctor: getAllDoctor,
    getTopDoctorHome: getTopDoctorHome,
    postInfDoctor: postInfDoctor,
    getDoctorDetailById :getDoctorDetailById ,
    updateDetailDoctorCtrl:updateDetailDoctorCtrl
}