import mongoose from 'mongoose';
import app from './app';
import config  from './config';

const port = config.port

process.on('uncaughtException', error => {
  console.log("Uncaught exception is found")
  process.exit(1)
})


async function main() {
    try {
        await mongoose.connect(config.database as string);
        console.log(`🛢️ __Database is connected successfully`)
        app.listen(port, () => {
            console.log(`Application listening on port ${port}`)
          })
    } catch (error) {
        console.log("Failed to connect database",error)
        
    }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main()
