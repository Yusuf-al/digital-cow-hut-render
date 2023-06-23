import { NextFunction, Request, Response } from "express";
import usersService from "./users.service";
import pick from "../../../shared/pick";
import catchAsync from "../../../shared/catchAsync";


const createUserController = catchAsync( async (req: Request, res: Response) => {
    
    const {user} = req.body
    const newUserResult = await usersService.createUser(user)

    res.status(200).json({
        success: true,
        message:"User created succussfully",
        data: newUserResult
    })
})

const getAllUserController = catchAsync(async (req: Request, res: Response)=>{
   
    const paginationOption = pick(req.query, ['page', 'limit','skip', 'sortBy', 'sortOrder'])
    const searchAndFilter = pick(req.query,['role','name','budget','phoneNumber','searchTerm'])
    
    const allUserResult = await usersService.getAllUser(searchAndFilter,paginationOption)
    res.status(200).json({
        success: true, 
        statusCode:200,
        message: "User retrieved successfully",
        meta:allUserResult?.meta,
        data: allUserResult?.data
    })

})


const getSingleUserController = catchAsync(async (req: Request, res: Response,next:NextFunction)=>{
    
    const userId = req.params.id
    const singleUserResult = await usersService.getSingleUser(userId)
    res.status(200).json({
        success: true, 
        statusCode:200,
        message: "User retrieved successfully",
        data: singleUserResult
    })

})

const updateUserController = catchAsync(async (req: Request, res: Response, next:NextFunction)=>{
    
    const userId = req.params.id
    const updatedData = req.body; 
    const updateUserResult = await usersService.updateUser(userId,updatedData)
    res.status(200).json({
        success: true, 
        statusCode:200,
        message: "User updated successfully",
        data:updateUserResult
        
    })
})

const deleteUserController = catchAsync(async (req: Request, res: Response,next:NextFunction)=>{
    
    const userId = req.params.id
    const deletedUserResult = await usersService.deleteSingleUser(userId)
    res.status(200).json({
        success: true, 
        statusCode:200,
        message: "User deleted successfully",
        
    })
})


export default {
    createUserController,
    getAllUserController,
    getSingleUserController,
     updateUserController ,
    deleteUserController
} 