import StudenModel from "../models/StudentModel.js";
import { StatusCodes } from "http-status-codes";

export async function postStudent(req, res) {
  try {
    const student = StudenModel(req.body);
    const saveStudent = await student.save();
    res
      .status(StatusCodes.CREATED)
      .json({
        data: saveStudent,
        success: true,
        message: "student created successfully",
      });
  } catch (error) {
    console.log("error in create student", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error in create user", success: false });
  }
}

export async function fetchStudent(req, res) {
  try {
    // console.log(req.query)
    const page = parseInt(req.query.page) || 1; // Get the requested page number
    const limit = parseInt(req.query.limit) || 3; // Set the number of items per page
    const skip = (page - 1) * limit; // Calculate the number of items to skip
    const totalItems = await StudenModel.countDocuments();

    // console.log(totalItems)
    const student = await StudenModel.find().limit(limit).skip(skip);
    res
      .status(StatusCodes.OK)
      .json({
        data: student,
        totalItems,
        page,
        limit,
        success: true,
        message: "student fatch successful",
      });
  } catch (error) {
    console.log("error in fetching student", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error in fetching student", success: false });
  }
}
