import mongoose, { Schema, model } from "mongoose";
import { ICows, cowModel } from "./cows.interface";

const cowSchema = new Schema<ICows,cowModel>({
    name: {
        type: String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    location: {
        type: String,
        required: true,
        enum:['Dhaka','Khulna','Chattogram','Barishal','Rajshahi','Sylhet','Comilla','Rangpur','Mymensingh']
    },
    breed: {
        type: String,
        required: true,
        enum:['Brahman','Nellore','Sahiwal','Gir','Indigenous','Tharparkar','Kankrej']
    },
    weight: {
        type: Number,
        required:true
    },
    label: {
        type: String,
        required: true,
        default:'for sale',
        enum:['for sale','sold Out']
    },
    category: {
        type: String,
        required: true,
        
        enum:['Dairy','Beef','Dual purpose']
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserData',
        required: true,
    } 
},
{
    timestamps: true,
    toJSON: {
        virtuals:true
    }
}
)

export const Cows= model<ICows, cowModel>('CowData', cowSchema);