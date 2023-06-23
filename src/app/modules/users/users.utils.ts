import { User } from "./users.model"



export const findlastId = async () => {
    const lastId = await User.findOne({}, { userID: 1 }).sort({
        createdAt:-1
    }).lean()

    return lastId?.userID
}
export const genarateUserId = async () => {
    const newUserId = (await findlastId()) || (0).toString().padStart(5, '0')
   
    return parseInt(newUserId)+1
}

