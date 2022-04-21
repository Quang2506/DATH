import express from 'express'


const configViewEngine = (app) =>{
    app.use(express.static("./src/public"))//cline chỉ đc truy cập vào public
    app.set("view engine ,ejs")
    app.set("views","./src/views")

}

module.exports= configViewEngine;