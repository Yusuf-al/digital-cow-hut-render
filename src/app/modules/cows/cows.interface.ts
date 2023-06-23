import mongoose, { Model, ObjectId} from "mongoose"
import { IUser } from "../users/users.interface";


export type ICows = {
    
        name: string,
        age: number,
        price: number,
        location: string,
        breed: string,
        weight: number,
        label: string,
        category: string,
        seller?: ObjectId | IUser;
      
}

export type cowModel = Model<ICows, Record<string, unknown>>;