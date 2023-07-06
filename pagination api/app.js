import 'dotenv/config'
import express from 'express'
import cors from "cors"
import connectDb from './src/db/DbConfig.js'
import StudentRouter from './src/routers/StudentRouter.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api',StudentRouter)

app.listen(process.env.PORT,()=>{
    connectDb()
    console.log(`server is listning on port ${process.env.PORT}`)
}) 