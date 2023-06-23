import mongoose, { Schema } from 'mongoose';
import { IUser, userModel } from './users.interface';

export const userSchema = new Schema<IUser, userModel>({
    userID: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        firstName: { type: String, required: true },
        lastName:{type:String, required:true},
    },
    password: { type: String, required: true },
    role: {
        type: String,
        required:true,
        enum: ['buyer','seller']
    },
     
    phoneNumber:{type:String, required:true},
    address: {type:String, required:true},
    budget:{type:Number, default:0},
    income:{type:Number, default:0},
},
    {
        timestamps: true,
        toJSON: {
            virtuals:true
        }
    })

export const User = mongoose.model<IUser,userModel>('UserData', userSchema);