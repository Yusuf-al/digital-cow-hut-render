import { ICows } from "./cows.interface"
import { Cows } from "./cows.model"
import { IPaginationOptions } from "../../../interfaces/paginationa"
import { IGenericResponse } from "../../../interfaces/common"
import paginationHelper from "../../../helpers/paginationHelper"
import { SortOrder } from "mongoose"

const addCow = async (cow: ICows) => {

    const addNewCow = await Cows.create(cow)

    if (!addNewCow ) {
        throw new Error("User is not created")
    }

    return addNewCow 
    
}

export type ISearchFields = {
    searchTerm?: string;
    maxPrice?: number;
    minPrice?:number
  };

const getAllCow = async (searchFilter:ISearchFields,paginationOption:IPaginationOptions): Promise<IGenericResponse<ICows[]> | null> => {
    
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.paginationOparetion(paginationOption)
    
    
    const sortConditions: { [key: string]: SortOrder } = {};
    const {searchTerm,maxPrice,minPrice, ...filterData} = searchFilter
    const searchFields = ['location', 'breed']  
    const andCnd = []

    if (minPrice !== undefined || maxPrice !== undefined) {
        andCnd.push({
          price: {
            $gte: minPrice || 0,
            $lte: maxPrice || 10000000,
          },
        });
      }

    if (searchTerm) {
        
        andCnd.push({
            $or: searchFields.map(field => ({
                
                [field]: {
                    $regex: searchTerm,
                    $options:'i'
                },
                
            }
                            
            ))
        })
    }

    if (Object.keys(filterData).length) {
        andCnd.push({
            $and: Object.entries(filterData).map(([field, value]) => (
                {
                        [field]: value,
                   
                  }
          )),
        });
    }


    const checkConditions = andCnd.length > 0 ? { $and: andCnd } : {};

    if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
    
    const allCows = await Cows.find(checkConditions,).sort(sortConditions).skip(skip).limit(limit)
    const total = await Cows.countDocuments();
    
    return {
        meta: {
            page,
            limit,
            total,
        },
        dataSize:allCows.length,
        data: allCows,}

}

const getSingleCow = async (id: string): Promise<ICows | null> => {
    const singleCow = await Cows.findById({ _id: id }).populate('seller')
    return singleCow
}

const updateCow = async (id: string,newUpdatedData:Partial<ICows>):Promise<ICows | null>=>{
    const updatedCow = await Cows.findByIdAndUpdate({ _id: id }, newUpdatedData, {
        new: true,
      })
    return updatedCow
}

const deleteSingleCow = async (id: string): Promise<ICows | null> => {

    const deletedCow = await Cows.findByIdAndDelete(id)
    return deletedCow
}

export default {
    addCow,
    getAllCow,
    getSingleCow,
    updateCow ,
    deleteSingleCow
}