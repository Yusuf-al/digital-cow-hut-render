import express from 'express'

import usersController from './users.controller'

const router = express.Router()

router.post('/auth/signup', usersController.createUserController)
router.get('/users', usersController.getAllUserController)
router.get('/users/:id', usersController.getSingleUserController)
 router.patch('/users/:id', usersController.updateUserController)
router.delete('/users/:id', usersController.deleteUserController)

export default router