import express from 'express'
import {CRUDuser,postCrud ,getHomePage,displayUser,editCrud,putCrud,deleteCrud} from '../controller/homeController'
const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/',getHomePage)
    router.get('/cruduser',CRUDuser)
    router.post('/post-crud',postCrud )
    router.get('/get-user',displayUser)
    router.get('/edit-crud',editCrud)
    router.post('/put-crud',putCrud)
    router.get('/delete-crud',deleteCrud)
      

    return app.use("/",router)
}
module.exports = initWebRoutes