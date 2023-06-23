import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/modules/users/users.routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import cowRouter from './app/modules/cows/cows.route'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', router)
app.use('/api/v1/', cowRouter)

app.use(globalErrorHandler)



app.get('/', (req: Request, res: Response) => {
    res.status(200).json("App working fine")
})

export default app
