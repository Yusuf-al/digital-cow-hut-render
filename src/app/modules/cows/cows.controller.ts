import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync"
import cowsService from "./cows.service";
import pick from "../../../shared/pick";

const addCowController = catchAsync( async (req: Request, res: Response) => {
    
    const {cow} = req.body
    const newCowResult = await cowsService.addCow(cow)

    res.status(200).json({
        success: true,
        message:"User created succussfully",
        data: newCowResult
    })
})

const getAllUserController = catchAsync(async (req: Request, res: Response)=>{
   
    const paginationOption = pick(req.query, ['page', 'limit','skip', 'sortBy', 'sortOrder'])
    const searchAndFilter = pick(req.query,['location','breed','maxPrice','minPrice','searchTerm'])
    
    const allUserResult = await cowsService.getAllCow(searchAndFilter,paginationOption)
    res.status(200).json({
        success: true, 
        statusCode:200,
        message: "User retrieved successfully",
        meta:allUserResult?.meta,
        data: allUserResult?.data
    })

})

const getSingleCowController = catchAsync(async (req: Request, res: Response,next:NextFunction)=>{
    
    const cowId = req.params.id
    const singleCowResult = await cowsService.getSingleCow(cowId)
    res.status(200).json({
        success: true, 
        statusCode:200,
        message: "User retrieved successfully",
        data: singleCowResult 
    })

})

const updateCowController = catchAsync(async (req: Request, res: Response, next:NextFunction)=>{
    
    const id = req.params.id
    const updatedData = req.body; 
    const updateCowResult = await cowsService.updateCow(id,updatedData)
    res.status(200).json({
        success: true, 
        statusCode:200,
        message: "Cow data updated successfully",
        data:updateCowResult
        
    })
})


const deleteUserController = catchAsync(async (req: Request, res: Response,next:NextFunction)=>{
    
    const id = req.params.id
    const deletedUserResult = await cowsService.deleteSingleCow(id)
    res.status(200).json({
        success: true, 
        statusCode:200,
        message: "Cow deleted successfully",
        
    })
})

export default {
    addCowController,
    getAllUserController ,
    getSingleCowController,
    updateCowController,
    deleteUserController
}