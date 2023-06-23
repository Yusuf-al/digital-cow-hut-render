import dotevn from 'dotenv'
import path from 'path'
dotevn.config({ path: path.join(process.cwd(), '.env') })

export default {
  env:process.env.NODE_ENV,
  port: process.env.PORT,
  database: process.env.DATABASE_URL,
  userPassword:process.env.DEFAULT_USER_PASS
}