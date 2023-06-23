import { Model } from 'mongoose'



export type UserName = {
    firstName: string;
    lastName: string;
  };

export type IUser = {
    userID:string
    name: UserName  ,
    password:  string,
    role:'buyer' | 'seller'  
    phoneNumber:string, 
    address: string, 
    budget:number | 0,
    income:number | 0
};

export type userModel = Model<IUser,Record<string,unknown>>