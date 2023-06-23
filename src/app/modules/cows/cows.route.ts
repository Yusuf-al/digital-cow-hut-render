import express from 'express'
import cowsController from './cows.controller'


const cowRouter = express.Router()

cowRouter.post('/cows',cowsController.addCowController )
cowRouter.get('/cows',cowsController.getAllUserController )
cowRouter.patch('/cows/:id',cowsController.updateCowController )
cowRouter.get('/cows/:id',cowsController.getSingleCowController )
cowRouter.delete('/cows/:id',cowsController.deleteUserController)


export default cowRouter