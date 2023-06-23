import { SortOrder } from "mongoose"
import paginationHelper from "../../../helpers/paginationHelper"
import { IGenericResponse } from "../../../interfaces/common"
import { IPaginationOptions } from "../../../interfaces/paginationa"
import  config  from "./../../../config"
import { IUser } from "./users.interface"
import { User } from "./users.model"
import { genarateUserId } from "./users.utils"

const createUser = async (user: IUser) => {

    const createdUserId = await genarateUserId()
    user.userID =  createdUserId.toString().padStart(5,'0')
    
    if (!user.password) {
        user.password = config.userPassword as string
    }

    const createNewUser = await User.create(user)

    if (!createNewUser) {
        throw new Error("User is not created")
    }

    return createNewUser
    
}

export type ISearchFields = {
    searchTerm?: string;
  };

const getAllUser = async (searchFilter:ISearchFields,paginationOption:IPaginationOptions): Promise<IGenericResponse<IUser[]> | null> => {
    
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.paginationOparetion(paginationOption)
    
    
    const sortConditions: { [key: string]: SortOrder } = {};
    const {searchTerm, ...filterData} = searchFilter
    const searchFields = ['role', 'name.firstName','name.lastName', 'phoneNumber']  
    const andCnd = []

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
    
    const allUsers = await User.find(checkConditions).sort(sortConditions).skip(skip).limit(limit)
    const total = await User.countDocuments();
    
    return {
        meta: {
            page,
            limit,
            total,
        },
        dataSize:allUsers.length,
        data: allUsers,}

}

const getSingleUser = async (id: string):Promise<IUser | null>=>{
    const singleUser = await User.findById({_id:id})
    return singleUser
}

const updateUser = async (id: string,newUpdatedData:Partial<IUser>):Promise<IUser | null>=>{
    const updatedUser = await User.findByIdAndUpdate({ _id: id }, newUpdatedData, {
        new: true,
      })
    return updatedUser
}

const deleteSingleUser = async (id: string):Promise<IUser | null>=>{
    const deleteUser = await User.findByIdAndDelete(id)
    return deleteUser
}

export default {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteSingleUser
}