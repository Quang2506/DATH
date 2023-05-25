import express from 'express'

import {
  handleLogin,
  handleGetUser,
  handleCreateUser,
  handleDeleteUser,
  handleEditUser,
} from '../controller/userControllor'
import doctor from '../controller/doctor'

import allCode from '../controller/allCode'
const router = express.Router()

const initWebRoutes = (app) => {

  //Api 
  router.post('/api/login', handleLogin)

  //user Api
  router.get('/api/user-login', handleGetUser)
  router.post('/api/create-user', handleCreateUser)
  router.delete('/api/delete-user', handleDeleteUser)
  router.put('/api/edit-user', handleEditUser)
  //ALL CODE
  router.get('/allcode', allCode.getAllCode)
  //Doctor
  router.get('/api/get-doctor-home', doctor.getTopDoctorHome)
  router.get('/api/get-all-doctor',doctor.getAllDoctor)
  router.post('/api/save-inf-doctor',doctor.postInfDoctor)
  router.get('/api/get-doctor-detail-by-id',doctor.getDoctorDetailById)
  router.put('/api/edit-markdown',doctor.updateDetailDoctorCtrl)
  router.post('/api/creat-schedule',doctor.creatScheduleDoctor)

  return app.use("/", router)
}
module.exports = initWebRoutes