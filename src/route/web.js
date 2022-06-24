import express from 'express'
import {
    CRUDuser,
    postCrud,
    getHomePage,
    displayUser,
    editCrud,putCrud,
    deleteCrud} from '../controller/homeController'
import { 
    handleLogin,
    handleGetUser,
    handleCreateUser,
    handleDeleteUser,
    handleEditUser,
    getAllCode
    
} from '../controller/userLogin'
const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/',getHomePage)
    router.get('/cruduser',CRUDuser)
    router.post('/post-crud',postCrud )
    router.get('/get-user',displayUser)
    router.get('/edit-crud',editCrud)
    router.post('/put-crud',putCrud)
    router.get('/delete-crud',deleteCrud)
      
    router.post('/api/login',handleLogin)
    router.get('/api/user-login',handleGetUser)
    router.post('/api/create-user',handleCreateUser)
    router.delete('/api/delete-user',handleDeleteUser)
    router.put('/api/edit-user',handleEditUser)

    //Allcode
    router.get('/allcode',getAllCode)
    return app.use("/",router)
}
module.exports = initWebRoutes