import express from 'express'
import { fetchStudent, postStudent } from '../controllers/StudentController.js'

const StudentRouter = express.Router()

StudentRouter.post("/post-student",postStudent)
StudentRouter.get('/get-student',fetchStudent)

export default StudentRouter