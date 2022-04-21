import express from 'express'
import {getHomePage} from '../controller/homeController'
const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/',getHomePage)
    return app.use("/",router)
}
module.exports = initWebRoutes