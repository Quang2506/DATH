import express from 'express'
import {getHomePage,postCrud } from '../controller/homeController'
const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/',getHomePage)
    router.post('/post-crud',postCrud )

    return app.use("/",router)
}
module.exports = initWebRoutes